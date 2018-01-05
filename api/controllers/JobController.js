/**
 * JobController
 *
 * @description :: Server-side logic for managing Jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    newJobForm: function (req, res) {
        JobCategory.find().exec(function (err, categories) {
            CountryStateService.getCountries().then(function(resp) {
                return res.view('company/addjob', { jobcategories: categories, countries: resp.countries });
            }).catch(function(err) {
                return res.ok();
            });
        });
    },

    editJob: function (req, res) {
        Job.findOne({ id: req.param('job_id'), company: req.session.coy_id }).exec(function (err, job) {
            JobCategory.find().exec(function (err, categories) {
                CountryStateService.getCountries().then(function(resp) {
                    return res.view('company/editjob', { job: job, jobcategories: categories, countries: resp.countries });
                }).catch(function(err) {
                    return res.ok();
                });
            });
        });
    },

    // for companies
	viewJobs: function(req, res) {
        var coy_id = req.session.coy_id;
        Job.find({ company: coy_id }).populate('category').populate('applications').populate('poster').exec(function(err, jobs) {
            if (err) return;
            JobCategory.find().exec(function (err, categories) {
                return res.view('company/manage-jobs', { jobs: jobs, jobcategories: categories });
            });
        });
    },

    saveJob: function (req, res) {
        var q = req.param;
        var publish_date, publish = true; //q('publish_now') == 1 ? true : false;
        if (publish) publish_date = new Date().toISOString();
        var data = {
            job_title: q('title'),
            job_description: q('description'),
            job_requirements: q('requirements'),
            qualifications: q('qualifications'),
            job_level: q('job_level'),
            contract_type: q('contract_type'),
            category: q('category'),
            country: q('country'),
            location: q('location'),
            nice_to_have: q('nice_to_have'),
            poster: req.session.userId,
            published: publish,
            date_published: publish_date,
            closing_date: new Date(Date.parse(q('closing_date'))).toISOString(),
            company: req.session.coy_id
        };
        if (q('job_id') && _.isNumber(parseInt(q('job_id')))) {
            Job.update({ id: q('job_id') }, data).exec(function(err) {
                if (err) console.log(err);
                return res.redirect('/job/manage');
            });
        } else {
            Job.create(data).exec(function (err, job) {
                if (err) return console.log(err);
                return res.redirect('/job/manage');
            });
        }
    },

    //getJobTests: function (req, res) {
    //    Job.findOne({ id: req.param('job_id') }).populate('job_tests').exec(function (err, jobtests) {
    //        if (err) return res.serverError(err);
    //        return res.json(200, { status: 'success', jobtests: jobtests });
    //    });
    //},

    readApplicationCSV: function(req, res) {
        var job_id = req.param('job_id');

        var filename, csvpath = 'assets/csv-files';
        req.file('csv').upload({
            dirname: require('path').resolve(sails.config.appPath, csvpath),
            saveAs: function(file, cb) {
                var ext = file.filename.split('.').pop();
                filename = 'job_' + job_id + '.' + ext;
                return cb(null, filename);
            }
        },
        function(err, uploadedFile) {
            if (err) {
                return res.badRequest(err);
            }
            const fs = require('fs');
            fs.readFile(csvpath + '/' + filename, 'utf8', function(err, data) {
                var rows = data.split('\r\n');
                // sign up the applicants
                async.each(rows, function(row, cb) {
                    var entry = row.split(',');
                    if (entry.length == 3) {
                        var data = {
                            fullname: entry[0].trim(),
                            email: entry[1].trim(),
                            phone: entry[2].trim(),
                            user_type: 'Applicant'
                        };
                        Job.findOne({ id: job_id }).populate('company').exec(function (j_err, job) {
                            if (j_err) console.log(j_err);
                            User.create(data).exec(function(err, user) {
                                if (err) {
                                    if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                        // already a user so we try to automatically apply for this job on his behalf
                                        User.findOne({ email: entry[1].trim() }).exec(function (err, old_user) {
                                            if (err) cb('err');
                                            if (old_user.status == 'Inactive') {
                                                sendMail.sendAppliedJobNotice(job, old_user);
                                            }
                                            JobService.apply(job_id, old_user.id).then(function (resp) {
                                                //console.log(resp);
                                            }).catch(function (err) {
                                                console.log(err);
                                            });
                                            cb();
                                        });
                                    }
                                }
                                if (user) {
                                    JobService.apply(job_id, user.id);
                                    sendMail.sendAppliedJobNotice(job, user);
                                    cb();
                                }
                            });
                        });
                    }
                },
                function (err) {
                    if (err) return console.log(err);
                    return res.redirect('/job/manage');
                });
            });
        });
    },

    // for candidates
    listJobs: function(req, res) {
        var today = new Date().toISOString();
        Job.find({ closing_date: { '>': today } }).populate('category').populate('company').exec(function(err, jobs) {
        //Job.find({}).populate('category').populate('company').exec(function(err, jobs) {
            if (err) return;
            JobCategory.find().populate('jobs').exec(function(err, job_categories) {
                return res.view('jobs', { jobs: jobs, job_categories: job_categories });
            });
        });
    },

    findJobsByCategory: function(req, res) {
        var category_id = req.param('id');
        var today = new Date().toISOString();

        Job.find({ category: category_id, closing_date: { '>': today } }).populate('category').populate('company').exec(function(err, jobs) {
            //Job.find({}).populate('category').populate('company').exec(function(err, jobs) {
            if (err) return;
            JobCategory.find().populate('jobs').exec(function(err, job_categories) {
                return res.view('jobs', { jobs: jobs, job_categories: job_categories });
            });
        });
    },

    showJob: function(req, res) {
        var job_id = req.param('id');
        Job.findOne({ id: job_id }).populate('company').exec(function(err, job) {
            if (err) return res.negotiate(err);
            console.log('Job: ' + job);
            var views = (!job.view_count) ? 1 : parseInt(job.view_count) + 1;
            Job.update({ id: job_id }, { view_count: views }).exec(function() {});
            return res.view('job', { job: job });
        });
    },

    apply: function(req, res) {
        var job_id = req.param('id');
        if (req.session.userId && req.session.user_type == 'Applicant') {
            // check resume completion status
            Resume.find({ user: req.session.userId }).exec(function(err, resume) {
                if (resume[0].status === undefined || resume[0].status == 'Incomplete') {
                    return res.json(200, { status: 'error', msg: 'IncompleteResume' });
                }
                JobService.apply(job_id, req.session.userId).then(function(resp) {
                    if (resp) {
                        return res.json(200, { status: 'success' });
                    } else {
                        // your village people don't want you to get a job
                    }
                });
            });
        } else {
            return res.json(200, { status: 'login' });
        }
    },

    viewApplicants: function(req, res) {
        var job_id =  req.param('job_id');
        Application.find({ job: job_id }).populate('applicant').exec(function(err, applicants) {
            return res.view('company/applicants-view.swig', { applicants: applicants });
        });
    },

    getApplicantsResults: function(req, res) {
        var job_id =  req.param('job_id');
        Job.find({ id: job_id }).populate('applications').exec(function(err, job) {
            JobTest.find({ job_level: job[0].job_level, job_category_id: job[0].category }).populate('test').exec(function(err, test) {
                var candidates = [];
                Application.find({ job: job_id }).exec(function(err, applicants) {
                    applicants.forEach(function(candidate) {
                        candidates.push(candidate.applicant);
                    });
                    CBTService.getJobTestResults(candidates, test[0]).then(function(resp) {
                        return res.view('company/testResults', { results: resp });
                    }).catch(function(err) {
                        console.log(err);
                    });
                });
            });
        });
    },

    deleteJob: function (req, res) {
        var id = req.param('id');
        if (!req.session.coy_id) return;
        Job.destroy({ id: id, company: req.session.coy_id }).exec(function(err) {
            if (err) return;
            return res.json(200, { status: 'success' });
        });
    }
};

