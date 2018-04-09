module.exports = {
	apply: function(job_id, applicant_id) {
        return new Promise(function(resolve, reject) {
            // let's make sure no one applies more than once
            Application.find({ job: job_id, applicant: applicant_id }).exec(function (err, result) {
                if (err) return reject(err);
                if (result.length > 0) return resolve(true);

                // let's proceed
                Job.findOne({id: job_id}).exec(function (err, job) {
                    if (err) return reject(err);
                    var data = {
                        job: job_id,
                        company: job.company,
                        applicant: applicant_id
                    };
                    Application.create(data).exec(function (err) {
                        if (err) return reject(err);
                        return resolve(true);
                    });
                });
            });
        });
	},


    // this function will delete ALL the jobs the applicant applied to
    removeApplicantJobs: function(applicant_id) {
        Application.destroy({ applicant: applicant_id }).exec(function(err, applications) {
            // remove competency tests if any
            applications.forEach(function(app) {
                Job.find({id: app.job}).exec(function (err, job) {
                    JobTest.find({
                        job_level: job[0].job_level,
                        job_category_id: job[0].category
                    }).exec(function (err, test) {
                        if (test[0].test_source == 'gq') {
                            GQTestResult({candidate: applicant_id}).exec(function (err, deleted_test) {
                                ProctorService.deleteProctorSession(deleted_test.proctor);
                            });
                        } else {
                            TestResult({applicant: applicant_id}).exec(function () {});
                        }
                    });
                });
            });
        });
    },


    fetchCompanyJobs: function(coy_id) {
        return new Promise(function (resolve, reject) {
            Job.find({
                company: coy_id,
                status: 'Active'
            }).populate('category').populate('applications').populate('poster').exec(function (err, jobs) {
                if (err) return;
                var _jobs = [], today = new Date();
                async.eachSeries(jobs, function (job, cb) {
                    JobTest.count({
                        job_level: job.job_level,
                        job_category_id: job.category
                    }).exec(function (err, assessed) {
                        job.assessed = assessed;

                        if (Date.parse(job.closing_date) >= Date.parse(today)) {
                            SelectedCandidate.count({job_id: job.id}).populate('candidate').exec(function (err, selected_candidates) {
                                job.shortlisted = selected_candidates;
                                _jobs.push(job);
                                cb();
                            });
                        } else {
                            job.shortlisted = '-';
                            _jobs.push(job);
                            cb();
                        }
                    });
                }, function (err) {
                    return resolve(_jobs);
                });
            });
        });
    },


    fetchShortlistedCandidates: function(job_id, coy_id) {
        return new Promise(function(resolve, reject) {
            // Companies can only view shortlist for their jobs
            Job.find({ id: job_id, company: coy_id }).exec(function(err, job) {
                if (job.length > 0) {
                    SelectedCandidate.find({job_id: job_id}).populate('candidate').exec(function (err, selected_candidates) {
                        return resolve(selected_candidates);
                    });
                }
            });
        });
    }
}