/**
 * JobController
 *
 * @description :: Server-side logic for managing Jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	viewJobs: function(req, res) {
        var coy_id = req.session.coy_id;
        Job.find({ company: coy_id }).exec(function(err, jobs) {
            if (err) return;
            return res.view('company/manage-jobs', { jobs: jobs });
        });
    },

    addNewJob: function (req, res) {
        var q = req.param;
        var publish_date, publish = true; //q('publish_now') == 1 ? true : false;
        if (publish) publish_date = new Date().toISOString();
        var data = {
            job_title: q('title'),
            job_description: q('description'),
            job_requirements: q('requirements'),
            job_level: q('job_level'),
            location: q('location'),
            nice_to_have: q('nice_to_have'),
            published: publish,
            date_published: publish_date,
            closing_date: new Date(Date.parse(q('closing_date'))).toISOString(),
            company: req.session.coy_id
        };
        Job.create(data).exec(function(err, job) {
            if (err) return;
            return res.redirect('/job/manage');
        });
    },

    readApplicationCSV: function(req, res) {
        var job_id = req.param('job_id');

        req.file('csv').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/csv-files'),
            saveAs: function(file, cb) {
                var ext = file.filename.split('.').pop();
                filename = 'job_' + job_id + '.' + ext;
                return cb(null, filename);
            }
        },
        function(err, uploadedFile) {
            if (err) {
                return res.badRequest(err);
            }
            const fs = require('fs');
            fs.readFile(csvpath, 'utf8', function(err, data) {
                //var dataArr = data.split();
                console.log(data);
            });
        });
    },

    listJobs: function(req, res) {
        var today = new Date().toISOString();
        Job.find({ closing_date: { '>': today } }).populate('company').exec(function(err, jobs) {
            if (err) return;
            return res.view('jobs', { jobs: jobs });
        });
    },

    showJob: function(req, res) {
        var job_id = req.param('id');
        Job.findOne({ id: job_id }).populate('company').exec(function(err, job) {
            if (err) return res.negotiate(err);
            return res.view('job', { job: job });
        });
    },

    apply: function(req, res) {
        var job_id = req.param('id');
        if (req.session.userId && req.session.user_type == 'Applicant') {
            Job.findOne({ id: job_id }).exec(function (err, job) {
                if (err) return;
                var data = {
                    job: job_id,
                    company: job.company,
                    applicant: req.session.userId
                };
                Application.create(data).exec(function() {
                    return res.redirect('/applications/list');
                });
            });
        } else {
            // sign up or login to continue
        }
    },

    deleteJob: function (req, res) {
        var id = req.param('id');
        console.log(req.session.coy_id);
        if (!req.session.coy_id) return;
        Job.destroy({ id: id, company: req.session.coy_id }).exec(function(err) {
            if (err) return;
            return res.json(200, { status: 'success' });
        });
    }
};

