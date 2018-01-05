/**
 * CBTTestController
 *
 * @description :: Server-side logic for managing Cbttests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getTestResult: function(req, res) {
        TestResult.find().populate('applicant').sort('createdAt desc').limit(50).exec(function (err, results) {
            if (err) return res.badRequest(err);
            return res.view('test/testResults', { results: results });
        });
    },

    showCandidateResult: function(req, res) {
        var test_id = req.param('test_id');
        TestResult.find({ applicant: req.session.userId, test_id: test_id }).populate('applicant').exec(function(err, result) {
            if (req.session.job_id) {
                // update application status
                Application.update({ job: req.session.job_id, applicant: req.session.userId }, { status: 'Awaiting Review' }).exec(function() {});
            }
            CBTTest.find({ test_id: test_id }).populate('category').exec(function(err, test) {
                return res.view('applicant/testresult', { result: result[0], test: test[0] });
            });
        });
    }
};
