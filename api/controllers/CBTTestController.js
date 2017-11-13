/**
 * CBTTestController
 *
 * @description :: Server-side logic for managing Cbttests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    showCandidateResult: function(req, res) {
        var test_id = req.param('test_id');
        TestResult.find({ applicant: req.session.userId, test_id: test_id }).populate('applicant').populate('jobtest').exec(function(err, result) {
            CBTTest.find({ test_id: test_id }).populate('category').exec(function(err, test) {
                return res.view('applicant/testresult', { result: result[0], test: test[0] });
            });
        });
    }
};

