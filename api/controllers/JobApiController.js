/**
 * JobApiController
 *
 * @description :: Server-side logic for managing Jobapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createJob: function(req, res) {
        var data;
        try {
            data = req.body.request;
        } catch(err) {
            return res.json(400, { status: 'error', message: 'Invalid JSON body' });
        }
        JobApiService.authenticate(data.authentication.ID).then(function(auth) {
            if (auth.status === true) {
                JobApiService.saveJob(data.job, auth.company.id).then(function(status) {
                    return res.json(201, { status: 'success' });
                }).catch(function(err) {
                    return res.json(400, { status: 'error', message: err });
                });
            }
        }).catch(function(err) {
            console.log(err);
            return res.json(400, {status: 'error', message: err });
        });
    },

    apply: function(req, res) {
        // sign up candidate
        var q = req.param;
        var data = {
            email: q('email'),
            fullname: q('fullname'),
            gender: q('gender'),
            dob: q('dob') ? new Date(Date.parse(q('dob'))).toISOString() : new Date().toISOString(),
            r_state: q('state'),
            country: q('country'),
            city: q('city'),
            phone: q('phone'),
            introduction: q('professional_summary'),
            employment_status: q('employment_status'),
            current_salary: q('current_annual_salary') ? q('current_annual_salary') : 0.0,
            expected_salary: q('expected_annual_salary') ? q('expected_annual_salary') : 0.0
            //cv_link: q('cv_link')
        };
        ResumeService.createNewResume(data).then(applicant => {
            // apply to job
            JobService.apply(q('jobID'), applicant.id).then(status => {
                if (status ===  true) {
                    // notify by email
                    Job.findOne(q('jobID')).populate('company').exec(function(err, job) {
                        if (err) {
                            return res.json(400, { status: 'error', message: err });
                        }
                        sendMail.sendAppliedJobNotice(job, applicant, applicant.user_status);
                        return res.json(200, { status: 'success' });
                    });
                }
            }).catch(err => {
                return res.json(400, { status: 'error', message: err });
            });
        }).catch(err => {
            return res.json(400, { status: 'error', message: err });
        });        
    },


    returnJobUrl: function(req, res) {
        var job_id = req.param('job_id');
        JobApiService.returnJobUrl(job_id).then(function(url) {
            return res.json(200, { status: 'success', jobID: job_id, joburl: url });
        }).catch(function(err) {
            return res.json(400, { status: 'error', message: err });
        });
    },

    fetchJobStat: function(req, res) {
        if (isNaN(req.param('job_id'))) {
            return res.json(400, { status: 'error', message: 'Job ID must be a number' });
        }
           
        JobApiService.returnFilteredStat(job.id).then(stats => {
            return res.json(200, { status: 'success', data: stats });
        }).catch(err => {
            return res.json(400, { status: 'error', message: err });
        });
    },

    changeSubscription: function(req, res) {
        let job_id = req.param('job_id');
        let filter = req.param('filter_category');

        if (isNaN(job_id)) {
            return res.json(400, { status: 'error', message: 'Job ID must be a number' });
        }
        if (JobApiService.isValidJobFilter(filter) === true) {
            JobApiService.changeSubscription(job_id, filter).then(stats => {
                return res.json(200, { status: 'success', data: stats });
            }).catch(err => {
                return res.json(400, { status: 'error', message: err });
            });
        } else {
            return res.json(400, { status: 'error', message: 'Invalid job filtering category' });
        }
    },

    requestPremium: function(req, res) {
        // if (isNaN(req.param('jobID'))) {
        //     return res.json(400, { status: 'error', message: 'Job ID must be a number' });
        // }
        // lets make sure this is an actual {GJ} job
        // Job.findOne({ id: req.param('jobID'), source: 'GJ' }).exec(function(err, job) {
        //     if (err) {
        //         return res.json(400, { status: 'error' });
        //     }
        //     if (!job) {
        //         return res.json(400, { status: 'error', message: "The supplied job ID doesn't match any existing job" });
        //     }
            // make sure the sent company email is in fact email
            var Emailaddresses = require('machinepack-emailaddresses');
            Emailaddresses.validate({
                string: req.param('contact_email')
            }).exec({
                error: function(err) {
                    return res.json(400, { status: 'error', message: err });
                },
                invalid: function() {
                    return res.json(200, { status: 'error', message: 'Contact email doesn\'t look like an email to us' });
                },
                success: function() {
                    var comp = {
                        company_name: req.param('company_name'),
                        contact_person: req.param('contact_person'),
                        contact_phone: req.param('contact_phone'),
                        contact_email: req.param('contact_email')
                    };
                    CompanyService.signupRequest(comp).then(status => {
                        if (status === true) {
                            return res.json(200, { status: 'success' });
                        }
                        // send email to GQ
                    }).catch(err => {
                        return json(400, { status: 'error', message: err });
                    });
                }
            });
        //});
    }
};
