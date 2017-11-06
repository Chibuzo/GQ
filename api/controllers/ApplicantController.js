/**
 * ApplicantController
 *
 * @description :: Server-side logic for managing Applicants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    videoPage: function(req, res) {
        Resume.findOne({ user: req.session.userId }).exec(function(err, resume) {
            var fullname = resume.fullname.split(' ').join('-');
            return res.view('applicant/video', { video: resume.video_file, fname: fullname, resume_id: resume.id });
        });
    },

    uploadVideo: function(req, res) {
        var allowedVidTypes = ['video/mp4'];
        var filename;
        var hr = process.hrtime();
        req.file('video_file').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/applicant_videos/'),
                saveAs: function(file, cb) {
                    if (allowedVidTypes.indexOf(file.headers['content-type']) === -1) {
                        return res.badRequest('Unsupported video format.');
                    }
                    var ext = file.filename.split('.').pop();
                    filename = req.param('video_file').length > 3 ? req.param('video_file') : req.param('video_title') + "_" + hr[1] + '.' + ext;
                    return cb(null, filename);
                },
                maxBytes: 100 * 1024 * 1024
            },
            function(err) {
                if (err) {
                    return res.badRequest(err);
                }
                console.log(filename);
                Resume.update({ id: req.param('resume_id') }, { video_file: filename }).exec(function(err) {
                    if (err) {
                        return res.badRequest(err);
                    }
                    return res.redirect('/applicant/video');
                });
            });
    }
};

