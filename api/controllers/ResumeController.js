/**
 * ResumeController
 *
 * @description :: Server-side logic for managing Resumes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	editView: function(req, res) {
        const userEmail = req.session.userEmail;
        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;


       return Promise.all([
            CountryStateService.getCountries(),
            Honour.find(),
            ResumeService.viewResume(req.session.userId, 'user')
        ]).then(results => {
            let resp = results[0];
            let honours = results[1];
            let resume = results[2].resume;
            let test = results[2].result;

            var me = {
                fname: resume.user.fullname.split(' ')[0],
                lname: resume.user.fullname.split(' ')[1]
            };
            let resumeEducation = resume.educations;

            let hasEducationName = resumeEducation && resumeEducation[0] && resumeEducation[0].institution ? true : false;
            let hasEducationProgram = resumeEducation && resumeEducation[0] && resumeEducation[0].programme ? true : false;

            let disablePhotoTabClass = !resume.profile_status ? 'disable-tab': '';
            let disableTestTabClass = !resume.profile_status || !resume.photo_status ? 'disable-tab': '';
            let disableVideoTabClass = !resume.profile_status || !resume.photo_status || !resume.test_status ? 'disable-tab': '';

            let r_class = [
                { name: "1st Class", id: 1 }, { name: "2nd Class Upper", id: 2 }, { name: "2nd Class Lower", id: 3 }, { name: "3rd Class", id: 4 }
            ];

            return res.view('cv/update', {
                resume: resume,
                me: me,
                honours: honours,
                r_class: r_class,
                countries: resp.countries,
                states: resp.states,
                result: test,
                test_title: results[2].test_title,
                canEditResume: true,
                showContactInfo: true,
                completeResumeEducation: resume.profile_status && hasEducationName && hasEducationProgram,
                userEmail: userEmail,
                enableAmplitude: enableAmplitude,
                disablePhotoTabClass,
                disableTestTabClass,
                disableVideoTabClass
            });

        }).catch(err => {
            return res.serverError(err);
        });
    },


    save: function(req, res) {
        var q = req.param;  // trying to make life easier
        var sections = [], status; // for profile complete status
        let resumeId = q('resume_id');

       // lets handle associative data
       // Education
        for (var i = 0; i < q('institution').length; i++) {
            if (q('institution')[i].length < 1) continue;   // cus we don't add no school name

            var education = {
                institution: q('institution')[i],
                honour: q('honour')[i],
                r_class: q('r_class')[i],
                programme: q('programme')[i],
                start_date: new Date(Date.parse(q('inst_start_date')[i])).toISOString(),
                end_date: new Date(Date.parse(q('inst_end_date')[i])).toISOString(),
                resume: q('resume_id')
            };

            if (q('inst_id')[i] && q('inst_id')[i] > 0) {
                Education.update({ id: q('inst_id')[i] }, education).exec(function() {});
                sections.education = true;
            } else {
                Education.findOrCreate({
                    institution: q('institution')[i],
                    honour: q('honour')[i],
                    programme: q('programme')[i]
                }, education).exec(function () {});
                sections.education = true;
            }
        }

        // Qualifications
        for (var i = 0; i < q('qualification').length; i++) {
            if (q('qualification')[i].length < 1) continue;

            var qualification = {
                qualification: q('qualification')[i],
                institution: q('qualification_institution')[i],
                date_obtained: new Date(Date.parse(q('qualification_date')[i])).toISOString(),
                resume: q('resume_id')
            };

            if (q('qualification_id')[i] && q('qualification_id')[i] > 0) {
                Qualification.update({ id: q('qualification_id')[i] }, qualification).exec(function() {});
            } else {
                Qualification.findOrCreate({ qualification: q('qualification') }, qualification).exec(function() {});
                //sections.qualification = true;
            }
        }

        // Employments
        for (var i = 0; i < q('company').length; i++) {
            if (q('company')[i].length < 1) continue;

            var employment = {
                company: q('company')[i],
                role: q('job_title')[i],
                location: q('location')[i],
                duties: q('duty')[i],
                start_date: new Date(Date.parse(q('employment_start_date')[i])).toISOString(),
                end_date: new Date(Date.parse(q('employment_end_date')[i])).toISOString(),
                resume: q('resume_id')
            };

            if (q('employment_id') && !_.isUndefined(q('employment_id')[i]) && q('employment_id')[i] > 0) {
                Employment.update({ id: q('employment_id')[i] }, employment).exec(function() {});
            } else {
                Employment.findOrCreate({ company: q('company'), role: q('job_title') }, employment).exec(function() {});
                //sections.employment = true;
            }
        }

        // Reference Contact, not compulsory
        for (var i = 0; i < q('reference_fname').length; i++) {
            if (q('reference_fname')[i].length < 1) continue;

            var reference = {
                name: q('reference_fname')[i] + ' ' + q('reference_lname')[i],
                company: q('reference_company')[i],
                job_title: q('reference_job_title')[i],
                email: q('reference_email')[i],
                phone: q('reference_phone')[i],
                resume: q('resume_id')
            };

            if (q('reference_id')[i] && q('reference_id')[i] > 0) {
                ReferenceContact.update({ id: q('reference_id')[i] }, reference).exec(function() {});
            } else {
                ReferenceContact.create(reference).exec(function() {});
            }
        }

        if ((q('video_status') == true) && (q('test_status') == true)) {
            status = 'Complete';
        } else {
            status = 'Incomplete';
        }

        var data = {
            fullname: q('fname') + ' ' + q('lname'),
            gender: q('gender'),
            dob: new Date(Date.parse(q('dob'))).toISOString(),
            phone: q('phone'),
            country: q('country'),
            r_state: q('state'),
            city: q('city'),
            address: q('address'),
            introduction: q('introduction'),
            employment_status: q('employment_status'),
            available_date: new Date(Date.parse(q('available_date'))).toISOString(),
            current_salary: q('current_salary') ? q('current_salary') : 0.0,
            expected_salary: q('expected_salary') ? q('expected_salary') : 0.0,
            profile_status: true,
            status: status
        };

        Resume.update({ id: q('resume_id') }, data).then(resume => {
            // just update fullname on user table
            User.update({ id: resume[0].user }, { fullname: data.fullname }).exec(function() {});

            return res.json(200, { status: 'success' });
        }).catch(err => {
            console.error(err);

            if (err.invalidAttributes && err.invalidAttributes.phone && err.invalidAttributes.phone[0] && err.invalidAttributes.phone[0].rule === 'unique') {
                return res.json(200, {
                    status: 'error',
                    msg: 'You may already have an account on getQualified, Please try logging in to it.'
                });
            } else {
                return res.json(200, { status: 'error', msg: err });
            }
        });
    },

    getVideo: function(req, res) {
        var candidate_id = req.param('candidate_id');
        Resume.find({ user: candidate_id }).exec(function(err, resume) {
            if (err) return res.json(200, { status: 'error' });
            return res.json(200, { status: 'success', resume: resume[0] });
        });
    },

    viewResume: function(req, res) {
        var resume_id = req.param('resume_id');

        ResumeService.viewResume(resume_id).then(function(response) {
            var me = {
                    fname: response.resume.user.fullname.split(' ')[0],
                    lname: response.resume.user.fullname.split(' ')[1]
            };
            return res.view('cv/viewresume', {
                resume: response.resume,
                                me: me,
                               // r_class: r_class,
                result: response.result ? response.result : null,
                test_title: response.test_title ? response.test_title : null,
                folder: folder
            });
        }).catch(function(err) {
            console.log(err);
        });
    },

    viewResumeByUser: function(req, res) {
        if (req.session.user_type == 'company' || req.session.user_type == 'company-admin') {
            folder = 'company';
        } else if (req.session.user_type == 'admin') {
            folder = 'admin';
        }

        return Resume.find({ user: req.param('user_id') })
            .then(resume => {
                ResumeService.viewResume(resume[0].id).then(function(response) {
                    var me = {
                        fname: response.resume.user.fullname.split(' ')[0],
                        lname: response.resume.user.fullname.split(' ')[1]
                    };
                    return res.view(folder + '/gqprofileview', {
                        resume: response.resume,
                        me: me,
                        result: response.result ? response.result : null,
                        test_title: response.test_title ? response.test_title : null,
                        folder: folder,
                        showContactInfo: folder === 'admin' ? true : false
                    });
                }).catch(function(err) {
                    return res.serverError(err);
                });

            })
            .catch(err => {
                return res.serverError(err);
            })
    },


    viewSampleCV: function(req, res) {
        res.setHeader('Content-disposition', 'inline; filename=sampleCV.pdf');
        res.setHeader('Content-type', 'application/pdf');
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();
        fileAdapter.read(sails.config.appPath + '/assets/sampleCV.pdf').on('error', function (err) {
            return res.serverError(err);
        }).pipe(res);
    }
};
