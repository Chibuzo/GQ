/**
 * JobTestController
 *
 * @description :: Server-side logic for managing Jobtests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //manageJobTests: function (req, res) {
    //    CBTTest.find().exec(function(err, xpr_tests) { // Expertrating tests
    //        if (err) return;
    //        GQTest.find().exec(function(err, gqtests) {
    //            JobCategory.find().exec(function(err, jobcategories) { // GQ tests
    //                if (err) return;
    //                JobTest.find().populate('job').exec(function (err, jobtests) {
    //                    var job_tests = [];
    //                    //jobtests.forEach(function(test) {
    //                    //    if (test.test_source == 'gq') {
    //                    //
    //                    //    }
    //                    //    job_tests.push({
    //                    //        test_title: test.test_title,
    //                    //        test_source: test.test_source,
    //                    //        job_level: test.job_level,
    //                    //        job_category: test.job_category,
    //                    //    });
    //                    //});
    //                    return res.view('test/manage-test', { xpr_tests: tests, gq_tests: gqtests, jobtests: jobtests, job_categories: jobcategories });
    //                });
    //            });
    //        });
    //    });
    //},

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
                test_source: req.param('test_source'),
                test_title: req.param('test_title'),
                job_level: req.param('job_level'),
                job_category: req.param('category'),
                job: req.param('job_category')
            };
            console.log(data);
            JobTest.create(data).exec(function (err) {
                console.log(err);
                return res.redirect('/admin/manage-test');
            });
        });
    },

    getJobTest: function(req, res) {
        var category = req.param('category');
        var job_level = req.param('job_level');
        JobTest.find({ job_category: category, job_level: job_level }).populate('test').exec(function(err, tests) {
            if (err) {
                return res.json(200, { status: 'error', msg: err });
            }
            return res.json(200, { status: 'success', test: tests });
        });
    },

    setJobTestRating: function(req, res) {
        Job.update({ id: req.param('job_id')}, {gq_grade: req.param('gq_rating'), jobtest_grade: req.param('job_test')}).exec(function(err, job) {});
        return res.ok();
    },

    removeTest: function (req, res) {
        var job_id = req.param('job_id');
        JobTest.destroy({ id: job_id }).exec(function() {
            return res.json(200, { status: 'success' });
        });
    }
};

