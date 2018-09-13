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
                // new jobs by default will require GQtest and video profile
                var job = { require_video: true, require_test: true, require_competency_test: false };
                return res.view(folder + '/addjob', { jobcategories: categories, countries: resp.countries, coy_id: coy_id, job: job });
            }).catch(function(err) {
                return res.serverError();
            });
        });
    },

    editJob: function (req, res) {
        return Promise.all([
            Job.findOne({ id: req.param('job_id') }),
            CountryStateService.getCountries(),
            JobCategory.find()
        ]).then(results => {
            let job = results[0];
            let resp = results[1];
            let categories = results[2];

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
        }).catch(err => {
            return res.serverError(err);
        });
    },

    saveJob: function (req, res) {
        var q = req.param;
        var data;
        try {
            var publish_date, publish = true; //q('publish_now') == 1 ? true : false;
            if (publish) publish_date = new Date().toISOString();

            data = {
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
                require_video: q('require_video') ? true : false,
                require_test: q('require_gqtest') ? true : false,
                require_competency_test: q('require_competency_test') ? true : false,
                closing_date: new Date(Date.parse(q('closing_date'))).toISOString(),
            };
        } catch(err) {
            console.log(err);
            return res.serverError(err);
        }

        if (q('job_id') && _.isNumber(parseInt(q('job_id')))) {
            return Job.update({ id: q('job_id') }, data)
                .then(job => {
                    if (req.session.admin) {
                        return job[0].source == 'gq' ? res.redirect('/admin/coy-jobs/' + job[0].company + '/open') : res.redirect('/viewScrapedJobs');
                    } else {
                        return res.redirect('/company/dashboard');
                    }
                }).catch(err => {
                    console.log(err);
                    return res.serverError(err);
                });
        } else {
            data.poster = req.session.admin === true ? 0 : req.session.userId,
            data.company = req.session.coy_id ? req.session.coy_id : q('coy_id');
            return Job.create(data)
                .then(job => {
                    return User.find({ company: data.company }).populate('company')
                        .then(user => {
                            sendMail.companyNewJobAlert(user[0].email, user[0].fullname, q('title'));
                            if (req.session.coy_id) {
                                sendMail.GQnewJobAlert(user[0].company.company_name);
                            }
                            if (req.session.admin === true) {
                                return res.redirect('/admin/coy-jobs/' + job.company + '/open');
                            } else {
                                return res.redirect('/company/dashboard');
                            }
                        })
                        .catch(err => {
                            return res.serverError(err);
                        });
                })
                .catch(err => {
                    return res.serverError(err);
                });
        }
    },

    //getJobTests: function (req, res) {
    //    Job.findOne({ id: req.param('job_id') }).populate('job_tests').exec(function (err, jobtests) {
    //        if (err) return res.serverError(err);
    //        return res.json(200, { status: 'success', jobtests: jobtests });
    //    });
    //},

    // readApplicationCSV: function(req, res) {
    //     var job_id = req.param('job_id');
    //     var filename, csvpath = 'assets/csv-files';
    //     req.file('csv').upload({
    //         dirname: require('path').resolve(sails.config.appPath, csvpath),
    //         saveAs: function(file, cb) {
    //             var ext = file.filename.split('.').pop();
    //             filename = 'job_' + job_id + '.' + ext;
    //             return cb(null, filename);
    //         }
    //     },
    //     function(err) {
    //         if (err) {
    //             return res.badRequest(err);
    //         }

    //         try {
    //             var parser = require('csv-parse');
    //             const fs = require('fs');
    //             fs.readFile(csvpath + '/' + filename, 'utf8', function(err, csv_data) {
    //                 parser(csv_data, {relax_column_count: true, rtrim: true, ltrim: true, skip_lines_with_empty_values: true}, function (err, data) {
    //                     if (err) {
    //                         var msg = new Buffer("ERROR: Invalid CSV file. Please download and use the sample CSV file on this page").toString('base64');
    //                     }
    //                     var n = 0;
    //                     data.forEach(function(entry) {
    //                         if (entry[0] == 'Fullname') {
    //                             return;
    //                         }
    //                         if (entry[1].length > 4) {
    //                             sendMail.customSendAppliedJobNotice('Candidate', entry[1]);
    //                             n++;
    //                         }
    //                     });
    //                     console.log('Sent: ' + n + ' emails');
    //                 });
    //             });
    //             return res.redirect(req.path);
    //         } catch(err) {
    //             console.log(err);
    //         }       
    //     });
    // },

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
        function(err) {
            if (err) {
                return res.badRequest(err);
            }
            try {
                var parser = require('csv-parse');
                const fs = require('fs');
                fs.readFile(csvpath + '/' + filename, 'utf8', function(err, csv_data) {
                    parser(csv_data, {relax_column_count: true, rtrim: true, ltrim: true, skip_lines_with_empty_values: true}, function (err, _data) {
                        if (err) {
                            var msg = new Buffer("ERROR: Invalid CSV file. Please download and use the sample CSV file on this page").toString('base64');
                        }
                        Job.findOne({id: job_id}).populate('company').exec(function (j_err, job) {
                            if (j_err) {
                                return res.serverError(j_err);
                            }
                            var company_id = job.company.id;
                            async.eachSeries(_data, function(entry, cb) {
                                var fullname, email;
                                if (entry.length > 1) {
                                    fullname = entry[0];
                                    email = entry[1];
                                } else {
                                    email = entry[0];
                                    fullname = '';
                                }
                                if (entry[0] == 'Fullname' || email === undefined) {
                                    return cb();
                                }
                                var _email = email.replace(/\s+/g, '').trim();
                                var data = {
                                    fullname: fullname,
                                    email: _email.replace(/\.\s*$/, ''),
                                    user_type: 'Applicant'
                                };
                                User.findOrCreate({ email: data.email }, data).exec(function (err, user) {
                                    if (err) {
                                        return cb();
                                    }
                                    if (user.user_type == 'company-admin' || user.user_type == 'company') {
                                        // bad market
                                        return cb();
                                    }
                                    if (user.user_type != 'Applicant') {
                                        // bad market
                                        return cb();
                                    }
                                    JobService.apply(job_id, user.id).then(function (resp) {
                                    }).catch(function (err) {
                                        console.log(err);
                                        return cb();
                                    });
                                    // cause a delay so amazon doesn't reject the emails
                                    var waitTill = new Date(new Date().getTime() + 1 * 100);
                                    while(waitTill > new Date()){}
                                    
                                    var msg_type; // for determining the content of the invite email to send
                                    if (user.status == 'Inactive') {
                                        msg_type = 'new-user';
                                        sendMail.sendAppliedJobNotice(job, user, msg_type);
                                        return cb();
                                    } else {
                                        Resume.find({user: user.id}).exec(function (err, resume) {
                                            if (err) {
                                                return cb();
                                            }
                                            if (resume.length > 0) {
                                                if (resume[0].status === 'Complete') {
                                                    msg_type = 'fyi'; // inform them
                                                } else {
                                                    msg_type = 'incomplete-profile';
                                                }
                                                sendMail.sendAppliedJobNotice(job, user, msg_type);
                                            } else {
                                                console.log('You are not a candidate');
                                            }
                                            return cb();
                                        });
                                    }
                                });
                            },
                            function(err) {
                                if (err) console.log(err);
                                if (req.session.user_type == 'admin') {
                                    return res.redirect('/admin/coy-jobs/' + company_id + '/open');
                                } else {
                                    return res.redirect('/company/dashboard/' + msg);
                                }
                            });
                        });
                    });
                });
            } catch (e) {
                console.log(e);
                return res.serverError(e);
            }
        });
    },

    // for candidates
    listJobs: function(req, res) {
        var today = new Date(); //.toISOString();
        Job.find({ closing_date: { '>=': today }, status: 'Active', source: 'gq' }).populate('category').populate('company').sort({ createdAt: 'desc' }).exec(function(err, jobs) {
        //Job.find({}).populate('category').populate('company').exec(function(err, jobs) {
            if (err) return;
            JobCategory.find().populate('jobs').sort({ category: 'asc' }).exec(function(err, job_categories) {
                if (err) {
                    return res.serverError(err);
                }
                var jobCategories = [];
                if (job_categories.length > 0) {
                    job_categories.forEach(function(jobcat) {
                        if (jobcat.jobs.length > 0) {
                            var active_jobs = 0;
                            jobcat.jobs.forEach(function(job) {
                                if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                                    active_jobs++;
                                }
                            });
                            jobCategories.push({
                                category: jobcat.category,
                                jobs: active_jobs,
                                id: jobcat.id
                            });
                        }
                    });
                }
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
                if (err) {
                    return res.serverError(err);
                }
                var jobCategories = [];
                if (job_categories.length > 0) {
                    job_categories.forEach(function(jobcat) {
                        if (jobcat.jobs.length > 0) {
                            var active_jobs = 0;
                            jobcat.jobs.forEach(function(job) {
                                if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                                    active_jobs++;
                                }
                            });
                            jobCategories.push({
                                category: jobcat.category,
                                jobs: active_jobs,
                                id: jobcat.id
                            });
                        }
                    });
                }
                return res.view('jobs', { jobs: jobs, job_categories: jobCategories });
            });
        });
    },

    showJob: function(req, res) {
        var job_id = req.param('id');
        var today = new Date().toISOString();

        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;
        const userEmail = req.session.userEmail;

        return Promise.all([
             Job.findOne({ id: job_id }).populate('company'),
             JobCategory.find().populate('jobs').sort({ category: 'asc' })
        ]).then(results => {
            let job = results[0];
            let job_categories = results[1];

            if (!job) {
                return res.view('job', { status: 'false' });
            }
            let views = (!job.view_count) ? 1 : parseInt(job.view_count) + 1;
            Job.update({ id: job_id }, { view_count: views }).exec(function() {});

            let jobCategories = [];
            job_categories.forEach(function(jobcat) {
                if (jobcat.jobs.length > 0) {
                    var active_jobs = 0;
                    jobcat.jobs.forEach(function(job) {
                        if (Date.parse(job.closing_date) >= Date.parse(today)) { // count active jobs
                            active_jobs++;
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
        }).catch(err => {
            return res.serverError(err);
        });
    },

    apply: function(req, res) {
        var job_id = req.param('id');
        if (req.session.userId && (req.session.user_type == 'Applicant' || req.session.user_type == 'admin')) {
            // check resume completion status
            Resume.find({ user: req.session.userId }).exec(function(err, resume) {
                if (resume[0].status === undefined || resume[0].status == 'Incomplete') {
                    JobService.checkEligibility(job_id, req.session.userId).then(function(status) {
                        if (status.status === false) {
                            return res.json(200, { status: 'error', msg: 'IncompleteResume' });
                        } else {
                            JobService.apply(job_id, req.session.userId).then(function(resp) {
                                if (resp) {
                                    return res.json(200, { status: 'success' });
                                } else {
                                    // your village people don't want you to be great
                                }
                            });
                        }
                    }).catch(function(err) {
                        return res.serverError(err);
                    });
                } else {
                    JobService.apply(job_id, req.session.userId).then(function(resp) {
                        if (resp) {
                            return res.json(200, { status: 'success' });
                        } else {
                            // your village people don't want you to be great
                        }
                    });
                }
            });
        } else {
            req.session.job_id = job_id;
            return res.json(200, { status: 'login' });
        }
    },

    fetchShortlisted: function(req, res) {
        return JobService.fetchShortlistedCandidates(req.param('job_id'), req.session.coy_id).then(function(shortlistedData) {
            return res.view('company/shortlist', {
                selected_candidates: shortlistedData.results,
                job_id: req.param('job_id'),
                job_paid: shortlistedData.paid,
                jobTitle: shortlistedData.jobTitle
            });
        })
        .catch(function(error) {
            return res.serverError(error);
        });
    },

    fetchShortlistedForAdmin: function(req, res) {
        return Job.findOne({id: req.param('job_id')})
            .then(job => {
                return JobService.fetchShortlistedCandidates(job.id, job.company).then(function(shortlistedData) {
                    return res.view('admin/shortlist', {
                        selected_candidates: shortlistedData.results,
                        job_id: req.param('job_id'),
                        companyName: shortlistedData.companyName,
                        jobTitle: shortlistedData.jobTitle,
                        disableEdits: true
                    });
                });
            })
            .catch(function(error) {
                return res.serverError(error);
            });
    },

	viewApplicantsforAdmin: function(req, res) {
		const job_id =  req.param('job_id');
		if (!job_id) {
			return res.badRequest();
		}
		Job.findOne({ id: job_id }).populate('company').then(job => {
            JobTest.findOne({ job_level: job.job_level, job_category_id: job.category }).populate('test').then(jobTest => {
                const sql = `SELECT score, fullname, u.id AS uid, gq.id AS test_id, gq.createdAt, u.email FROM application ap 
                        JOIN gqaptitudetestresult gq ON ap.applicant = gq.user 
                        JOIN user u ON u.id = gq.user WHERE job = ? AND gq.status = 'Accepted' ORDER BY score DESC`;
            
                GQAptitudeTestResult.query(sql, [ job_id ], function(err, candidates) {            
                    if (err) {
                        return res.serverError(err);
                    }
                    SelectedCandidate.find({ job_id: job_id }).exec(function(err, shortlist) {
                        if (err) {
                            return res.serverError(err);
                        }
                        CBTService.getJobTestResults(candidates, jobTest).then(function(allCandidates) {
                            let companyName;
                            if ((job.source === null || job.source === 'gq') && job.company) {
                                companyName = job.company.company_name;
                            } else if (job.source == 'Jobberman' || job.source == 'Ngcareers') {
                                companyName = job.company_name;
                            } else {
                                companyName = 'Company';
                            }
                            
                            let shortlist_ids = shortlist.map(sl => sl.candidate);
                            let shortlisted = allCandidates.filter(c => shortlist_ids.indexOf(c.applicant.id) !== -1);
                            let unshortlisted = allCandidates.filter(c => shortlist_ids.indexOf(c.applicant.id) === -1);

                            return res.view('admin/applicants-view.swig', {
                                jobTitle: job.job_title,
                                companyName: companyName,
                                qualified_candidates: unshortlisted,
                                selected_candidates: shortlisted,
                                job_id: job_id
                            });
                        }).catch(err => {
                            return res.serverError(err);
                        });
                    });
				});
			}).catch(err => {
				return res.serverError(err);
            });
        }).catch(err => {
            return res.serverError(err);
        });
    },
    

    fetchJobApplicants: function(req, res) {
        const job_id =  req.param('job_id');
		if (!job_id) {
			return res.json(400, { status: 'error', message: 'Job ID required' });
        }
        let start = req.param('start');
        let rows = req.param('length');
        let draw = req.param('draw');
        let search = req.param('search');

        JobService.fetchJobApplicants(job_id, start, rows, search.value).then(applicants => {
            return res.json(200, { status: 'success', draw: draw, recordsTotal: applicants.num, recordsFiltered: applicants.num, data: applicants });
        }).catch(err => {
            return res.json(400, { status: 'error', message: err });
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
        if (req.session.coy_id || req.session.admin) {
            Job.find({ id: id }).populate('applications').exec(function(err, jobs) {
                async.eachSeries(jobs, function(job, cb) {
                    if (job.applications.length > 0) {
                        Application.update({ job: job.id }, { status: 'Cancelled' }).exec(function() {});
                    }
                    cb();
                }, function() {
                    if (req.param('source') && req.param('source') == 'scraped') {
                        Job.destroy({ id: id }).exec(function() {});
                    } else {
                        Job.update({id: id}, {status: 'Deleted'}).exec(function () {});
                    }
                    return res.json(200, {status: 'success'});
                });
            });
        }
    },


    viewScrapedJobs: function(req, res) {
        Job.find({ source: ['Jobberman', 'Ngcareers'], status: 'Active' }).sort('company_name asc').exec(function(err, jobs) {
            return res.view('admin/scrapedJobs', { jobs: jobs });
        });
    },


    fetchScrapedJobs: function(req, res) {
        var filter = {
            entry: req.param('entry'),
            experienced: req.param('experienced'),
            manager: req.param('manager'),
            executive: req.param('executive')
        };
        JobScraperService.fetchJobs().then(function(jobs) {
            JobScraperService.saveScrapedJobs(jobs, filter);
            return res.redirect('/viewScrapedJobs');
        });
    },


    moveToJobBoard: function(req, res) {
        Job.update({ id: req.param('jobs') }, { company: '16', source: 'gq' }).exec(function(err, jobs) {
            var job_urls = [];
            jobs.forEach(function(job) {
                job_urls.push({
                    id: job.job_url,
                    link: 'https://getqualified.work/job/' + job.id + '/' + job.job_title.split(' ').join('-')
                });
            });
            JobScraperService.returnScrapedJobsUrl(job_urls);
        });
        return res.ok();
    },


    moveToCompany: function(req, res) {
        JobScraperService.moveJobToCompany(req.param('job_id'), req.param('coy_id'));
        return res.redirect('/viewScrapedJobs');
    },

    closeJob: function(req, res) {
        var today = new Date();
        var backdate = today.setDate(today.getDate() - 2);
        Job.update({ id: req.param('job_id') }, { closing_date: new Date(backdate).toISOString() }).exec(function(err, job) {
            return res.redirect('/admin/coy-jobs/' + job[0].company + '/open');
        });
    },

    enableContactView: function(req, res) {
        Job.update({ id: req.param('job_id') }, { paid: 'true' }).exec(function(err) {
            if (err) {
                return res.json(400, { status: 'error', message: err });
            }
            return res.json(200, { status: 'success' });
        });
    },

    archiveJob: function(req, res) {
        Job.update({ id: req.param('job_id') }, { status: 'Inactive'}).exec(function(err, job) {
            return res.redirect('/admin/coy-jobs/' + job[0].company + '/closed');
        });
    },


    downloadCSVSample: function(req, res) {
        res.setHeader('Content-disposition', 'attachment; filename=sampleCSV.csv');
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();
        fileAdapter.read(sails.config.appPath + '/assets/csv-files/sampleCSV.csv').on('error', function (err) {
            return res.serverError(err);
        }).pipe(res);
    }


    //    if (!req.session.coy_id) {
    //        return res.forbidden();;
    //    }
    //
    //    const id = req.param('id');
    //
    //    return Job.findOne({id: id}).populate('applications')
    //        .then(job => {
    //            if (!job.applications || job.applications.length > 0) {
    //                return Job.update({id: id}, { status: 'Deleted' })
    //                    .then(() => {
    //                        return res.json(200, { status: 'success', msg: "You can't delete this job at this time"});
    //                    })
    //            } else {
    //                return Job.destroy({ id: id})
    //                    .then(() => {
    //                        return res.json(200, { status: 'success' });
    //                    })
    //            }
    //        })
    //        .catch(err => {
    //            return res.serverError();
    //        })
    //}
};
