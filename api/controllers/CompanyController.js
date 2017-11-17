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
        return res.view('company/dashboard');
    },


	initialSetup: function(req, res) {
        var hash = req.param('hash');
        var email = new Buffer(req.param('email'), 'base64').toString('ascii');
        var crypto = require('crypto');
        var expected_hash = crypto.createHash('md5').update(email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');
        if (hash == expected_hash) {
            // lets see if this idiot is clicking a stale link
            Company.find({ contact_email: email }).exec(function(err, com) {
                if (err) return console.log(err);
                if (com.length > 0) {
                    // mofo detected! redirect...
                    req.session.coy_id = com.id;
                    Sector.find({ removed: 'false' }).exec(function(err, sectors) {
                        return res.view('company/setup', { company: com[0], sectors: sectors });
                    });
                } else {
                    CompanyRequest.findOne({ contact_email: email }).exec(function (err, coy) {
                        if (err) return console.log(err);
                        var comp = {
                            company_name: coy.company_name,
                            contact_person: coy.contact_person,
                            contact_phone: coy.contact_phone,
                            contact_email: coy.contact_email
                        };
                        Company.create(comp).exec(function (err, cmpy) {
                            if (err) return console.log(err);
                            req.session.coy_id = cmpy.id;
                            Sector.find({ removed: 'false' }).exec(function(err, sectors) {
                                return res.view('company/setup', { company: cmpy, sectors: sectors, first_time: 'true' });
                            });
                        });
                    });
                }
            });
        }
    },

    updateDetails: function (req, res) {
        var q = req.param;

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
        function(err) {
            if (err) {
                return res.badRequest(err);
            }
            Passwords.encryptPassword({
                password: q('password'),
            }).exec({
                error: function (err) {
                    return res.serverError(err);
                },
                success: function (encryptedPassword) {
                    // add access user for this company
                    var user = {
                        fullname: q('contact_person'),
                        email: q('contact_email'),
                        password: encryptedPassword,
                        company: req.session.coy_id,
                        user_type: 'company-admin'
                    };
                    User.create(user).exec(function() {});
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
                        logo_name: filename
                    };
                    Company.update({ id: req.session.coy_id }, data).exec(function (err, com) {
                        if (err) return;
                        //return res.view('company/setup', { company: com });
                        return res.json(200, { status: 'success' });
                    });
                }
            });
        });
    },

    profile: function(req, res) {
        Company.findOne({ id: req.session.coy_id }).exec(function (err, com) {
            if (err) return console.log(err);
            Sector.find({ removed: 'false'}).exec(function(err, sectors) {
                return res.view('company/setup', { company: com, sectors: sectors });
            });
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
            CompanyUser.find({ email: email }).exec(function(err, coy_user) {
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
                    return res.view('company/users/profile', { user: coy_user[0], me: me, first_time: true });
                });
            });
        } else {
            console.log('Wrong hash')
        }
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
        CompanyUser.find({ company: req.session.coy_id }).exec(function(err, users) {
            if (err) return;
            return res.view('company/users', { users: users });
        });
    },

    removeUser: function(req, res) {
        CompanyUser.destroy({ id: req.param('id') }).exec(function(err, user) {
            User.destroy({ email: user.email }).exec(function() {});
            return res.json(200, { status: 'success' });
        });
    }
};

