/**
 * JobApiController
 *
 * @description :: Server-side logic for managing Jobapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createJob: function(req, res) {
        if (req.headers['content-type'] !== 'application/json') {
            return res.json(400, { status: 'error', message: 'Acceptable content-type header is missing' });
        }
        var data;
        try {
            data = req.body.request;
        } catch(err) {
            return res.json(400, { status: 'error', message: 'Invalid JSON body' });
        }
        JobApiService.authenticate(data.authentication.ID).then(function(auth) {
            if (auth.status === true) {
                
                // company details
                let coy_data = {
                    company_name: data.job.company.company_name,
                    contact_person: data.job.company.contact_person,
                    contact_email: data.job.company.contact_email,
                    contact_phone: data.job.company.contact_phone,
                    description: data.job.company.tagline || '',
                    logo_link: data.job.company.logo || '',
                    website: data.job.company.website || '',
                    linkedin: data.job.company.linkedin || ''
                };
                CompanyService.saveCompany(coy_data);

                // save job
                JobApiService.saveJob(data.job, auth.company.id).then(function(job_id) {
                    return res.json(201, { status: 'success', jobID: job_id });
                }).catch(function(err) {
                    console.log(err)
                    return res.json(400, { status: 'error', message: err });
                });
            }
        }).catch(function(err) {
            console.log(err);
            return res.json(400, {status: 'error', message: err });
        });
    },

    apply: function(req, res) {
        var q = req.param;
        console.log(q);
        if (req.headers['content-type'] !== 'application/x-www-form-urlencoded' && req.headers['content-type'] !== 'application/json') {
            return res.json(400, { status: 'error', message: 'Acceptable content-type header is missing' });
        }
        if (!q('email')) {
            return res.json(404, { status: 'error', message: 'Email not found' });
        }
        if (isNaN(q('jobID'))) {
            return res.json(400, { status: 'error', message: 'Job ID must be a number' });
        }
        if (!q('cv_link')) {
            return res.json(404, { status: 'error', message: 'CV link not found' });
        }

        // sign up candidate
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
            expected_salary: q('expected_annual_salary') ? q('expected_annual_salary') : 0.0,
            profile_status: 'true',
            source: q('source') || 'GJ',
            scrapped: '1'
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
                        // queue up CV for ingesting
                        let message = { 
                            filename: q('cv_link'),
                            user_id: applicant.id,
                            short_form: {
                                fullname: data.fullname,
                                email: data.email,
                                gender: data.gender,
                                dob: data.dob,
                                phone: data.phone,
                                address: data.address,
                                resident_country: data.country,
                                state: data.r_state,
                                city: data.city,
                                profession_summary: data.introduction,
                                employment_status: data.employment_status,
                                current_annual_salary: data.current_salary,
                                expected_annual_salary: data.expected_salary
                            }
                        };
                        SQSService.sendJob(JSON.stringify(message));

                        // call Seyi to ingest...
                        const request = require("request");

                        request({ method: 'GET', url: 'http://api.neon.ventures/cvextractor/api/?i=gq/cv/process-sqs&limit=10' }, function(err) {});

                        sendMail.sendAppliedJobNotice(job, applicant, applicant.user_status);
                        JobApiService.returnFilteredStat(job.id, job.subscription).then(stats => {
                            return res.json(200, { status: 'success', data: stats });
                        }).catch(err => {
                            console.log(err);
                        });
                    });
                } else {
                    return res.json(400, { status: 'error', message: 'Couldn\'t apply for the job. Please make sure you are sending all correct details'});
                }
            }).catch(err => {
                return res.json(400, { status: 'error', message: err });
            });
        }).catch(err => {
            return res.json(400, { status: 'error', message: err });
        });        
    },


    returnJobUrl: function(req, res) {
        var job_id = req.param('jobID');
        JobApiService.returnJobUrl(job_id).then(function(url) {
            return res.json(200, { status: 'success', jobID: job_id, joburl: url });
        }).catch(function(err) {
            return res.json(400, { status: 'error', message: err });
        });
    },

    fetchJobStat: function(req, res) {
        if (isNaN(req.param('jobID'))) {
            return res.json(400, { status: 'error', message: 'Job ID must be a number' });
        }
           
        JobApiService.returnFilteredStat(req.param('jobID')).then(stats => {
            return res.json(200, { status: 'success', data: stats });
        }).catch(err => {
            return res.json(400, { status: 'error', message: err });
        });
    },

    changeSubscription: function(req, res) {
        let job_id = req.param('jobID');
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
