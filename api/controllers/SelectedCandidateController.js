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
        }, {
            job_id: req.param('job_id'),
            candidate: req.param('candidate_id')
        }).exec(function (err, result) {
            if (err) {
                return json(400, { status: 'error', message: err });
            }
            return res.json(200, { status: 'success' });
        });
    },

    unSelectCandidate: function(req, res) {
        SelectedCandidate.destroy({job_id: req.param('job_id'), candidate: req.param('candidate_id')}).exec(function() {
            return res.ok();
        });
    },


    interviewCandidatesRequest: function(req, res) {
        if (!req.session.coy_id) {
            return res.forbidden();
        }

        if (_.isUndefined(req.param('job_id'))) {
            return res.badRequest();
        }

        let jobId = req.param('job_id');

        return Promise.all([
                SelectedCandidate.update({ candidate: req.param('users'), job_id: jobId }, { status: 'Interview Requested' }),
                Job.findOne({id: jobId}).populate('company'),
                User.find({id: req.param('users')})
            ]).then((results) => {
                let job = results[1];
                let userRecords = results[2];

                let jobTitle = job.job_title;
                let companyName = job.company.company_name;

                let users = _.map(userRecords, (user) => {
                    return `${user.fullname}, (${user.email})`;
                });

                sendMail.companyRequestCandidateInterview(companyName, jobTitle, users);
                return res.ok();
            }).catch(err => {
                return res.serverError();
            })
    }
};
