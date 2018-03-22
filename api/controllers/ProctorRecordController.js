/**
 * ProctorRecordController
 *
 * @description :: Server-side logic for managing Proctorrecords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    startSession: function(req, res) {
        var test_id = req.param('test_id');

        // Create a new proctor session for each test.
        ProctorSession.create({ test_id: test_id, user_id: req.session.userId }).exec(function(err, sess) {
            req.session.proctor = sess.id;
            req.session.save();
            console.log('Started Proctor Session ' + req.session.proctor);
            return res.json(200, { status: 'success', proctor_id: sess.id });
        });
    },


    getTestProctorFiles: function(req, res) {
       const proctor_id = req.param('proctor_id');

        ProctorRecord.find({ proctor: proctor_id }).exec(function(err, files) {
            // also fetch profile picture (passport)
            Resume.find({ user: req.param('candidate_id') }).exec(function(err, user) {
                return res.json(200, { status: 'success', files: files, profile_pic: user[0].photo });
            });
        });
    },


    acceptTest: function(req, res) {
        ProctorSession.update({ id: req.param('proctor_id') }, { status: 'Accepted' }).exec(function() {});
        return res.ok();
    },

    rejectTest: function(req, res) {
        ProctorSession.update({ id: req.param('proctor_id') }, { status: 'Rejected' }).exec(function(err, proc) {
            User.find({ id: req.param('candidate_id') }).exec(function(err, user) {
                GQTest.find({ id: proc[0].test_id }).exec(function(err, test) {
                    sendMail.notifyOnTestCheat(user[0], test[0].test_name);
                });
            });
        });
        return res.ok();
    },


    stopSession: function(req, res) {
        req.session.proctor = false;
        return res.ok();
    }
};
