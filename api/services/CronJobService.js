const schedule = require('node-schedule');

module.exports.registerCronJobs = function() {
    // send filtering statistics every monday by 7:58am
    schedule.scheduleJob({ hour: 6, minute: 58, dayOfWeek: 1 }, function() {
        scheduleGuardianJobsFilteringUpdates();
    });
}

function scheduleGuardianJobsFilteringUpdates() {
    // check for all active standard jobs
    Job.find({ source: 'GJ', subscription: 'standard', closing_date: {'>=': new Date()} }, { select: ['id'] }).exec(function(err, jobids) {
        if (err) {
            return;
        }
        const request = require("request");
        jobids.forEach(id => {
            JobApiService.returnFilteredStat(id.id, 'standard').then(stat => {
                let options = {
                    method: "POST",
                    url: "http://jobs.guardian.ng/v1/api/job-statistics",
                    form: JSON.stringify({
                        "authentication": {
                            "email": "webmaster@getqualified.work",
                            "password": "G3tQu@lified"
                        },
                        "data": stat,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                request(options, function(err, res, body) {
                    if (err) {
                        return;
                    }
                    try {
                        //var data = JSON.parse(body);
                        return; //console.log(data);
                    } catch(err) {
                        console.log(err.message);
                    }
                });
            }).catch(err => {
                // umuazi!
            });
        });
        sendMail.notifyMe(jobids.length);
    });
}
