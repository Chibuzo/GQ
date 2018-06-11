module.exports = {
    saveJobs: function(job, coy_id) {
        return new Promise(function(resolve, reject) {
            //async.each(jobs, function(job, cb) {

                //if (job.job.descriptions) {
                //    job.job_descriptions.forEach(function (desc) {
                //        if (desc) description += '<li>' + desc + '</li>';
                //    });
                //    description += "</ul>";
                //}
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
                    company_name: job.company_name,
                    job_title: job.job_title.replace(/\/|,/g, ''),
                    job_description: job.job_description,
                    job_requirements: requirements,
                    qualifications: qualifications,
                    job_level: job.job_level,
                    location: job.job_location,
                    salary: job.salary ? job.salary : '',
                    job_id: job.jobID,
                    source: 'gq',
                    //closing_date: new Date(job.closing_date * 1000).toISOString()
                };
                Job.findOrCreate({ job_id: job.jobID }, data).exec(function(err, new_job) {
                    if (err) return reject(err);
                    return resolve('https://getqualified.work/job/' + new_job.id + '/' + new_job.job_title.split(' ').join('-'));
                });

        });
    },


    moveJobToCompany: function(job_id, coy_id) {
        Job.update({ id: job_id }, { company: coy_id, source: 'gq' }).exec(function(err) { console.log(err)});
        return;
    },

    returnJobUrl: function(job_id) {
        return new Promise(function(resolve, reject) {
            Job.findOne(job_id).exec(function(err, job) {
                if (job) {
                    return resolve('https://getqualified.work/job/' + job.id + '/' + job.job_title.split(' ').join('-'));
                } else {
                    return reject('Job not found');
                }
            });
        });
    },

    authenticate: function(email, password) {
        const Passwords = require('machinepack-passwords');
        return new Promise(function(resolve, reject) {
            User.findOne({ email: email }).exec(function(err, foundUser) {
                if (err) return reject({ status: 'error', message: err });
                if (!foundUser) return reject({ status: 'error', message : 'User not found' });

                if (foundUser.status == 'Inactive') {
                    return reject({ status: 'error', message: 'This account is still pending confirmation' });
                }
                Passwords.checkPassword({
                    passwordAttempt: password,
                    encryptedPassword: foundUser.password
                }).exec({
                    error: function (err) {
                        return reject({ status: 'error', message: err });
                    },
                    incorrect: function () {
                        return reject({ status: 'error', message : 'Incorrect authentication details' });
                    },
                    success: function () {
                        if (foundUser.deleted) {
                            return reject({ status: 'error', message: "'Your account has been deleted. Please contact support@getqualified.work.'" });
                        }

                        if (foundUser.banned) {
                            return reject({ status: 'error', message: "'Your account has been banned, most likely for violation of the Terms of Service. Please contact us.'"});
                        }
                        if (foundUser.user_type == 'company-admin') {
                            Company.findOne({ contact_email: email }).exec(function(err, coy) {
                                return resolve({ status: true, company: coy });
                            });
                        } else {
                            return reject({ status: 'error', message: 'Wrong user' });
                        }
                    }
                });
            });
        });
    }
}
