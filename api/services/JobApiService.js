module.exports = {
    saveJob: function(job, coy_id) {
        return new Promise(function(resolve, reject) {
            //if (job.job.descriptions) {
            //    job.job_descriptions.forEach(function (desc) {
            //        if (desc) description += '<li>' + desc + '</li>';
            //    });
            //    description += "</ul>";
            //}

            // validate filter category

            var requirements = '<ul>';
            if (job.requirements) {
                job.requirements.forEach(function (req) {
                    if (req) requirements += '<li>' + req + '</li>';
                });
                requirements += "</ul>";
            }
            var qualifications = '<ul>';
            if (job.qualifications) {
                job.qualifications.forEach(function (qual) {
                    if (qual) qualifications += '<li>' + qual + '</li>';
                });
                qualifications += "</ul>";
            }
            var data = {
                company: coy_id,
                company_name: job.company.company_name,
                job_title: job.job_title.replace(/\/|,/g, ''),
                job_description: job.job_description,
                job_requirements: requirements,
                qualifications: qualifications,
                years_of_experience: job.years_of_experience,
                job_level: job.job_level,
                location: job.job_location,
                salary: job.salary || '',
                salary_currency: 'NGN',
                min_salary_budget: job.min_salary || 0.0,
                max_salary_budget: job.max_salary || 0.0,
                job_id: job.jobID,
                source: 'GJ',
                require_video: false,
                subscription: job.filter_category || 'basic',
                closing_date: job.closing_date ? new Date(job.closing_date).toISOString() : new Date().toISOString()
            };
            Job.findOrCreate({ job_id: job.jobID, company: coy_id }, data).exec(function(err, new_job) {
                if (err) return reject(err);
                
                return resolve(new_job.id);
                //return resolve('https://getqualified.work/job/' + new_job.id + '/' + new_job.job_title.split(' ').join('-'));
            });
        });
    },


    moveJobToCompany: function(job_id, coy_id) {
        Job.update({ id: job_id }, { company: coy_id, source: 'gq' }).exec(function(err) { console.log(err)});
        return;
    },

    returnJobUrl: function(job_id) {
        return new Promise(function(resolve, reject) {
            Job.findOne({ id: job_id }).exec(function(err, job) {
                if (job) {
                    return resolve('https://getqualified.work/job/' + job.id + '/' + job.job_title.split(' ').join('-'));
                } else {
                    return reject('Job not found');
                }
            });
        });
    },

    authenticate: function(email) {
        //const Passwords = require('machinepack-passwords');
        return new Promise(function(resolve, reject) {
            User.findOne({ email: email }).exec(function(err, foundUser) {
                if (err) return reject({ status: 'error', message: err });
                if (!foundUser) return reject('User not found');

                if (foundUser.status == 'Inactive') {
                    return reject({ status: 'error', message: 'This account is still pending confirmation' });
                }
                if (foundUser.user_type == 'company-admin') {
                    Company.findOne({ contact_email: email }).exec(function(err, coy) {
                        return resolve({ status: true, company: coy });
                    });
                }
                // Passwords.checkPassword({
                //     passwordAttempt: password,
                //     encryptedPassword: foundUser.password
                // }).exec({
                //     error: function (err) {
                //         return reject({ status: 'error', message: err });
                //     },
                //     incorrect: function () {
                //         return reject({ status: 'error', message : 'Incorrect authentication details' });
                //     },
                //     success: function () {
                //         if (foundUser.deleted) {
                //             return reject({ status: 'error', message: "'Your account has been deleted. Please contact support@getqualified.work.'" });
                //         }

                //         if (foundUser.banned) {
                //             return reject({ status: 'error', message: "'Your account has been banned, most likely for violation of the Terms of Service. Please contact us.'"});
                //         }
                //         if (foundUser.user_type == 'company-admin') {
                //             Company.findOne({ contact_email: email }).exec(function(err, coy) {
                //                 return resolve({ status: true, company: coy });
                //             });
                //         } else {
                //             return reject({ status: 'error', message: 'Wrong user' });
                //         }
                //     }
                // });
            });
        });
    },

    // Note: this is GQ Aptitude test
    // all applicants are passed into this function but only assessed come out  
    getJobTestStat: function(applicants, mode = 'basic') {
        return new Promise(function(resolve, reject) {
            GQAptitudeTestResult.find({ user: applicants }).sort('score desc').exec(function(err, scores) { 
                if (err) {
                    return reject(err);
                }
                let scores_length = scores.length;
                let first5 = [], bottom5 = [], f5_count = 0, l5_count = 0, l5_start = scores_length - 5, sum_score = 0;
                async.eachSeries(scores, function(score, cb) {
                    sum_score += score.score;
                    l5_count++;
                    if (f5_count <= 5) {
                        GQTestResult.find({ test: [1,2,3], candidate: score.user }).populate('candidate').sort('test').exec(function(err, tests) {
                            if (err) {
                                return reject(err);
                            }
                            if (tests.length < 3) return cb();
                            let total_num_questions = parseInt(tests[0].no_of_questions) + parseInt(tests[1].no_of_questions) + parseInt(tests[2].no_of_questions);
                            first5.push({
                                candidate_email: mode == 'basic' ? null : tests[0].candidate.email,
                                logical_reasoning: ((tests[0].score / tests[0].no_of_questions) * 100).toFixed(1),
                                verbal_reasoning: ((tests[1].score / tests[1].no_of_questions) * 100).toFixed(1),
                                numerical_reasoning: ((tests[2].score / tests[2].no_of_questions) * 100).toFixed(1),
                                overall: ((score.score / total_num_questions) * 100).toFixed(1)
                            });
                            f5_count++;
                            return cb();
                        });
                    } else if (l5_count >= l5_start) {
                        GQTestResult.find({ test: [1,2,3], candidate: score.user }).sort('test').exec(function(err, tests) {
                            if (err) {
                                return reject(err);
                            }
                            let total_num_questions = parseInt(tests[0].no_of_questions) + parseInt(tests[1].no_of_questions) + parseInt(tests[2].no_of_questions);
                            bottom5.push({
                                candidate_email: mode == 'basic' ? null : tests[0].candidate.email,
                                logical_reasoning: tests[0] ? ((tests[0].score / tests[0].no_of_questions) * 100).toFixed(1) : 0,
                                verbal_reasoning: tests[1] ? ((tests[1].score / tests[1].no_of_questions) * 100).toFixed(1) : 0,
                                numerical_reasoning: tests[2] ? ((tests[2].score / tests[2].no_of_questions) * 100).toFixed(1) : 0,
                                overall: ((score.score / total_num_questions) * 100).toFixed(1)
                            });
                            return cb();
                        });
                    } else {
                        return cb();
                    }
                }, function(err) {
                    if (err) {
                        return reject(err);
                    }
                    let test_stat = {
                        top_five_scores: first5,
                        least_five_scores: bottom5,
                        assessed_candidates: scores_length,
                        average_score: scores_length > 0 ? (sum_score / scores_length).toFixed(1) : 0
                    };
                    return resolve(test_stat);
                });
            });
        });
    },

    getGenderStat: function(applicants) {
        return new Promise(function(resolve, reject) {
            if (applicants.length < 1) return resolve([]);

            const sql = `SELECT gender, COUNT(*) AS num FROM resume WHERE user IN (${applicants.toString()}) GROUP BY gender ORDER BY gender`;
            Resume.query(sql, function(err, genders) {
                if (err) {
                    return reject(err);
                }
                return resolve(genders);
            });
        });
    },

    getGeographicalStat: function(applicants) {
        return new Promise(function(resolve, reject) {
            if (applicants.length < 1) return resolve([]);

            const sql = `SELECT r_state, COUNT(*) AS num FROM resume WHERE user IN (${applicants.toString()}) AND r_state <> '' GROUP BY r_state ORDER by num DESC`;
            Resume.query(sql, function(err, states) {
                if (err) {
                    return reject(err);
                }
                return resolve(states);
            });
        });
    },


    returnFilteredStat(job_id, mode = 'basic') {
        return new Promise(function(resolve, reject) {
            Job.findOne({ id: job_id }).populate('applications').exec(function(err, job) {
                if (err) {
                    return reject(err);
                }
                if (!job) return reject("The supplied job ID doesn't match any existing job");
                
                let applicants = job.applications.map(app => app.applicant);
            
                return Promise.all([
                    module.exports.getJobTestStat(applicants, mode),
                    module.exports.getGenderStat(applicants),
                    module.exports.getGeographicalStat(applicants)
                ]).then(results => {
                    var test_stat = results[0];
                    var gender_stat = results[1];
                    let male_count, female_count;
                    if (gender_stat.length === 1) {
                        male_count = gender_stat[0].gender === 'Male' ? gender_stat[0].num : 0;
                        female_count = gender_stat[0].gender === 'Female' ? gender_stat[0].num : 0;
                    } else if (gender_stat.length === 2) {
                        female_count = gender_stat[0].num;
                        male_count = gender_stat[1].num;
                    }
                    var states = [];
                    results[2].forEach(function(state) {
                        states.push({
                            state: state.r_state,
                            num: state.num
                        });
                    });
                    
                    var data = {
                        jobID: job_id,
                        applications: applicants.length,
                        assessed_candidates: test_stat.assessed_candidates,
                        average_score: test_stat.average_score,
                        number_of_males: male_count,
                        number_of_females: female_count,
                        geographical_stat: states,
                        top_five_scores: test_stat.top_five_scores,
                        least_five_scores: test_stat.least_five_scores
                    };
                    return resolve(data);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                });
            });
        });
    },

    changeSubscription: function(job_id, filter) {
        return new Promise(function(resolve, reject) {
            Job.update({ id: job_id }, { subscription: filter }).exec(function(err, job) {
                if (err) {
                    return reject(eer);
                }
                if (!job || job.length < 1)  return reject("The supplied job ID doesn't match any existing job");
                
                // return filter stat based on the new filter
                module.exports.returnFilteredStat(job_id, filter).then(stat => {
                    return resolve(stat);
                }).catch(err => {
                    return reject(err);
                });
            });
        });
    },

    isValidJobFilter: function(filter) {
        const valid_filters = ['basic', 'standard', 'premium'];
        if (valid_filters.indexOf(filter) === -1) return false;
        return true;
    }
}
