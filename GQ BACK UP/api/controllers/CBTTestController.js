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

    // should deprecate this function.
    showCandidateResult: function(req, res) {
        var test_id = req.param('test_id');
        TestResult.find({ applicant: req.session.userId, test_id: test_id }).populate('applicant').exec(function(err, result) {

            CBTTest.find({ test_id: test_id }).populate('category').exec(function(err, test) {
                return res.view('applicant/testresult', { result: result[0], test: test[0] });
            });
        });
    }
};
