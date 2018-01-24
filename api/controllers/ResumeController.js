/**
 * ResumeController
 *
 * @description :: Server-side logic for managing Resumes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	editView: function(req, res) {
        var test_id = 1;
        Resume.findOne({ user: req.session.userId })
            .populate('user').populate('educations').populate('qualifications').populate('employments').populate('referencecontacts')
            .exec(function(err, resume) {
                if (err) return;
                var me = {
                    fname: resume.user.fullname.split(' ')[0],
                    lname: resume.user.fullname.split(' ')[1]
                };
                CountryStateService.getCountries().then(function(resp) {
                    Honour.find().exec(function(err, honours) {
                        // check for test result
                        GQTestResult.find({
                            test: test_id,
                            candidate: req.session.userId
                        }).populate('test').exec(function (err, test_result) {
                            if (err) console.log(err)
                            if (test_result.length > 0) {
                                GQTestService.prepareCandidateResult(test_id, test_result[0].score, test_result[0].no_of_questions).then(function (result) {
                                    return res.view('cv/update', {
                                        resume: resume,
                                        me: me,
                                        honours: honours,
                                        countries: resp.countries,
                                        states: resp.states,
                                        result: result,
                                        test_title: test_result[0].test.test_name
                                    });
                                });
                            } else {
                                return res.view('cv/update', {
                                    resume: resume,
                                    me: me,
                                    honours: honours,
                                    countries: resp.countries,
                                    states: resp.states
                                });
                            }
                        });
                    })
                });
            });
    },

    save: function(req, res) {
        var q = req.param;  // trying to make life easier
        var sections = [], status;

        // lets handle associative data
        // Education
        for (var i = 0; i < q('institution').length; i++) {
            if (q('institution')[i].length < 1) continue;   // cus we don't add no school name

            var education = {
                institution: q('institution')[i],
                honour: q('honour')[i],
                programme: q('programme')[i],
                start_date: new Date(Date.parse(q('inst_start_date')[i])).toISOString(),
                end_date: new Date(Date.parse(q('inst_end_date')[i])).toISOString(),
                resume: q('resume_id')
            };

            if (q('inst_id')[i] && q('inst_id')[i] > 0) {
                Education.update({ id: q('inst_id')[i] }, education).exec(function() {});
                sections.education = true;
            } else {
                Education.create(education).exec(function() {});
                sections.education = true;
            }
        }

        // Qualifications
        for (var i = 0; i < q('qualification').length; i++) {
            if (q('qualification')[i].length < 1) continue;

            var qualification = {
                qualification: q('qualification')[i],
                date_obtained: new Date(Date.parse(q('qualification_date')[i])).toISOString(),
                resume: q('resume_id')
            };

            if (q('qualification_id')[i] && q('qualification_id')[i] > 0) {
                Qualification.update({ id: q('qualification_id')[i] }, qualification).exec(function() {});
            } else {
                Qualification.create(qualification).exec(function() {});
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
                end_date: new Date(Date.parse(q('employment_start_date')[i])).toISOString(),
                resume: q('resume_id')
            };

            if (q('employment_id') && !_.isUndefined(q('employment_id')[i]) && q('employment_id')[i] > 0) {
                Employment.update({ id: q('employment_id')[i] }, employment).exec(function() {});
            } else {
                Employment.create(employment).exec(function() {});
                sections.employment = true;
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
        if (sections.education && (q('video_status') == 1) && (q('test_status') == 1)) {
            status = 'Complete';
        } else {
            status = 'Incomplete';
        }
        var data = {
            gender: q('gender'),
            dob: q('dob'),
            phone: q('phone'),
            country: q('country'),
            r_state: q('state'),
            city: q('city'),
            address: q('address'),
            introduction: q('introduction'),
            employment_status: q('employment_status'),
            available_date: q('available_date'),
            expected_salary: q('expected_salary'),
            status: status
        };
        Resume.update({ id: q('resume_id') }, data).exec(function(err, resume) {
            if (err) {
                return res.json(200, { status: 'error', msg: err });
            }
            return res.json(200, { status: 'success' });
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
            return res.view('applicant/viewresume', {
                resume: response.resume,
                result: response.result ? response.result : null,
                test_title: response.test_title ? response.test_title : null
            });
        }).catch(function(err) {
            console.log(err);
        });
    },

    viewResumeByUser: function(req, res) {
        Resume.find({ user: req.param('user_id') }).exec(function(err, resume) {
            ResumeService.viewResume(resume[0].id).then(function(response) {
                return res.view('applicant/viewresume', {
                    resume: response.resume,
                    result: response.result ? response.result : null,
                    test_title: response.test_title ? response.test_title : null
                });
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
};

