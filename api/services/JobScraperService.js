module.exports = {
    fetchJobs: function() {
        var request = require('request');
        return new Promise(function(resolve, reject) {
            request({
                url: "http://ec2-18-222-14-140.us-east-2.compute.amazonaws.com:8080/api/jobs/fetch/all",
                method: "GET",
                json: true
            }, function (error, response, body) {
                return resolve(body.rows)
            });
        })
    },


    saveScrapedJobs: function(jobs) {
        var job_urls = [];
        async.each(jobs, function(job, cb) {
            // save only entry level and discard this rest. Don't question me!
            var interest = /Fresh|Graduate|Entry|Internship/;
            if (interest.test(job.job.level) || /1|2|one|two/.test(job.job.experience)) {
                var description, requirements;
                if (job.job.descriptions) {
                    job.job.descriptions.forEach(function (desc) {
                        if (desc) description += '<p>' + desc + '</p>';
                    });
                }
                if (job.job.requirements) {
                    job.job.requirements.forEach(function (req) {
                        if (req) requirements += '<p' + req + '</p>';
                    });
                }
                var data = {
                    company_name: job.company.name,
                    job_title: job.job.title,
                    job_description: description,
                    job_requirements: requirements,
                    qualifications: job.job.qualification,
                    job_level: 'Entry',
                    contract_type: job.job.type,
                    specialization: job.job.specialization,
                    experience: job.job.experience,
                    location: job.job.location,
                    salary: job.job.salary,
                    job_url: job.job.url,
                    job_id: job.id,
                    source: job.job.source,
                    closing_date: new Date().toISOString()
                };
                Job.create(data).exec(function(err, new_job) {
                    if (err) console.log(err);
                    job_urls.push({
                        id: job.id,
                        link: 'https://getqualified.work/job/' + new_job.id + '/' + job.job.title.split(' ').join('-')
                    });
                    cb();
                });
            } else {
                cb();
            }
        }, function(err) {
            // send url back to scraper
            module.exports.returnAddedScrapedJobsUrl(job_urls);
        });
    },


    returnAddedScrapedJobsUrl: function(postback_data) {
        //var request = require('request');
        //var body = { 'data': postback_data };
        //request({
        //    url: "http://ec2-18-222-14-140.us-east-2.compute.amazonaws.com:8080/api/jobs/ingest/parse",
        //    method: "POST",
        //    json: body
        //}, function (error, response, body) {
        //    console.log(body);
        //    //return resolve(body);
        //});
    }
}