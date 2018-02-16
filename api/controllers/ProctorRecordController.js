/**
 * ProctorRecordController
 *
 * @description :: Server-side logic for managing Proctorrecords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    startSession: function(req, res) {
        //ProctorSession.destroy().exec(function() {});
        //ProctorRecord.destroy().exec(function() {})
        var test_id = req.param('test_id');
        if (req.session.proctor) {
            // relax, God is in control
            console.log('This happend')
        } else {
            ProctorSession.create({ test_id: test_id, user_id: req.session.userId }).exec(function(err, sess) {
                req.session.proctor = sess.id;
                req.session.save();
                console.log(req.session.proctor)
                return res.ok();
            });
        }
    },


    getTestProctorFiles: function(req, res) {
       const proctor_id = req.param('proctor_id');

        ProctorRecord.find({ proctor: proctor_id }).exec(function(err, files) {
            // also fetch profile picture (passport)
            Resume.find({ user: req.param('candidate_id') }).exec(function(err, user) {
                return res.json(200, { status: 'success', files: files, profile_pic: user[0].passport });
            });
        });
    },


    acceptTest: function(req, res) {
        ProctorSession.update({ id: req.param('proctor_id') }, { status: 'Accepted' }).exec(function() {});
        return res.ok();
    },

    rejectTest: function(req, res) {
        ProctorSession.update({ id: req.param('proctor_id') }, { status: 'Rejected' }).exec(function() {});
        return res.ok();
    },


    stopSession: function(req, res) {
        req.session.proctor = false;
        return res.ok();
    }
};

