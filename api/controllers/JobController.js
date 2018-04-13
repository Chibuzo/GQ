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
                var coy_id = 0;
                if (req.session.admin) {
                    coy_id = req.param('coy_id');
                    folder = 'admin';
                } else {
                    folder = 'company';
                }
                return res.view(folder + '/addjob', { jobcategories: categories, countries: resp.countries, coy_id: coy_id });
            }).catch(function(err) {
                return res.ok();
            });
        });
    },

    editJob: function (req, res) {
        Job.findOne({ id: req.param('job_id') }).exec(function (err, job) {
            JobCategory.find().exec(function (err, categories) {
                CountryStateService.getCountries().then(function(resp) {
                    var folder;
                    if (req.session.admin) {
                        folder = 'admin';
                    } else {
                        folder = 'company';
                    }
                    return res.view(folder + '/editjob', {
                        job: job,
                        jobcategories: categories,
                        countries: resp.countries
                    });
                }).catch(function(err) {
                    return res.ok();
                });
            });
        });
    },

    // for companies
	viewJobs: function(req, res) {
        JobService.fetchCompanyJobs(req.session.coy_id).then(function(jobs) {
            return res.view('company/manage-jobs', { jobs: jobs });
        })
        .catch(function(err) {
            console.error(err);
            return res.serverError(err);
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
            salary_currency: q('currency'),
            min_salary_budget: q('min_salary_budget') ? q('min_salary_budget') : 0.0,
            max_salary_budget: q('max_salary_budget') ? q('max_salary_budget') : 0.0,
            published: publish,
            date_published: publish_date,
            closing_date: new Date(Date.parse(q('closing_date'))).toISOString(),
        };

        if (q('job_id') && _.isNumber(parseInt(q('job_id')))) {
            Job.update({ id: q('job_id') }, data).exec(function(err, job) {
                if (err) console.log(err);
                if (req.session.admin) {
                    return res.redirect('/admin/coy-jobs/' + job[0].company);
                } else {
                    return res.redirect('/job/manage');
                }
            });
        } else {
            data.poster = req.session.userId,
            data.company = req.session.coy_id ? req.session.coy_id : q('coy_id');
            Job.create(data).exec(function (err, job) {
                if (err) return console.log(err);
                User.find({ id: req.session.userId }).populate('company').exec(function(err, user) {
                    sendMail.companyNewJobAlert(user[0].email, user[0].fullname, q('title'));
                    if (req.session.coy_id) {
                        sendMail.GQnewJobAlert(user[0].company.company_name);
                    }
                });
                if (req.session.admin) {
                    return res.redirect('/admin/coy-jobs/' + job.company);
                } else {
                    return res.redirect('/job/manage');
                }
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
            var parser = require('csv-parse');
            const fs = require('fs');
            fs.readFile(csvpath + '/' + filename, 'utf8', function(err, csv_data) {
                parser(csv_data, {relax_column_count: true, rtrim: true, ltrim: true, skip_lines_with_empty_values: true}, function (err, data) {
                    async.eachSeries(data, function(entry, cb) {
                        var data = {
                            fullname: entry[0],
                            email: entry[1],
                            phone: entry[2],
                            user_type: 'Applicant'
                        };
                        Job.findOne({id: job_id}).populate('company').exec(function (j_err, job) {
                            if (j_err) console.log(j_err);
                            User.findOrCreate({ email: data.email }, data).exec(function (err, user) {
                                if (err) {
                                }
                                JobService.apply(job_id, user.id).then(function (resp) {
                                    //console.log(resp);
                                }).catch(function (err) {
                                    console.log(err);
                                });

                                var msg_type; // for determining the content of the invite email to send
                                if (user.status == 'Inactive') {
                                    msg_type = 'new-user';
                                    sendMail.sendAppliedJobNotice(job, user, msg_type);
                                    cb();
                                } else {
                                    Resume.find({user: user.id}).exec(function (err, resume) {
                                        if (resume[0].profile_status == true) {
                                            msg_type = 'fyi'; // inform them
                                        } else {
                                            msg_type = 'incomplete-profile';
                                        }
                                        sendMail.sendAppliedJobNotice(job, user, msg_type);
                                        cb();
                                    });
                                }
                            });
                        });
                    },
                    function(err) {
                        if (err) console.log(err);
                        return res.redirect('/job/manage');
                    });
                });
            });
        });
    },

    // for candidates
    listJobs: function(req, res) {
        var today = new Date(); //.toISOString();
        Job.find({ closing_date: { '>=': today }, status: 'Active' }).populate('category').populate('company').sort({ createdAt: 'desc' }).exec(function(err, jobs) {
        //Job.find({}).populate('category').populate('company').exec(function(err, jobs) {
            if (err) return;
            JobCategory.find().populate('jobs').sort({ category: 'asc' }).exec(function(err, job_categories) {
                var jobCategories = [];
                job_categories.forEach(function(jobcat) {
                    if (jobcat.jobs.length > 0) {
                        var active_jobs = 0;
                        jobcat.jobs.forEach(function(job) {
                            if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                                active_jobs++
                            }
                        });
                        jobCategories.push({
                            category: jobcat.category,
                            jobs: active_jobs,
                            id: jobcat.id
                        });
                    }
                });
                return res.view('jobs', { jobs: jobs, job_categories: jobCategories });
            });
        });
    },

    findJobsByCategory: function(req, res) {
        var category_id = req.param('id');
        var today = new Date().toISOString();

        Job.find({ category: category_id, status: 'Active', closing_date: { '>=': today } }).populate('category').populate('company').sort({ createdAt: 'desc' }).exec(function(err, jobs) {
            //Job.find({}).populate('category').populate('company').exec(function(err, jobs) {
            if (err) return;
            JobCategory.find().populate('jobs').sort({ category: 'asc' }).exec(function(err, job_categories) {
                var jobCategories = [];
                job_categories.forEach(function(jobcat) {
                    if (jobcat.jobs.length > 0) {
                        var active_jobs = 0;
                        jobcat.jobs.forEach(function(job) {
                            if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                                active_jobs++
                            }
                        });
                        jobCategories.push({
                            category: jobcat.category,
                            jobs: active_jobs,
                            id: jobcat.id
                        });
                    }
                });
                return res.view('jobs', { jobs: jobs, job_categories: jobCategories });
            });
        });
    },

    showJob: function(req, res) {
        var job_id = req.param('id');
        var today = new Date().toISOString();

        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;
        const userEmail = req.session.userEmail;

        Job.findOne({ id: job_id }).populate('company').exec(function(err, job) {
            if (err) return res.negotiate(err);
            var views = (!job.view_count) ? 1 : parseInt(job.view_count) + 1;
            Job.update({ id: job_id }, { view_count: views }).exec(function() {});
            JobCategory.find().populate('jobs').sort({ category: 'asc' }).exec(function(err, job_categories) {
                var jobCategories = [];
                job_categories.forEach(function(jobcat) {
                    if (jobcat.jobs.length > 0) {
                        var active_jobs = 0;
                        jobcat.jobs.forEach(function(job) {
                            if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                                active_jobs++
                            }
                        });
                        jobCategories.push({
                            category: jobcat.category,
                            jobs: active_jobs,
                            id: jobcat.id
                        });
                    }
                });
                return res.view('job', {
                    job: job,
                    job_categories: jobCategories,
                    enableAmplitude: enableAmplitude,
                    userEmail: userEmail
                });
            });
        });
    },

    apply: function(req, res) {
        var job_id = req.param('id');
        if (req.session.userId && req.session.user_type == 'Applicant') {
            // check resume completion status
            Resume.find({ user: req.session.userId }).exec(function(err, resume) {
                if (resume[0].status === undefined || resume[0].status == 'Incomplete') {
                    AmplitudeService.trackEvent("Applied to Job with Incomplete Resume", req.session.userEmail, {
                        jobId: job_id,
                        resumeStatus: resume[0].status,
                        profileStatus: resume[0].profile_status,
                        photoStatus: resume[0].photo_status,
                        videoStatus: resume[0].video_status,
                        testStatus: resume[0].test_status
                    });
                    return res.json(200, { status: 'error', msg: 'IncompleteResume' });
                }
                JobService.apply(job_id, req.session.userId).then(function(resp) {
                    if (resp) {
                        AmplitudeService.trackEvent("Applied to Job", req.session.userEmail, {
                            jobId: job_id
                        });
                        return res.json(200, { status: 'success' });
                    } else {
                        // your village people don't want you to be great
                    }
                });
            });
        } else {
            AmplitudeService.trackEvent("Unknown User Attempted to Apply to Job", "unknown@user.com", {
                jobId: job_id
            });
            req.session.job_id = job_id;
            return res.json(200, { status: 'login' });
        }
    },

    fetchShortlisted: function(req, res) {
        JobService.fetchShortlistedCandidates(req.param('job_id'), req.session.coy_id).then(function(slist) {
            return res.view('company/shortlist', { selected_candidates: slist });
        })
        .catch(function(error) {
            console.error(error);
            return res.serverError(error);
        });
    },

	viewApplicantsforAdmin: function(req, res) {
		if (req.session.user_type !== 'admin') {
			return res.forbidden();
		}

		const job_id =  req.param('job_id');

		if (!job_id) {
			return res.badRequest();
		}

		return Job.findOne({ id: job_id, status: 'Active' })
			.then(job => {

				return Promise.all([
					JobTest.findOne({ job_level: job.job_level, job_category_id: job.category }).populate('test'),
					Application.find({ job: job_id }).populate('applicant'),
					SelectedCandidate.find({job_id: job_id}).populate('candidate')
				]).then(results => {

					let jobTest = results[0];
					let applications = results[1];
					let selected_candidates = results[2];

					// fetch candidate ids for use in finding/computing their test result
					let candidatesIds = [];
					applications.forEach(function (application) {
						candidatesIds.push(application.applicant.id);
					});

					let shortlistedIds = [];
					selected_candidates.forEach(function (shortlisted) {
						shortlistedIds.push(shortlisted.candidate.id);
					});


					return Promise.all([
						CBTService.getJobTestResults(candidatesIds, jobTest), // TODO: Kind of redundant. All shortlisted Candidates are Candidates
						CBTService.getJobTestResults(shortlistedIds, jobTest)
					]).then(jobTestResults => {

						let allCandidates = jobTestResults[0];
						let shortlistedCandidates = jobTestResults[1];

						return res.view('admin/applicants-view.swig', {
							results: allCandidates,
							selected_candidates: shortlistedCandidates,
							job_id: job_id
						});
					}).catch(err => {
						return res.serverError(err);
					})
				})
				.catch(err => {
					return res.serverError(err);
				});
			})
			.catch(err => {
				return res.serverError(err);
			});
	},

    // fetches all candidates that applied for the job
    // fetches the test results
    // fetches shortlisted candidates
    // This is for both companies and GQ admin - and i'm not sure that's a good idea, but then, fuck it!
    viewApplicants: function(req, res) {
        // hold on, let's knows who's viewing this
        var folder;
        if (req.session.user_type == 'company' || req.session.user_type == 'company-admin') {
            folder = 'company';
        } else if (req.session.user_type == 'admin') {
            folder = 'admin';
        } else {
            return res.redirect('/');
        }

        var job_id =  req.param('job_id');
        Job.find({ id: job_id, status: 'Active' }).exec(function(err, job) {
            // let's prevent companies from viewing this data while the job is still active
            var today = new Date().toISOString();
            if (folder === 'company' && Date.parse(job[0].closing_date) >= Date.parse(today)) {
                return res.view('company/applicants-view.swig', { job_active: true });
            }

            JobTest.find({ job_level: job[0].job_level, job_category_id: job[0].category }).populate('test').exec(function(err, test) {
                // find those who applied for this job
                Application.find({ job: job_id }).populate('applicant').exec(function(err, applications) {
                    // fetch candidate ids for use in finding/computing their test result
                    var candidates = [];
                    applications.forEach(function (application) {
                        candidates.push(application.applicant.id);
                    });
                    CBTService.getJobTestResults(candidates, test[0]).then(function(all_text_result) {
                        SelectedCandidate.find({job_id: job_id}).populate('candidate').exec(function (err, selected_candidates) {
                            if (selected_candidates.length > 0) {
                                var candidates = [];    // redeclared, haha!
                                selected_candidates.forEach(function (candidate) {
                                    candidates.push(candidate.candidate.id);
                                });
                                CBTService.getJobTestResults(candidates, test[0]).then(function (selected_candidates_test_result) {
                                    return res.view(folder + '/applicants-view.swig', {
                                        applicants: applications,
                                        results: all_text_result,
                                        selected_candidates: selected_candidates_test_result,
                                        job_id: job_id,
                                        folder: folder
                                    });
                                }).catch(function (err) {
                                    console.log(err);
                                });
                            } else {
                                return res.view(folder + '/applicants-view.swig', {
                                    applicants: applications,
                                    results: all_text_result,
                                    job_id: job_id,
                                    folder: folder
                                });
                            }
                        });
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            });
        });
    },

    getApplicantsResults: function(req, res) {
        var job_id =  req.param('job_id');
        Job.find({ id: job_id }).populate('applications').exec(function(err, job) {
            JobTest.find({ job_level: job[0].job_level, job_category_id: job[0].category }).populate('test').exec(function(err, test) {
                var candidates = [];
                job[0].applications.forEach(function(candidate) {
                    candidates.push(candidate.applicant);
                });
                CBTService.getJobTestResults(candidates, test[0]).then(function(resp) {
                    return res.view('company/testResults', { results: resp });
                }).catch(function(err) {
                    console.log(err);
                });
            });
        });
    },

    deleteJob: function (req, res) {
        var id = req.param('id');
        if (!req.session.coy_id) return;
        Job.find({ id: id }).populate('applications').exec(function(err, job) {
            if (job[0].applications.length < 1) {
                // soft delete
                Job.update({ id: id }, { status: 'Deleted' }).exec(function() {});
                return res.json(200, { status: 'success', msg: "You can't delete this job at this time" });
            } else {
                Job.destroy({ id: id, company: req.session.coy_id }).exec(function(err) {
                    if (err) return;
                    return res.json(200, { status: 'success' });
                });
            }
        });
    }
};
