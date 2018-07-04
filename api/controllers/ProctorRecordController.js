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
        return ProctorSession.create({ test_id: test_id, user_id: req.session.userId }).exec(function(err, sess) {
            if (err) {
                return res.json(500, { status: 'error', message: err });
                //return res.serverError(err);
            }

            req.session.proctor = sess.id;
            req.session.save();
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
        if (req.param('test_type') == 'GQAptitude') {
            GQAptitudeTestResult.update({ user: req.param('candidate_id') }, { status: 'Accepted' }).exec(function(err, test) {
                if (test.length > 0) {
                    // delete proctor files
                    [1,2,3].forEach(function(test) {
                        ProctorService.deleteProctorFiles(test);
                    });
                }
            });
        } else if (req.param('test_type') == 'job-test') {
            ProctorSession.update({ id: req.param('proctor_id') }, { status: 'Accepted' }).exec(function() {
                ProctorService.deleteProctorFiles(req.param('proctor_id'));
            });
        }
        return res.ok();
    },


    rejectTest: function(req, res) {
        User.find({ id: req.param('candidate_id') }).exec(function(err, user) {
            if (req.param('test_type') == 'GQAptitude') {
                GQAptitudeTestResult.update({ user: req.param('candidate_id') }, { status: 'Rejected' }).exec(function(err, test) {
                    sendMail.notifyOnTestCheat(user[0], 'General Aptitude Test');
                });
            } else if (req.param('test_type') == 'job-test') {
                ProctorSession.update({ id: req.param('proctor_id') }, { status: 'Rejected' }).exec(function() {
                    //sendMail.notifyOnJobTestCheat(user[0], req.param('job_title'));
                });
            }
        });
        return res.ok();
    },


    saveEvidenceData: function(req, res) {
        let integrity_score = req.param('integrity_score');
        let session_id = req.param('session_id');
        let invigilationTracking = req.param('invigilationTracking') || {};

        let data = {
            integrity_score: integrity_score ? integrity_score : -1,
            noFaceCount: invigilationTracking.noFace ? invigilationTracking.noFace : -1,
            noiseCount: invigilationTracking.noise ? invigilationTracking.noise : -1,
            multipleFacesCount: invigilationTracking.multipleFaces ? invigilationTracking.multipleFaces : -1
        };
        ProctorSession.update({ id: session_id }, data).exec(function(err, result) {
            if (err) {
                return res.json(500, { status: 'error', message: err });
            }
            return res.json(200, { status: 'success' });
        });
    },


    stopSession: function(req, res) {
        req.session.proctor = false;
        return res.ok();
    }
};
