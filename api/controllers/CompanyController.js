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
         JobService.fetchCompanyJobs(req.session.coy_id, 'all').then(function(_jobs) {
             // find active jobs
             var today = new Date();
             var active_jobs = 0;
             var activejobs = [], archived_jobs = [];
             _jobs.forEach(function(job) {
                if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                    active_jobs++;
                }
                if (job.status == 'Active') {
                    activejobs.push(job);
                } else if (job.status.trim() == 'Inactive') {
                    archived_jobs.push(job);
                }

             });
             var msg = req.param('msg') ? new Buffer(req.param('msg'), 'base64').toString('ascii') : '';
            return res.view('company/dashboard', { jobs: activejobs, archived_jobs: archived_jobs, active_jobs: active_jobs, msg: msg });
        })
        .catch(function(err) {
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
            city: q('city')
        };
        Company.update({ id: req.session.coy_id }, data).exec(function (err) {
            if (err) return console.log(err);
            //console.log(com);
        });

        var allowedImgTypes = ['image/png', 'image/jpeg', 'image/gif'];
        var filename;
        var hr = process.hrtime();

        req.file('logo').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/logos/'),
            saveAs: function(file, cb) {
                if (allowedImgTypes.indexOf(file.headers['content-type']) === -1) {
                    return res.badRequest('Unsupported picture format.');
                }
                var ext = file.filename.split('.').pop();
                filename = hr[1] + '_logo.' + ext;
                return cb(null, filename);
            }
        },
        function(err, logo) {
            if (err) {
                return res.badRequest(err);
            }
            // copy the uploaded logo to the public folder
            if (filename === undefined) return;
            const fs = require('fs');
            const path = require('path');
            const uploadedlogo = path.resolve(sails.config.appPath, 'assets/logos') + '/' + filename;
            const temp_pic = path.resolve(sails.config.appPath, '.tmp/public/logos') + '/' + filename;
            fs.createReadStream(uploadedlogo).pipe(fs.createWriteStream(temp_pic));

            if (logo) {
                Company.update({id: req.session.coy_id}, {logo_name: filename}).exec(function () {});
            }
            // delete previous photo if any
            try {
                const assetPath = path.resolve(sails.config.appPath + 'assets/logos') + '/' + req.param('logo_name');
                if (fs.existsSync(assetPath)) {
                    fs.unlinkSync(assetPath);
                }
            } catch(err) {
                console.log(err);
                // just do nothing
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
            });
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
            return Company.find().sort('company_name').then(coys => {
                var companies = [];
                var today = new Date().toISOString();
                async.eachSeries(coys, function(coy, cb) {
                    Job.find({company: coy.id}).exec(function (err, jobs) {
                        if (err) {
                            return res.serverError(err);
                        }
                        coy.open_jobs = 0;
                        coy.closed_jobs = 0;
                        coy.archived_jobs = 0;
                        jobs.forEach(function(job) {
                            if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                                coy.open_jobs++;    
                            } else if (Date.parse(job.closing_date) < Date.parse(today) && job.status == 'Active') {
                                coy.closed_jobs++;
                            } else if (job.status.trim() == 'Inactive') {
                                coy.archived_jobs++;
                            } 
                        });
                        //companies.push(coy);
                        cb();
                    });
                }, function() {
                    return res.view('admin/list-companies', { companies: coys });
                });
            });
    },

    // admin view
    viewCompanyJobs: function(req, res) {
        var coy_id = req.param('coy_id');
        var job_status = req.param('status');

        if (coy_id === undefined) {
            return res.badRequest('Missing Company Param');
        }
        return Promise.all([
                JobService.fetchCompanyJobs(coy_id, job_status),
                Company.findOne({id: coy_id})
            ]).then(results => {
                let jobs = results[0];
                let company = results[1];

                return res.view('admin/coy-jobs', {
                    jobs: jobs,
                    company: company,
                    coy_id: coy_id,
                    job_status: job_status
                });
            }).catch(err => {
                return res.serverError(err);
            });
    },


    fetchCompanies: function(req, res) {
        Company.find({ status: 'Active' }).exec(function(err, companies) {
            return res.json({ status: 'success', companies: companies });
        });
    }
};

