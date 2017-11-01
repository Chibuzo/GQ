/**
 * JobTestController
 *
 * @description :: Server-side logic for managing Jobtests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    manageJobTests: function (req, res) {
        CBTTest.find().exec(function(err, tests) {
            if (err) return;
            JobCategory.find().exec(function(err, jobcategories) {
                if (err) return;
                JobTest.find().populate('test').populate('job').exec(function (err, jobtests) {
                    return res.view('test/manage-test', { tests: tests, jobtests: jobtests, job_categories: jobcategories });
                });
            });
        });
    },

    assignTest: function (req, res) {
        req.param('test').forEach(function(test) {
            var data = {
                test: test,
                job_category: req.param('category'),
                job: req.param('job_category')
            };
            JobTest.create(data).exec(function () {
                return res.redirect('/admin/manage-test');
            });
        });
    },

    removeTest: function (req, res) {
        var job_id = req.param('job_id');
        JobTest.destroy({ id: job_id }).exec(function() {
            return res.json(200, { status: 'success' });
        });
    }
};

