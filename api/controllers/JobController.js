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
        var publish_date, publish = q('publish_now') == 1 ? true : false;
        if (publish) publish_date = new Date().toISOString();
        var data = {
            job_title: q('title'),
            job_description: q('description'),
            job_requirements: q('requirements'),
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
    }
};

