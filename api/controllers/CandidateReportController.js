/**
 * CandidateReportController
 *
 * @description :: Server-side logic for managing Candidatereports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	fetchAllCandidates: function(req, res) {
        let start = req.param('start');
        let rows = req.param('length');
        let draw = req.param('draw');
        let search = req.param('search');
        let query = req.param('query');

        CandidateReportService.fetchAllCandidates(start, rows, query, search.value).then(candidates => {
            return res.json(200, { status: 'success', draw: draw, recordsTotal: candidates.num, recordsFiltered: candidates.num, data: candidates });
        }).catch(err => {
            return res.json(400, { status: 'error', message: err });
        });
    }
};

