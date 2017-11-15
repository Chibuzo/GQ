/**
 * CBTTestController
 *
 * @description :: Server-side logic for managing Cbttests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getTestResult: function(req, res) {
        TestResult.find().populate('applicant').sort('createdAt, desc').limit(50).exec(function (err, results) {
            if (err) return res.badRequest(err);
            return res.view('test/testResult', { results: results });
        });
    }
};

