/**
 * ResumeController
 *
 * @description :: Server-side logic for managing Resumes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	updateResume: function(req, res) {
        Resume.findOne({ user: req.session.userId })
            .populate('user').populate('educations').populate('qualifications').populate('employments').populate('referencecontacts')
            .exec(function(err, resume) {
            if (err) return;
            var me = {
                fname: resume.user.fullname.split(' ')[0],
                lname: resume.user.fullname.split(' ')[1]
            };
            return res.view('cv/update', { resume: resume, me: me });
        });
    },

    save: function(req, res) {
        var q = req.param;
        var data = {
            gender: q('gender'),
            phone: q('phone'),
            address: q('address'),
            introduction: q('introduction'),
            employment_status: q('employment_status'),
            available_date: q('available_date'),
            expected_salary: q('expected_salary')
        };

        Resume.update({ id: q('resume_id') }, data).exec(function(err, resume) {
            if (err) {
                return res.json(200, { status: 'error', msg: err });
            }
            // lets handle associative data
            // Education
            for (var i = 0; i < q('institution').length; i++) {
                if (q('institution')[i].length < 1) continue;

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
                } else {
                    Education.create(education).exec(function() {});
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
                }
            }

            // Employments
            for (var i = 0; i < q('company').length; i++) {
                if (q('company')[i].length < 1) continue;

                var employment = {
                    company: q('company')[i],
                    role: q('job_title')[i],
                    start_date: new Date(Date.parse(q('employment_start_date')[i])).toISOString(),
                    end_date: new Date(Date.parse(q('employment_start_date')[i])).toISOString(),
                    resume: q('resume_id')
                };

                if (q('employment_id')[i] && q('employment_id')[i] > 0) {
                    Employment.update({ id: q('employment_id')[i] }, employment).exec(function() {});
                } else {
                    Employment.create(employment).exec(function() {});
                }
            }

            // Reference Contact
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
            return res.json(200, { status: 'success' });
        });
    }
};

