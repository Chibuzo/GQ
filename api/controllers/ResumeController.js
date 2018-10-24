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
            ResumeService.viewResume(req.session.userId, 'user'),
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

            if (resume.scrapped === true) {
                ResumeService.fetchScrappedCV(req.session.userId).then(function(resp) {
                    return res.view('cv/update', {
                        resume: resume,
                        me: me,
                        cv: resp,
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
                    // keep quiet for now
                    //return res.serverError(err);
                    // return res.view('cv/update', {
                    //     resume: resume,
                    //     me: me,
                    //     honours: honours,
                    //     r_class: r_class,
                    //     countries: resp.countries,
                    //     states: resp.states,
                    //     result: test,
                    //     test_title: results[2].test_title,
                    //     canEditResume: true,
                    //     showContactInfo: true,
                    //     completeResumeEducation: resume.profile_status && hasEducationName && hasEducationProgram,
                    //     userEmail: userEmail,
                    //     enableAmplitude: enableAmplitude,
                    //     disablePhotoTabClass,
                    //     disableTestTabClass,
                    //     disableVideoTabClass
                    // });
                });
            } else {
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
            }
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
        let institution = q('institution') || [];
        for (var i = 0; i < institution.length; i++) {
            if (q('institution')[i].length < 1) continue;   // cus we don't add no school name

            var education = {
                institution: q('institution')[i],
                honour: q('honour')[i],
                r_class: q('r_class')[i],
                programme: q('programme')[i],
                start_date: q('inst_start_date')[i] ? new Date(Date.parse(q('inst_start_date')[i])).toISOString() : new Date().toISOString(),
                end_date: q('inst_end_date')[i] ?  new Date(Date.parse(q('inst_end_date')[i])).toISOString(): new Date().toISOString(),
                resume: q('resume_id')
            };
            if (q('inst_id') && q('inst_id')[i] && q('inst_id')[i] > 0) {
                Education.update({ id: q('inst_id')[i] }, education).exec(function() {});
                sections.education = true;
            } else {
                try {
                    Education.create(education).exec(function () {});
                    sections.education = true;
                } catch(err) {
                    console.log(err);
                }
            }
        }

        // Qualifications
        let qualifications = q('qualification') || [];
        for (var i = 0; i < qualifications.length; i++) {
            if (q('qualification')[i].length < 1) continue;

            var qualification = {
                qualification: q('qualification')[i],
                institution: q('qualification_institution')[i],
                date_obtained: q('qualification_date')[i] ? new Date(Date.parse(q('qualification_date')[i])).toISOString() : new Date().toISOString(),
                resume: q('resume_id')
            };

            if (q('qualification_id') && q('qualification_id')[i] && q('qualification_id')[i] > 0) {
                Qualification.update({ id: q('qualification_id')[i] }, qualification).exec(function() {});
            } else {
                Qualification.findOrCreate({ qualification: q('qualification'), resume: q('resume_id') }, qualification).exec(function(err, qu) {});
                //sections.qualification = true;
            }
        }

        // Employments
        let coy = q('company') || [];
        for (var i = 0; i < coy.length; i++) {
            if (q('company')[i].length < 1) continue;

            var employment = {
                company: q('company')[i],
                role: q('job_title')[i],
                location: q('location')[i],
                duties: q('duty')[i],
                start_date: q('employment_start_date')[i] ? new Date(Date.parse(q('employment_start_date')[i])).toISOString() : new Date().toISOString(),
                end_date: q('employment_end_date')[i] ? new Date(Date.parse(q('employment_end_date')[i])).toISOString() : new Date().toISOString(),
                resume: q('resume_id')
            };

            if (q('employment_id') && !_.isUndefined(q('employment_id')[i]) && q('employment_id')[i] > 0) {
                Employment.update({ id: q('employment_id')[i] }, employment).exec(function() {});
            } else {
                try {
                    Employment.create(employment).exec(function() {});
                } catch(err) {
                    console.log(err);
                }
            }
        }

        // Reference Contact, not compulsory
        let references = q('reference_fname') || [];
        for (var i = 0; i < references.length; i++) {
            if (q('reference_fname')[i].length < 1) continue;

            var reference = {
                name: q('reference_fname')[i] + ' ' + q('reference_lname')[i],
                company: q('reference_company')[i],
                job_title: q('reference_job_title')[i],
                email: q('reference_email')[i],
                phone: q('reference_phone')[i],
                resume: q('resume_id')
            };

            if (q('reference_id') && q('reference_id')[i] && q('reference_id')[i] > 0) {
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
            dob: q('dob') ? new Date(Date.parse(q('dob'))).toISOString() : new Date().toISOString(),
            phone: q('phone'),
            country: q('country'),
            r_state: q('state'),
            city: q('city'),
            address: q('address'),
            introduction: q('introduction'),
            employment_status: q('employment_status'),
            available_date: q('available_date') ? new Date(Date.parse(q('available_date'))).toISOString() : new Date().toISOString(),
            current_salary: q('current_salary') ? q('current_salary') : 0.0,
            expected_salary: q('expected_salary') ? q('expected_salary') : 0.0,
            profile_status: true,
            status: status
        };

        // send resume data 
        ResumeService.sendShortForm(sendShortForm);

        // count resume only when it hasn't been updated for the first time
        if (q('profile_status') === false) GeneralReportService.updateField('complete_resume');

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
            if (response.resume.scrapped === true) {
                ResumeService.fetchScrappedCV(response.resume.user.id).then(cv => {
                    return res.view('admin/gqprofileview', {
                        resume: response.resume,
                        scrapped_cv: true,
                        cv: cv,
                        me: me,
                        result: result,
                        test_title: response.test_title ? response.test_title : null,
                        showContactInfo: true
                    });
                }).catch(err => {
                    return res.serverError(err);
                });
            } else {
                return res.view('cv/viewresume', {
                    resume: response.resume,
                                    me: me,
                    result: response.result ? response.result : null,
                    test_title: response.test_title ? response.test_title : null,
                    folder: folder
                });
            }
        }).catch(function(err) {
            console.log(err);
        });
    },
    
    viewJobResume: function(req, res) {
        Job.findOne(req.param('job_id')).exec(function(err, job) {
            if (err) {
                return res.serverError(err);
            }
            Resume.find({ user: req.param('user_id') }).then(resume => {
                ResumeService.viewResume(resume[0].id).then(function(response) {
                    var me = {
                        fname: response.resume.user.fullname.split(' ')[0],
                        lname: response.resume.user.fullname.split(' ')[1]
                    };
                    var result = response.result === undefined ? 'T_ERROR' : response.result; // T_ERROR - one of the tests wasn't taken
                    return res.view('company/gqprofileview', {
                        resume: response.resume,
                        me: me,
                        result: result,
                        test_title: response.test_title ? response.test_title : null,
                        showContactInfo: job.paid === true ? true : false
                    });
                }).catch(function(err) {
                    return res.serverError(err);
                });
            }).catch(err => {
                return res.serverError(err);
            });
        });
    },

    viewResumeByUser: function(req, res) {
        return Resume.find({ user: req.param('user_id') })
            .then(resume => {
                ResumeService.viewResume(resume[0].id).then(function(response) {
                    var me = {
                        fname: response.resume.user.fullname.split(' ')[0],
                        lname: response.resume.user.fullname.split(' ')[1]
                    };
                    var result = response.result === undefined ? 'T_ERROR' : response.result; // T_ERROR - one of the tests wasn't taken
                    if (resume[0].scrapped === true) {
                        ResumeService.fetchScrappedCV(resume[0].user).then(cv => {
                            return res.view('admin/gqprofileview', {
                                resume: response.resume,
                                scrapped_cv: true,
                                cv: cv,
                                me: me,
                                result: result,
                                test_title: response.test_title ? response.test_title : null,
                                showContactInfo: true
                            });
                        }).catch(err => {
                            return res.serverError(err);
                        });
                    } else {
                        return res.view('admin/gqprofileview', {
                            resume: response.resume,
                            me: me,
                            result: result,
                            test_title: response.test_title ? response.test_title : null,
                            showContactInfo: true
                        });
                    }
                }).catch(function(err) {
                    return res.serverError(err);
                });
            })
            .catch(err => {
                return res.serverError(err);
            });
    },

    removeEducation: function(req, res) {
        Education.destroy({ id: req.param('id') }).exec(function() {});
        return res.ok();
    },

    removeCertification: function(req, res) {
        Qualification.destroy({ id: req.param('id') }).exec( {});
        return res.ok();
    },

    removeEmployment: function(req, res) {
        Employment.destroy({ id: req.param('id') }).exec(function() {});
        return res.ok();
    },

    removeReferee: function(req, res) {
        ReferenceContact.destroy({ id: req.param('id') }).exec(function() {});
        return res.ok();
    },


    changeType: function(req, res) {
        if (req.session.userId) {
            Resume.update({ user: req.session.userId }, { scrapped: 'true', profile_status: true }).exec(function(err) {
                if (err) {
                    return res.serverError(err);
                }
                return res.json(200, { status: 'success' });
            });
        }
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
