/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');

module.exports = {
    addAdmin: function(req, res) {
        if (_.isUndefined(req.param('email'))) {
            return res.badRequest('An email address is required!');
        }

        if (_.isUndefined(req.param('password')) || req.param('password').length < 6) {
            return res.badRequest('A password is required, and must be aleast 6 characters');
        }

        // validate email and password
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
                Passwords.encryptPassword({
                    password: req.param('password'),
                }).exec({
                    error: function(err) {
                        return res.serverError(err);
                    },
                    success: function(encryptedPassword) {
                        // collect ALL signup data
                        var data = {
                            fullname: req.param('fullname'),
                            email: req.param('email'),
                            password: encryptedPassword,
                        };

                        Admin.create(data).exec(function(err) {
                            if (err) {
                                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                    return res.json(200, { status: '02', msg: 'Email address is already taken, please try another one.' });
                                }
                                return res.json(501, { status: '00', msg: err }); // couldn't be completed
                            }
                            return res.json(200, { status: '01' });
                        });
                    }
                });
            }
        });
    },

    login: function(req, res) {
        Admin.findOne({ email: req.param('email') }).exec(function(err, foundUser) {
            if (err) return res.json(200, { status: 'Err', msg: err });
            if (!foundUser) return res.json(200, { status: 'Err', msg : 'User not found' });

            Passwords.checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: foundUser.password
            }).exec({
                error: function (p_err) {
                    return res.json(200, { status: 'Err', msg: p_err });
                },
                incorrect: function () {
                    return res.json(200, { status: 'Err', msg : 'User not found' });
                },
                success: function () {
                    if (foundUser.deleted) {
                        return res.json(200, { status: 'Err', msg: "'Your account has been deleted. Please visit http://gq.com/restore to restore your account.'" });
                    }

                    if (foundUser.banned) {
                        return res.json(200, { status: 'Err', msg: "'Your account has been banned, most likely for violation of the Terms of Service. Please contact us.'"});
                    }
                    req.session.admin_id = foundUser.id;
                    req.session.admin = true;
                    req.session.fname = foundUser.fullname;
                    req.session.user_type = 'admin';
                    return res.json(200, { status: 'Ok' });
                }
            });
        });
    },

    dashboard: function(req, res) {
        if (!req.session.admin_id) {
            return res.view('admin/login');
        }
        //Admin.findOne(req.session.admin_id, function(err, user) {
        //    if (err) {
        //        return res.negotiate(err);
        //    }
        //    Order.find().populate('user').sort({ createdAt: 'desc'}).limit(10).exec(function(err, orders) {
        //        if (err) return console.log(err);
        //        Payment.find().populate('user').sort({ createdAt: 'desc'}).limit(10).exec(function(err, payments) {
        //            if (err) return console.log(err);
        //            return res.view('admin/dashboard', {
        //                me: {
        //                    id: user.id,
        //                    fname: user.fullname,
        //                    email: user.email,
        //                }, orders: orders, payments: payments
        //            });
        //        });
        //    });
        //});
        return res.view('admin/dashboard');
    },

    signout: function (req, res) {
        if (!req.session.admin_id) return res.redirect('/');
        Admin.findOne(req.session.admin_id, function foundUser(err, createdUser) {
            if (err) return res.negotiate(err);

            if (!createdUser) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.redirect('/');
            }
            req.session.fname = false;
            req.session.destroy(function(err) {
                setTimeout(function(){
                    return res.redirect('/admin');
                }, 2500); // redirect wait time 2.5 seconds
            });
        });
    },

    profile: function(req, res) {
        Admin.findOne(req.session.admin_id, function(err, _user) {
            return res.view('admin/profile', { user: _user });
        });
    },

    updateProfile: function (req, res) {
        var udata = {
            fullname: req.param('fullname'),
            phone: req.param('phone')
        };
        Admin.update({ id: req.session.admin_id }, udata ).exec(function(err) {
            if (err) {
                return res.negotiate(err);
            }
            return res.redirect('/admin/profile');
        });
    },

    setup: function(req, res) {
        JobCategory.find({ removed: 'false' }).exec(function(err, cat) {
            if (err) {
                return res.badRequest(err);
            }
            Sector.find({ removed: 'false' }).sort('title asc').exec(function(err, sectors) {
                if (err) {
                    return res.badRequest(err);
                }
                return res.view('admin/settings', { categories: cat, sectors: sectors });
            });
        });
    },

    //showLogin: function(req, res) {
    //    return res.view('admin/login');
    //}
};

