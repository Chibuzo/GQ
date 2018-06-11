/**
 * JobApiController
 *
 * @description :: Server-side logic for managing Jobapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createJob: function(req, res) {
        var data;
        try {
            data = req.body.request;
        } catch(err) {
            return res.json(400, { status: 'error', message: 'Invalid JSON body' });
        }

        JobApiService.authenticate(data.authentication.email, data.authentication.password).then(function(auth) {
            if (auth.status === true) {
                JobApiService.saveJobs(data.job[0], auth.company.id).then(function(url) {
                    return res.json(201, { status: 'success', joburl: url });
                }).catch(function(err) {
                    return res.json(400, { status: 'error', message: err });
                });
            }
        }).catch(function(err) {
            console.log(err);
            return res.json(400, err);
        });
    },

    returnJobUrl: function(req, res) {
        var job_id = req.param('job_id');
        JobApiService.returnJobUrl(job_id).then(function(url) {
            return res.json(200, { status: 'success', jobID: job_id, joburl: url });
        }).catch(function(err) {
            return res.json(400, { status: 'error', message: err });
        });
    }
};
