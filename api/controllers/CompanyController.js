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
                    return res.view('company/setup', { company: com[0] });
                }
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
                        return res.view('company/setup', { company: cmpy });
                    });
                });
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
                        company: q('company_id'),
                        user_type: 'company'
                    };
                    User.create(user).exec(function() {});
                    var data = {
                        company_name: q('company_name'),
                        contact_person: q('contact_person'),
                        contact_phone: q('contact_phone'),
                        contact_email: q('contact_email'),
                        description: q('description'),
                        address: q('address'),
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
            return res.view('company/setup', { company: com });
        });
    }
};

