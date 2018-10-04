const schedule = require('node-schedule');

module.exports.registerCronJobs = function() {
    scheduleGuardianJobsFilteringUpdates();
}

function scheduleGuardianJobsFilteringUpdates() {
    // check for all active standard jobs
    Job.find({ source: 'GJ', subscription: 'standard', closing_date: {'>=': new Date()} }, { select: ['id'] }).exec(function(err, jobids) {
        if (err) {
            return;
        }
        console.log('Number of jobs: ' + jobids.length);
        const request = require("request");
        jobids.forEach(id => {
            JobApiService.returnFilteredStat(id, 'standard').then(stat => {
                let options = {
                    method: "POST",
                    url: "http://jobs.guardian.ng/v1/api/job-statistics",
                    form: {
                        "uathentication": {
                            "email": "webmaster@getqualified.work",
                            "password": "G3tQu@lified"
                        },
                        "data": stat,
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                request(options, function(err, res, body) {
                    if (err) {
                        return;
                    }
                    try {
                        var data = JSON.parse(body);
                        return console.log(data.data);
                    } catch(err) {
                        console.log(err.message);
                    }
                });
            }).catch(err => {
                // umuazi!
            });
        });
    });
}
