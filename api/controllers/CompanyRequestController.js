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
        CompanyRequest.create(data).exec(function(err, coy) {
            if (err) return console.log(err);
            sendMail.companySignUpRequest(coy);
            return res.json(200, { status: 'success' });
        });
    },

    viewPendingRequests: function(req, res) {
        CompanyRequest.find({ status: 'Pending' }).exec(function(err, reqs) {
            if (err) return console.log(err);
            return res.view('admin/coy-requests', { requests: reqs });
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

