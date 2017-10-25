/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing Applications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    viewApplications: function(req, res) {
        Application.find({ applicant: req.session.userId }).populate('job').populate('company').exec(function(err, applications) {
            if (err) return;
            return res.view('applicant/applications', { jobs: applications });
        });
    }
};

