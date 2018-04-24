/**
 * CompanyController
 *
 * @description :: Server-side logic for managing Companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords');
var os = require('os');
os.tmpDir = os.tmpdir;

module.exports = {
    dashboard: function(req, res) {
        return Job.find({ company: req.session.coy_id }).populate('applications').then(function(jobs) {
            return res.view('company/dashboard', { jobs: jobs });
        }).catch(err => {
            return res.serverError(err);
        });
    },


	initialSetup: function(req, res) {
        var hash = req.param('hash');
        var email = new Buffer(req.param('email'), 'base64').toString('ascii');
        var crypto = require('crypto');
        var expected_hash = crypto.createHash('md5').update(email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');
        if (hash == expected_hash) {
            // lets see if this user is clicking a stale link
            Company.find({contact_email: email}).exec(function (err, com) {
                if (err) return console.log(err);
                CountryStateService.getCountries().then(function (resp) {
                    if (com.length > 0) {
                        // mofo detected! redirect...
                        req.session.coy_id = com[0].id;
                        req.session.fname = com[0].contact_person;
                        req.session.user_type = 'company-admin';
                        Sector.find({removed: 'false'}).exec(function (err, sectors) {
                            return res.view('company/setup', {
                                company: com[0],
                                sectors: sectors,
                                first_time: 'true',
                                countries: resp.countries,
                                states: resp.states
                            });
                        });
                    } else {
                        CompanyRequest.findOne({contact_email: email}).exec(function (err, coy) {
                            if (err) return console.log(err);
                            var comp = {
                                company_name: coy.company_name,
                                contact_person: coy.contact_person,
                                contact_phone: coy.contact_phone,
                                contact_email: coy.contact_email
                            };
                            Company.create(comp).exec(function (err, cmpy) {
                                if (err) return console.log(err);
                                // activate the account
                                User.update({ email: email }, { status: 'Active' }).exec(function() {});
                                req.session.coy_id = cmpy.id;
                                req.session.fname = cmpy.contact_person;
                                req.session.user_type = 'company-admin';
                                Sector.find({removed: 'false'}).exec(function (err, sectors) {
                                    return res.view('company/setup', {
                                        company: cmpy,
                                        sectors: sectors,
                                        first_time: 'true',
                                        countries: resp.countries,
                                        states: resp.states
                                    });
                                });
                            });
                        });
                    }
                });
            });
        }
    },

    updateDetails: function (req, res) {
        var q = req.param;

        var data = {
            company_name: q('company_name'),
            sector: q('sector'),
            contact_person: q('contact_person'),
            contact_phone: q('contact_phone'),
            contact_email: q('contact_email'),
            description: q('description'),
            address: q('address'),
            country: q('country'),
            r_state: q('state'),
            city: q('city'),
            sector: q('sector'),
        };
        Company.update({ id: req.session.coy_id }, data).exec(function (err, com) {
            if (err) return console.log(err);
            //console.log(com);
        });

        var allowedImgTypes = ['image/png', 'image/jpeg', 'image/gif'];
        var filename;

        req.file('logo').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/logos/'),
            saveAs: function(file, cb) {
                if (allowedImgTypes.indexOf(file.headers['content-type']) === -1) {
                    return res.badRequest('Unsupported picture format.');
                }
                var ext = file.filename.split('.').pop();
                filename = q('company_name').split(' ').join('-') + '_logo.' + ext;
                return cb(null, filename);
            }
        },
        function(err, logo) {
            if (err) {
                return res.ok();
            }
            if (logo) {
                Company.update({id: req.session.coy_id}, {logo_name: filename}).exec(function () {});
            }
        });
        if (q('first_check') == 'true') {
            Passwords.encryptPassword({
                password: q('password'),
            }).exec({
                error: function (err) {
                    return res.json(200, { status: 'error', msg: err });
                },
                success: function (encryptedPassword) {
                    // add access user for this company
                    var user = {
                        fullname: q('contact_person'),
                        email: q('contact_email'),
                        password: encryptedPassword,
                        company: req.session.coy_id,
                        user_type: 'company-admin',
                        status: 'Active'
                    };
                    User.find({ email: q('contact_email') }).exec(function (err, coy_user) {
                        if (coy_user.length > 0) {
                            User.update({ email: q('contact_email') }, user).exec(function(err, new_user) {
                                req.session.userId = new_user[0].id;
                            });
                        } else {
                            User.create(user).exec(function(err, new_user) {
                                req.session.userId = new_user.id;
                            });
                        }
                        req.session.save();
                    });
                    sendMail.companyIntroduction(q('contact_person'));
                    sendMail.GQNewActiveCompany(q('company_name'));
                }
            });
        }
        return res.json(200, { status: 'success' });
    },

    profile: function(req, res) {
        return Promise.all([
                Company.findOne({ id: req.session.coy_id }),
                Sector.find({ removed: 'false'}),
                CountryStateService.getCountries()
            ]).then(results => {
                let com = results[0];
                let sectors = results[1];
                let resp = results[2];
                return res.view('company/setup', {
                    company: com,
                    sectors: sectors,
                    countries: resp.countries,
                    states: resp.states
                });
            }).catch(err => {
                return res.serverError(err);
            })
    },

    addUser: function(req, res) {
        if (_.isUndefined(req.param('email'))) {
            return res.json(200, { status: 'error', msg: 'An email address is required!' });
        }

        var data = {
            fullname: req.param('fname') + ' ' + req.param('lname'),
            email: req.param('email'),
            company: req.session.coy_id
        };
        CompanyUser.create(data).exec(function(err, comp_user) {
            if (err) {
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                    return res.json(200, { status: 'error', msg: 'Email address is already taken, please try another one.' });
                }
                return res.json(501, { status: 'error', msg: err }); // couldn't be completed
            }
            Company.find({ id: req.session.coy_id }).exec(function(err, comp) {
                sendMail.sendCompanyInviteEmail(comp_user, comp[0]);
                sendMail.GQCompanyNewUserAlert(comp_user.fullname);
            });
            return res.json(200, { status: 'success' });
        });
    },

    activateUser: function(req, res) {
        var hash = req.param('hash');
        var email = new Buffer(req.param('email'), 'base64').toString('ascii');
        var crypto = require('crypto');
        var expected_hash = crypto.createHash('md5').update(email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');
        if (hash == expected_hash) {
            CompanyUser.update({ email: email }, { status: 'Active' }).exec(function(err, coy_user) {
                if (err) return console.log(coy_user);
                var data = {
                    fullname: coy_user[0].fullname,
                    email: email,
                    user_type: 'company',
                    company: coy_user[0].company,
                    status: 'Active'
                };
                User.findOrCreate({ email: email }, data).exec(function(err, newUser) {
                    if (err) return;
                    var me = {
                        fname: coy_user[0].fullname.split(' ')[0],
                        lname: coy_user[0].fullname.split(' ')[1]
                    };
                    req.session.userId = newUser.id;
                    req.session.coy_id = coy_user[0].company;
                    req.session.user_type = 'company';
                    CountryStateService.getCountries().then(function(resp) {
                        return res.view('company/users/profile', {user: coy_user[0], me: me, countries: resp.countries, states: resp.states, first_time: true});
                    });
                });
            });
        } else {
            console.log('Wrong hash')
        }
    },

    userProfile: function(req, res) {
        User.findOne(req.session.userId, function(err, _user) {
            if (err) return res.negotiate(err);
            var me = {
                fname: _user.fullname.split(' ')[0],
                lname: _user.fullname.split(' ')[1]
            };
            CompanyUser.find({ email: _user.email }).exec(function(err, coy) {
                CountryStateService.getCountries().then(function (resp) {
                    return res.view('company/users/profile', {
                        user: _user,
                        me: me,
                        coy_details: coy[0],
                        countries: resp.countries,
                        states: resp.states
                    });
                });
            });
        });
    },

    updateUser: function(req, res) {
        Passwords.encryptPassword({
            password: req.param('new_password'),
        }).exec({
            error: function (err) {
                return res.serverError(err);
            },
            success: function (encryptedPassword) {
                var fullname = req.param('fname') + ' ' + req.param('lname');
                // update user and add password
                User.update({ id: req.session.userId }, { fullname: fullname, password: encryptedPassword }).exec(function() {});
                var data = {
                    fullname: fullname,
                    country: req.param('country'),
                    r_state: req.param('state'),
                    city: req.param('city')
                };
                CompanyUser.update({ id: req.param('coy_user_id') }, data).exec(function(err) {
                    if (err) console.log(err);
                    return res.json(200, { status: 'success' });
                });
            }
        });
    },

    getUsers: function(req, res) {
        CompanyUser.find({ company: req.session.coy_id }).then(function(users) {
            return res.view('company/users', { users: users });
        }).catch(err => {
            return res.serverError(err);
        });
    },

    removeUser: function(req, res) {
        CompanyUser.destroy({ id: req.param('id') }).exec(function(err, user) {
            User.destroy({ email: user.email }).exec(function() {});
            return res.json(200, { status: 'success' });
        });
    },


    // admin view
    viewCompanies: function(req, res) {
        return  Company.find({ status: 'Active' })
            .then(coys => {
                var companies = [];
                async.eachSeries(coys, function(coy, cb) {
                    Job.count({company: coy.id}).exec(function (err, jobs) {
                        coy.jobs = jobs;
                        companies.push(coy);
                        cb();
                    });
                }, function(err) {
                    return res.view('admin/list-companies', { companies: coys });
                });
            })
    },


    // admin view
    viewCompanyJobs: function(req, res) {
        var coy_id = req.param('coy_id');

        return Job.find({ company: coy_id }).populate('applications').populate('poster')
            .then(jobs => {
                return res.view('admin/coy-jobs', { jobs: jobs, coy_id: coy_id });
            })
            .catch(err => {
                return res.serverError(err);
            });    
    }
};

