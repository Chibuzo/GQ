module.exports = {
    fetchJobs: function() {
        var request = require('request');
        return new Promise(function(resolve, reject) {
            request({
                url: "http://ec2-18-222-14-140.us-east-2.compute.amazonaws.com:8080/api/jobs/fetch/all?ignore_linkbacks=1&deadline_ts=1",
                method: "GET",
                json: true
            }, function (error, response, body) {
                return resolve(body.rows)
            });
        })
    },


    saveScrapedJobs: function(jobs, filter) {
        var job_urls = [];
        async.each(jobs, function(job, cb) {
            // setup filter parameters
            var jobberman_level = '', ngcareer_level = '';
            var level = {
                jm_entry: 'Fresh|Graduate|Entry|Internship',
                ng_entry: '1|2|one|two',
                jm_experienced: 'Experienced|Non-Manager',
                ng_experienced: '[3-9]|15',
                jm_manager: 'Staff Supervisor|Head of Department',
                ng_manager: '1[5-9]|2[0-5]',
                jm_executive: 'Executive|Director|CEO|CFO|COO',
                ng_executive: '2[5-9]|3[0-5]'
            };
            if (filter.entry) {
                jobberman_level = level.jm_entry;
                ngcareer_level = level.ng_entry;
            }
            if (filter.experienced) {
                jobberman_level += jobberman_level.length > 0 ? '|' + level.jm_experienced : level.jm_experienced;
                ngcareer_level += ngcareer_level.length > 0 ? '|' + level.ng_experienced : level.ng_experienced;
            }
            if (filter.manager) {
                jobberman_level += jobberman_level.length > 0 ? '|' + level.jm_manager : level.jm_manager;
                ngcareer_level += ngcareer_level.length > 0 ? '|' + level.ng_manager : level.ng_manager;
            }
            if (filter.executive) {
                jobberman_level += jobberman_level.length > 0 ? '|' + level.jm_executive : level.jm_executive;
                ngcareer_level += ngcareer_level.length > 0 ? '|' + level.ng_executive :  level.ng_executive;
            }
            jobberman_level = new RegExp(jobberman_level);
            ngcareer_level = new RegExp(ngcareer_level);

            var deadline = new Date(job.job.deadline * 1000).toISOString();
            var today = new Date();
//(Date.parse(deadline) > Date.parse(today)) && 
            if (jobberman_level.test(job.job.level) || (job.job.source == 'Ngcareers' && ngcareer_level.test(job.job.experience))) {
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
                var j_level = job.job.level.length > 0 ? job.job.level : job.job.experience;
                var job_level = module.exports.findJobLevel(j_level, level);
                var data = {
                    company_name: job.company.name,
                    job_title: job.job.title,
                    job_description: description,
                    job_requirements: requirements,
                    qualifications: job.job.qualification,
                    job_level: job_level,
                    contract_type: job.job.type,
                    specialization: job.job.specialization,
                    experience: job.job.experience,
                    location: job.job.location,
                    salary: job.job.salary,
                    job_url: job.job.url,
                    job_id: job.id,
                    source: job.job.source,
                    closing_date: new Date(job.job.deadline * 1000).toISOString()
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


    moveJobToCompany: function(job_id, coy_id) {
        Job.update({ id: job_id }, { company: coy_id, source: 'gq' }).exec(function(err) { console.log(err)});
        return;
    },


    findJobLevel: function(j_level, levels) {
        var jm_entry       = new RegExp(levels.jm_entry);
        var ng_entry       = new RegExp(levels.ng_entry);
        var jm_experienced = new RegExp(levels.jm_experienced);
        var ng_experienced = new RegExp(levels.ng_experienced);
        var jm_manager     = new RegExp(levels.jm_manager);
        var ng_manager     = new RegExp(levels.ng_manager);
        var jm_executive   = new RegExp(levels.jm_executive);
        var ng_executive   = new RegExp(levels.ng_executive);

        if (jm_entry.test(j_level) || ng_entry.test(j_level)) {
            return 'Entry';
        } else if (jm_experienced.test(j_level) || ng_experienced.test(j_level)) {
            return 'Senior';
        } else if (jm_manager.test(j_level) || ng_manager.test(j_level)) {
            return 'Manager';
        } else if (jm_executive.test(j_level) || ng_executive.test(j_level)) {
            return 'Director';
        } else {
            return '';
        }
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