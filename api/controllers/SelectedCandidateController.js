/**
 * SelectedCandidateController
 *
 * @description :: Server-side logic for managing Selectedcandidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    selectCandidate: function(req, res) {
        SelectedCandidate.findOrCreate({
            job_id: req.param('job_id'),
            candidate: req.param('candidate_id')
        }, {job_id: req.param('job_id'), candidate: req.param('candidate_id')}).exec(function () {
            return res.ok();
        });
    },

    unSelectCandidate: function(req, res) {
        SelectedCandidate.destroy({job_id: req.param('job_id'), candidate: req.param('candidate_id')}).exec(function() {
            return res.ok();
        });
    }
};

