/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing Applications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    viewApplications: function(req, res) {
        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;
        const userEmail = req.session.userEmail;

        return Application.find({ applicant: req.session.userId }).populate('job').populate('company')
            .then(applications => {
                let _applications = [];
                async.eachSeries(applications, function (app, cb) {
                    JobTest.find({ job_category_id: app.job.category, job_level: app.job.job_level }).populate('test').populate('gq_test').exec(function(err, tests) {
                        app.tests = tests;
                        _applications.push(app);
                        cb();
                    });
                },
                function (err) {
                    if (err) {
                        console.error(err);
                    }

                    return res.view('applicant/applications', {
                        jobs: _applications,
                        enableAmplitude: enableAmplitude,
                        userEmail: userEmail
                    });
                });
            })
            .catch(err => {
                return res.serverError(err);
            })
    }
};