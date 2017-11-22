/**
 * GQTestController
 *
 * @description :: Server-side logic for managing Gqtests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	manageTest: function(req, res) {
        GQTest.find().populate('questions').sort({'createdAt: desc'}).exec(function(err, tests) {
            if (err) return res.badRequest(err);
            return res.view('gqtest/manage-tests', { tests: tests });
        });
    }
};

