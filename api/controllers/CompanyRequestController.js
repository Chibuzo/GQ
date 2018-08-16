/**
 * CompanyRequestController
 *
 * @description :: Server-side logic for managing Companyrequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    submitRequest: function(req, res) {
        var q = req.param;
        var data = {
            company_name: q('company_name'),
            contact_person: q('contact_name'),
            contact_phone: q('phone'),
            contact_email: q('email')
        };
        CompanyService.signupRequest(data).then(status => {
            if (status === true) {
                return res.json(200, { status: 'success' });
            }
        }).catch(err => {
            return json(400, { status: 'error', message: err });
        });
    },

    viewPendingRequests: function(req, res) {
        return CompanyRequest.find({ status: 'Pending' })
        .then(reqs => {
            return res.view('admin/coy-requests', { requests: reqs });
        })
        .catch(err => {
            return res.serverError(err);
        });
    },

    approve: function(req, res) {
        var id = req.param('id');
        CompanyRequest.update({ id: id }, { status: 'Approved' }).exec(function(err, coy) {
            if (err) return;
            sendMail.companyVerification(coy[0]);
            return res.json(200, { status: 'success' });
        });
    },

    cancel: function(req, res) {
        var id = req.param('id');
        CompanyRequest.update({ id: id }, { status: 'Cancelled' }).exec(function(err, coy) {
            return res.json(200, { status: 'success' });
        });
    }
};

