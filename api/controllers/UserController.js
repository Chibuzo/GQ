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
            return res.badRequest('An email address is required!');
        }

        //if (_.isUndefined(req.param('password')) || req.param('password').length < 6) {
        //    return res.badRequest('A password is required, and must be aleast 6 characters');
        //}
        // validate email
        Emailaddresses.validate({
            string: req.param('email')
        }).exec({
            error: function(err) {
                return res.serverError(err);
            },
            invalid: function() {
                return res.badRequest('Doesn\'t look like an email address to me!');
            },
            success: function() {
                // collect ALL signup data
                var data = {
                    fullname: req.param('fname') + ' ' + req.param('lname'),
                    email: req.param('email'),
                    user_type: req.param('user_type')
                };

                User.create(data).exec(function(err, newUser) {
                    if (err) {
                        if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                            return res.json(200, { status: 'error', msg: 'Email address is already taken, please try another one.' });
                        }
                        return res.json(501, { status: 'error', msg: err }); // couldn't be completed
                    }
                    sendMail.sendConfirmationEmail(newUser);
                    return res.json(200, { status: 'success' });
                });
            }
        });
    },

    activateAccount: function(req, res) {
        var email = new Buffer(req.param('email'), 'base64').toString('ascii');
        var hash = req.param('hash');
        User.findOne({ email : email }).exec(function(err, user) {
            if (err) return;
            //if (user.status == 'Active') {
            //    return res.view('login', { msg: 'Your email has already been confirmed. Just go ahead and login' });
            //}
            if (user) {
                var crypto = require('crypto');
                var confirm_hash = crypto.createHash('md5').update(email + 'okirikwenEE129Okpkenakai').digest('hex');
                if (hash == confirm_hash) {
                    User.update({ id: user.id }, { status: 'Active' }).exec(function(err, user) {
                        if (err) {
                            console.log(err);
                        }
                        req.session.userId = user[0].id;
                        req.session.user_type = user[0].user_type;
                        var me = {
                            fname: user[0].fullname.split(' ')[0],
                            lname: user[0].fullname.split(' ')[1]
                        };
                        if (user[0].user_type == 'Applicant') {
                            return res.view('applicant/profile', {user: user[0], me: me, first_time: true});
                        } else if (user[0].user_type == 'company') {
                            return res.view('company/users/profile', { user: user[0], me: me });
                        }
                    });
                } else {
                    console.log('Invalid hash');
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
                    return res.json(200, { status: 'Err', msg : 'User not found' });
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
                    if (req.param('return_url').length > 1) {
                        return res.json(200, { status: 'success', url: '/' + new Buffer(req.param('return_url'), 'base64').toString() });
                        //return res.redirect(req.param('return_url'));
                    } else if (foundUser.user_type == 'company-admin' || foundUser.user_type == 'company') {
                        req.session.coy_id = foundUser.company;
                        return res.json(200, { status: 'success', url: '/company/dashboard' });
                        //return res.redirect('/company/dashboard');
                    } else if (foundUser.user_type == 'Applicant') {
                        return res.json(200, { status: 'success', url: '/applicant/dashboard' });
                        //return res.redirect('/applicant/dashboard');
                        //return res.json(200, { status: 'success', user_type: foundUser.user_type });
                    }
                }
            });
        });
    },

    dashboard: function(req, res) {
        console.log('here')
        if (!req.session.userId) {
            return res.view ('user/signin');
        }
        if (req.session.user_type == 'Applicant') {
            return res.view('applicant/dashboard');
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
        User.findOne(req.session.userId, function(err, _user) {
            if (err) return res.negotiate(err);
            var me = {
                fname: _user.fullname.split(' ')[0],
                lname: _user.fullname.split(' ')[1]
            };
            Resume.find({ user: req.session.userId }).exec(function(err, resume) {
                return res.view('applicant/profile', { user: _user, me: me, passport: resume[0].passport });
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
            if (req.param('first_time') == 'Yes') {
                Passwords.encryptPassword({
                    password: req.param('new_password'),
                }).exec({
                    error: function (err) {
                        console.log(err);
                        //return res.serverError(err);
                    },
                    success: function (newPassword) {
                        User.update({ id: req.session.userId }, { password: newPassword }).exec(function (err) {
                            if (err) return res.json(200, { status: 'error', msg: err });

                            // create resume
                            udata.email = req.param('email');
                            udata.user = req.session.userId;
                            Resume.create(udata).exec(function() {});
                            return res.json(200, { status: 'success' });
                        });
                    }
                });
            } else if(req.param('current_password') && req.param('new_password')) {
                Passwords.checkPassword({
                    passwordAttempt: req.param('current_password'),
                    encryptedPassword: user[0].password
                }).exec({
                    error: function (err) {
                        console.log(err);
                        //return res.json(200, { status: 'Err', msg: err });
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
                                //return res.serverError(err);
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
            } else {    // this would never happen though
                return res.json(200, { status: 'success' });
            }
            //return res.redirect('/user/profile');
        });
    },

    sendPswdResetEmail: function(req, res) {
        User.find({ email: req.param('email')}).exec(function(err, user) {
            if (user.length > 0) {
                //sendMail.sendPswdResetLink(user[0]);
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
                sendMail.sendConfirmationEmail(newUser);
                return res.view('login', {msg: "You haven\'t verified your email address. Kindly check your email and verify your account"});
            }
            if (user) {
                var crypto = require('crypto');
                var confirm_hash = crypto.createHash('md5').update(email + 'okirikwenEE129Okpkenakai').digest('hex');
                if (hash == confirm_hash) {
                    // put the email in session to avoid someone changing
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
                User.update({ id: req.session.userId }, { password: newPassword }).exec(function(err) {
                    if (err) {
                        return res.json(200, { status: 'error', msg: err });
                    }
                    return res.json(200, { status: 'success' });
                });
            }
        });
    },

    specialLoginPage: function(req, res) {
        var return_url = req.param('base64_url');
        //var id = req.param('id').length > 0 ? '/' + req.param('id') : '';
        //var path = (return_url + id).trim();
        return res.view('login', { return_url: return_url });
    }
};

