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
    }
}