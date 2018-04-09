module.exports = {
    getApplicantStatistics: function() {
        return new Promise(function(resolve, reject) {
            User.count({user_type: 'Applicant'}).exec(function (err, applicant) {
                User.count({status: 'Inactive'}).exec(function (err, inactive) {
                    Resume.count().exec(function (err, active) {
                        Resume.count({status: 'Incomplete'}).exec(function (err, incomplete) {
                            return resolve({
                                applicants: applicant,
                                inactive: inactive,
                                incomplete: incomplete
                            });
                        });
                    });
                });
            });
        });
    },


    fetchAll: function() {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant'}).exec(function (err, applicants) {
                return resolve(applicants);
            });
        });
    },


    fetchInactive: function() {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant', status: 'Inactive'}).exec(function (err, inactive) {
                return resolve(inactive);
            });
        });
    },


    fetchIncomplete: function() {
        return new Promise(function(resolve) {
            Resume.find({ status: 'Incomplete' }).exec(function(err, incomplete) {
                return resolve(incomplete);
            });
        });
    },


    // ATTENTION: This is a destructive function, one must not use it
    deleteApplicant: function(users) {
        return new Promise(function(resolve, reject) {
            User.destroy({ id: [ users ]}).exec(function(err, deleted_users) {
                deleted_users.forEach(function(user) {
                    if (user.status == 'Active') {
                        Resume.destroy({user: users}).exec(function (err, resume) {
                            if (resume[0].status == 'Complete') {
                                JobService.removeApplicantJobs(user.id);
                            }
                        });
                        // delete profile photo
                        // delete video profile
                        // spit on his grave
                    }
                });
            });
        });
    }
}