/**
 * SelectedCandidateController
 *
 * @description :: Server-side logic for managing Selectedcandidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    selectCandidate: function(req, res) {
        var data = {
            candidate: req.param('candidate_id'),
            job_id: req.param('job_id')
        };
        SelectedCandidate.create(data).exec(function(err) {
            if (err) return res;
            return res.json(200, { status: 'success' });
        });
    },

    removeCandidate: function(req, res) {
        var data = {
            candidate: req.param('candidate_id'),
            job_id: req.param('job_id')
        };
        SelectedCandidate.destroy(data).exec(function() {
            return res.ok();    // beat my laziness
        });
    }
};

