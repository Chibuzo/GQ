/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing Applications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    viewApplications: function(req, res) {
        Application.find({ applicant: req.session.userId }).populate('job').populate('company').exec(function(err, applications) {
            if (err) return;
            // we need to fetch the tests for each application
            var _applications = [];
            async.eachSeries(applications, function (app, cb) {
                JobTest.find({ job: app.job.id }).populate('test').exec(function(err, tests) {
                    app.tests = tests;
                    _applications.push(app);
                    cb();
                });
            },
            function (err) {
                if (err) console.log(err);
                return res.view('applicant/applications', { jobs: _applications });
            });
        });
    }
};

