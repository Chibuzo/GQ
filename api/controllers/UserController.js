/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');

module.exports = {
    signup: function(req, res) {
        if (_.isUndefined(req.param('email'))) {
            return res.json(200, { status: 'error', msg: 'An email address is required!' });
        }

        if (_.isUndefined(req.param('password')) || req.param('password').length < 6) {
            return res.json(200, { status: 'error', msg: 'A password is required, and must be at least 6 characters' });
        }
        // validate email
        Emailaddresses.validate({
            string: req.param('email')
        }).exec({
            error: function(err) {
                return res.serverError(err);
            },
            invalid: function() {
                return res.json(200, { status: 'error', msg: 'Doesn\'t look like an email address to me!' });
            },
            success: function() {
                // collect ALL signup data
                Passwords.encryptPassword({
                    password: req.param('password'),
                }).exec({
                    error: function (err) {
                        return res.serverError(err);
                    },
                    success: function (encryptedPassword) {
                        var data = {
                            fullname: req.param('fname') + ' ' + req.param('lname'),
                            email: req.param('email'),
                            password: encryptedPassword,
                            user_type: req.param('user_type')
                        };

                        User.create(data).exec(function (err, newUser) {
                            if (err) {
                                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                    return res.json(200, {
                                        status: 'error',
                                        msg: 'Email address is already taken, please try another one.'
                                    });
                                }
                                return res.json(501, {status: 'error', msg: err}); // couldn't be completed
                            }
                            AmplitudeService.trackEvent('User Sign Up', data.email, {}, {
                                userType: data.userType,
                                signUpDate: new Date(Date.now())
                            });
                            sendMail.sendConfirmationEmail(newUser);
                            return res.json(200, {status: 'success'});
                        });
                    }
                });
            }
        });
    },

    activateAccount: function(req, res) {
        var email = new Buffer(req.param('email'), 'base64').toString('ascii');
        var hash = req.param('hash');
        User.findOne({ email : email }).exec(function(err, foundUser) {
            if (err) return;

            if (foundUser) {
                var crypto = require('crypto');
                var confirm_hash = crypto.createHash('md5').update(email + 'okirikwenEE129Okpkenakai').digest('hex');
                if (hash == confirm_hash) {
                    User.update({ id: foundUser.id }, { status: 'Active' }).exec(function(err, userArr) {
                        let user = userArr[0];
                        if (err) {
                            console.log(err);
                        }
                        req.session.userId = user.id;
                        req.session.user_type = user.user_type;
                        req.session.fname = user.fullname;
                        req.session.userEmail = user.email;

                        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;

                        var me = {
                            fname: user.fullname.split(' ')[0],
                            lname: user.fullname.split(' ')[1]
                        };

                        const passwordSet = user.password ? user.password.length > 1 : false;

                        if (user.user_type == 'Applicant') {
                            // create their resume
                            Resume.findOrCreate({ email: email}, { email: email, fullname: user.fullname, user: user.id }).exec(function() {});
                            sendMail.welcomeNewCandidate(user);
                            return res.view('applicant/profile', {
                                user: user,
                                me: me,
                                enableAmplitude: enableAmplitude,
                                userEmail: user.email,
                                profilePage: true,
                                passwordSet: passwordSet
                            });
                        } else if (user.user_type == 'company') {
                            return res.view('company/users/profile', { user: user, me: me });
                        }
                    });
                } else {
                    return res.badRequest('Incorrect activation code');
                }
            }
        });
    },

    findAccount: function(req, res) {
        User.findOne({ email: req.param('email') }).exec(function(err, foundUser) {
            if (err) return res.json(200, { status: 'Err', msg: err });
            if (!foundUser) return res.json(200, { status: 'Err', msg : 'User not found' });
            return res.json(200, { status: 'Found' });
        });
    },

    signin: function(req, res) {
        User.findOne({ email: req.param('email') }).exec(function(err, foundUser) {
            if (err) return res.json(200, { status: 'Err', msg: err });
            if (!foundUser) return res.json(200, { status: 'Err', msg : 'User not found' });

            if (foundUser.status == 'Inactive') {
                return res.json(200, { status: 'Err', msg: 'This account is still pending confirmation' });
            }
            Passwords.checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: foundUser.password
            }).exec({
                error: function (err) {
                    return res.json(200, { status: 'Err', msg: err });
                },
                incorrect: function () {
                    return res.json(200, { status: 'Err', msg : 'Incorrect login details' });
                },
                success: function () {
                    if (foundUser.deleted) {
                        return res.json(200, { status: 'Err', msg: "'Your account has been deleted. Please visit http://cpbit.com/restore to restore your account.'" });
                    }

                    if (foundUser.banned) {
                        return res.json(200, { status: 'Err', msg: "'Your account has been banned, most likely for violation of the Terms of Service. Please contact us.'"});
                    }
                    req.session.userId = foundUser.id;
                    req.session.fname = foundUser.fullname;
                    req.session.user_type = foundUser.user_type;
                    req.session.userEmail = foundUser.email;
                    if (req.param('return_url').length > 1) {
                        return res.json(200, { status: 'success', url: '/' + new Buffer(req.param('return_url'), 'base64').toString() });
                    } else if (foundUser.user_type == 'company-admin' || foundUser.user_type == 'company') {
                        req.session.coy_id = foundUser.company;
                        return res.json(200, { status: 'success', url: '/company/dashboard' });
                    } else if (foundUser.user_type == 'Applicant') {
                        return res.json(200, { status: 'success', url: '/applicant/dashboard' });
                    }
                }
            });
        });
    },

    dashboard: function(req, res) {
        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;
        const userEmail = req.session.userEmail;

        if (!req.session.userId) {
            return res.view ('user/signin');
        }
        if (req.session.user_type == 'Applicant') {
            return res.view('applicant/dashboard', {
              userEmail: userEmail,
              enableAmplitude: enableAmplitude
            });
        }
    },

    signout: function (req, res) {
        if (!req.session.userId) return res.redirect('/');
        User.findOne(req.session.userId, function foundUser(err, createdUser) {
            if (err) return res.negotiate(err);

            if (!createdUser) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.redirect('/');
            }
            req.session.fname = false;
            req.session.destroy(function(err) {
                setTimeout(function(){
                    return res.redirect('/login');
                }, 2500); // redirect wait time 2.5 seconds
            });
        });
    },

    profile: function(req, res) {
        const userEmail = req.session.userEmail;
        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;

        User.findOne(req.session.userId, function(err, _user) {
            if (err) return res.negotiate(err);
            var me = {
                fname: _user.fullname.split(' ')[0],
                lname: _user.fullname.split(' ')[1]
            };

            const passwordSet = _user.password ? _user.password.length > 1 : false;

            Resume.find({ user: req.session.userId }).exec(function(err, resume) {
                return res.view('applicant/profile', {
                    user: _user,
                    me: me,
                    passport: resume[0].photo,
                    userEmail: userEmail,
                    enableAmplitude: enableAmplitude,
                    profilePage: true,
                    passwordSet: passwordSet
                });
            });
        });
    },

    updateProfile: function (req, res) {
        var udata = {
            fullname: req.param('fname') + " " + req.param('lname'),
        };
        User.update({ id: req.session.userId }, udata ).exec(function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            let new_pswd = req.param('new_password');
            if(req.param('current_password') && req.param('new_password')) {
                Passwords.checkPassword({
                    passwordAttempt: new_pswd,
                    encryptedPassword: user[0].password
                }).exec({
                    error: function (err) {
                        console.log(err);
                        return res.json(200, { status: 'Err', msg: err });
                    },
                    incorrect: function () {
                        return res.json(200, { status: 'error', msg: 'Wrong password' });
                    },
                    success: function () {
                        Passwords.encryptPassword({
                            password: req.param('new_password'),
                        }).exec({
                            error: function (err) {
                                console.log(err);
                                return res.json(200, { status: 'Err', msg: err });
                            },
                            success: function (newPassword) {
                                User.update({ id: req.session.userId }, { password: newPassword }).exec(function (err) {
                                    if (err) return res.json(200, { status: 'error', msg: err });
                                    return res.json(200, { status: 'success' });
                                });
                            }
                        });
                    }
                });
            } else {
                Passwords.encryptPassword({
                    password: req.param('new_password'),
                }).exec({
                    error: function (err) {
                        console.log(err);
                        return res.json(200, { status: 'error', msg: err });
                    },
                    success: function (newPassword) {
                        User.update({ id: req.session.userId }, { password: newPassword }).exec(function (err) {
                            if (err) return res.json(200, { status: 'error', msg: err });
                            return res.json(200, { status: 'success' });
                        });
                    }
                });
            }
        });
    },

    sendPswdResetEmail: function(req, res) {
        User.find({ email: req.param('email')}).exec(function(err, user) {
            if (user.length > 0) {
                sendMail.sendPswdResetLink(user[0]);
                return res.json(200, { status: 'success' });
            } else {
                return res.json(200, { status: 'error', msg: 'This email is not associated with any account.' });
            }
        });
    },

    showResetPasswordPage: function(req, res) {
        var email = new Buffer(req.param('email'), 'base64').toString('ascii');
        var hash = req.param('hash');

        User.findOne({ email : email }).exec(function(err, user) {
            if (err) {
                return res.badRequest("We don't even know what happened");
            }
            if (user.status == 'Inactive') {
                sendMail.sendConfirmationEmail(user);
                return res.view('login', {msg: "You haven\'t verified your email address. Kindly check your email and verify your account"});
            }
            if (user) {
                var crypto = require('crypto');
                var confirm_hash = crypto.createHash('md5').update(email + 'okirikwenEE129Okpkenakai').digest('hex');
                if (hash == confirm_hash) {
                    req.session.user_id = user.id;
                    return res.view('reset-password');
                }
            }
        });
    },

    resetPassword: function(req, res) {
        Passwords.encryptPassword({
            password: req.param('new_password'),
        }).exec({
            error: function (err) {
                return res.json(200, { status: 'error', msg: err });
            },
            success: function (newPassword) {
                User.update({ id: req.session.user_id }, { password: newPassword }).exec(function(err) {
                    if (err) {
                        return res.json(200, { status: 'error', msg: err });
                    }
                    req.session.user_id = null;
                    return res.json(200, { status: 'success' });
                });
            }
        });
    },

    specialLoginPage: function(req, res) {
        var return_url = req.param('base64_url');
        return res.view('login', { return_url: return_url });
    }
};
