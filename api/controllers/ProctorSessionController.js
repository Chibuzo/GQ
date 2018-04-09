/**
 * ProctorSessionController
 *
 * @description :: Server-side logic for managing Proctorsessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getProctorSession: function(req, res) {
       const proctor_ids = req.param('proctor_ids');

        ProctorSession.find({ id: proctor_ids }).exec(function(err, sessions) {
            return res.json(200, { status: 'success', sessions: sessions });
        });
    },
};
