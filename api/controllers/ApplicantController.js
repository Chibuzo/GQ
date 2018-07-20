/**
 * ApplicantController
 *
 * @description :: Server-side logic for managing Applicants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    dashboard: function(req, res) {
        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;
        const userEmail = req.session.userEmail;

		return ApplicantService.getChecklistData(req.session.userId)
			.then(userChecklist => {
				return res.view('applicant/dashboard', {
					userChecklist: userChecklist,
					enableAmplitude: enableAmplitude,
					userEmail: userEmail
				});
			}).catch(err => {
				return res.serverError(err);
			});
    },

    videoPage: function(req, res) {
        Resume.findOne({ user: req.session.userId }).exec(function(err, resume) {
            var fullname = resume.fullname.split(' ').join('-');
            return res.view('applicant/video', { video: resume.video_file, fname: fullname, resume_id: resume.id });
        });
    },

    getYoutubeAccessToken: function(req, res) {
        if (req.param('code')) { // for refresh token
            Youtube.authenticate(req.param('code')).then(function(token) {
                return res.json(200, { token: token });
            }).catch(function(err) {
                console.log('Error: ' + err);
            });
        } else {
            // run first time
            Youtube.getToken().then(function(resp) {
                if (resp.state == 'refresh') {
                    return res.redirect(resp.url);
                } else {
                    return res.json(resp.tokens)
                }
            }).catch(function(err) {
                console.log('Err: ' + err);
            });
        }
    },


    addYoutubeVideoID: function(req, res) {

        if (req.session.userId) {
            return Resume.update({ user: req.session.userId }, { youtube_vid_id: req.param('video_id'), video_status: 'true' })
                .then(resumes => {
                    if (resumes[0].status != 'Complete' && resumes[0].test_status == true && resumes[0].profile_status == true) {
                        return Resume.update({id: resumes[0].id}, {status: 'Complete'})
                            .then(() => {
                                return res.ok();
                            })
                            .catch(err => {
                                return res.serverError(err);
                            });
                    }

                    return res.ok();
                }).catch(err => {
                    return res.serverError(err);
                })
        } else {
            return res.forbidden();
        }
    },


    deleteYoutubeVideo: function(req, res) {
        Youtube.deleteVideo(req.param('video_id'));
        return res.ok();
    },


    // candidate's profile photo
    uploadPhoto: function(req, res) {
        var allowedVidTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        var filename = false;
        var hr = process.hrtime();
        req.file('photo').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/applicant_profilephoto/'),
            saveAs: function (file, cb) {
                if (allowedVidTypes.indexOf(file.headers['content-type']) === -1) {
                    //return res.badRequest('Unsupported photo format.');
                    //cb(new Error('01'));
                    return;
                }
                var ext = file.filename.split('.').pop();
                filename = hr[1] + '_photo.' + ext;
                return cb(null, filename);
            },
            maxBytes: 2 * 1024 * 1024
        },
        function (err, upfile) {
            if (err == '01') {
                return res.view('misc/error-page', { error: 'Unsupported photo format. Must be a JPG or PNG file', url: '/applicant/resume-page' })
            } else if (err) {
                return res.view('misc/error-page', { error: 'Photo file size must not be more than 2MB', url: '/applicant/resume-page' })
            }
            // this is weird but let's check if a file was uploaded
            if (!upfile || !filename) {
                return res.redirect('/applicant/resume-page#photo');
            }
            // copy the uploaded photo to the public folder
            const fs = require('fs');
            const path = require('path');
            const uploadedpic = path.resolve(sails.config.appPath, 'assets/applicant_profilephoto') + '/' + filename;
            const temp_pic = path.resolve(sails.config.appPath, '.tmp/public/applicant_profilephoto') + '/' + filename;
            fs.createReadStream(uploadedpic).pipe(fs.createWriteStream(temp_pic));

            Resume.update({ user: req.session.userId }, { photo: filename, photo_status: 'true' }).exec(function () {
                AmplitudeService.trackEvent('Uploaded Profile Photo', req.session.userEmail);
                return res.redirect('/applicant/resume-page#photo');
            });
            // delete previous photo if any
            const assetPath = path.resolve(sails.config.appPath + 'assets/applicant_profilephoto') + '/' + req.param('photo_name');
            if (fs.existsSync(assetPath)) {
                fs.unlinkSync(assetPath);
            }
        });
    },


    // candidate's profile video
    uploadVideo: function(req, res) {
        const fs = require('fs');
        var path = require('path').resolve(sails.config.appPath + '/assets/applicant_profilevideos');
        var hr = process.hrtime();
        var filename = hr[1] + '.mp4';
        path += '/' + filename;
        var video = req.param('data').split(';base64,').pop();
        var buff = new Buffer(video, 'base64');
        fs.writeFileSync(path, buff);

        const uploadedvid = require('path').resolve(sails.config.appPath, 'assets/applicant_profilevideos') + '/' + filename;

        S3Service.uploadProfileVideo(uploadedvid).then(function(resp) {
            Resume.update({ user: req.session.userId }, { video_file: resp.url, video_status: 'true' }).exec(function () {
                // check for old video and delete
                console.log(req.param('old_video'))
                S3Service.deleteProfileVideo(req.param('old_video'));
                
                // delete GQ
                if (fs.existsSync(uploadedvid)) {
                    fs.unlinkSync(uploadedvid);
                }
                AmplitudeService.trackEvent('Uploaded Profile Video', req.session.userEmail);
                return res.redirect('/applicant/resume-page#video');
            });
        }).catch(function(err) {
            return res.json(400, { status: 'error', message: err });
        });
    },


    showLanding: function(req, res) {
        Course.find({ status: 'Active' }).limit(3).exec(function(err, courses) {
            if (err) return res.badRequest();
            return res.view('candidate-page', { courses: courses });
        });
    },


    fetchApplicants: function(req, res) {
        GQTestService.fetchAllCandidatesAptitudeTestResult().then(function(candidates) {
            return res.view('admin/candidates', { candidates: candidates });
        }).catch(function(err) {
            return res.serverError(err);
        });
    },

    fetchStatisticsPage: function(req, res) {

        return ApplicantService.getApplicantStatistics().then(function(stats) {
            switch (req.param('query')) {
                case 'all':
                    ApplicantService.fetchAll().then(function(all) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: all,
                            filter: 'All Users',
                            info: 'All the user who have signed up with Get Qualified.'
                        });
                    });
                    break;

                case 'active':
                    ApplicantService.fectchActiveStatus("Active").then(function(active) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: active,
                            filter: 'Active Users',
                            info: 'All the user who have signed up with Get Qualified and have activated thier account via the activate email.'

                        });
                    });
                    break;

                case 'inactive':
                    ApplicantService.fectchActiveStatus("Inactive").then(function(inactive) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: inactive,
                            filter: 'Inactive Users',
                            info: 'All the user who have signed up with Get Qualified and have not activated thier account via the activate email.'
                        });
                    });
                    break;

                case 'incomplete':
                    ApplicantService.fetchResumeStatusByQuery({profile_status: false}).then(function(incomplete) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: incomplete,
                            filter: 'Incomplete Resumes',
                            info: 'All the user with an incomplete resume/cv.',
                            resume: true
                        });
                    });
                    break;

                case 'complete':
                    ApplicantService.fetchResumeStatusByQuery({profile_status: true}).then(function(incomplete) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: incomplete,
                             filter: 'Complete Resumes',
                            info: 'All the user with a complete resume/cv.',
                            resume: true
                        });
                    });
                    break;


                case 'photos':
                    ApplicantService.fetchResumeStatusByQuery({photo_status: true}).then(function(incomplete) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: incomplete,
                            filter: 'Profile Photos',
                            info: 'All the user with a profile photo.',
                            resume: true
                        });
                    });
                    break;


                case 'nophotos':
                    ApplicantService.fetchResumeStatusByQuery({photo_status: false}).then(function(incomplete) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: incomplete,
                             filter: 'No Profile Photos',
                            info: 'All the user with no profile photo.',
                            resume: true
                        });
                    });
                    break;

                case 'videos':
                    ApplicantService.fetchResumeStatusByQuery({video_status: true}).then(function(incomplete) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: incomplete,
                            filter: 'Profile Videos',
                            info: 'All the user with a profile video.',
                            resume: true
                        });
                    });
                    break;

                case 'novideos':
                        ApplicantService.fetchResumeStatusByQuery({video_status: false, test_status: true}).then(function(incomplete) {
                            return res.view('admin/candidates-stat', {
                                statistics: stats,
                                users: incomplete,
                                filter: 'No Profile Videos',
                                info: 'All the user with no profile video.',
                                resume: true
                            });
                        });
                        break;
                case 'notests':
                        ApplicantService.fetchNoTestsApplicants().then(noTests => {
                            return res.view('admin/candidates-stat', {
                                statistics: stats,
                                users: noTests,
                                filter: 'No Test Results',
                                info: 'All the user who can take a test, but have not.',
                                resume: true
                            });
                        })
                        break;
                case 'sometests':
                        ApplicantService.fetchSomeTestsApplicants().then(someTests => {
                            return res.view('admin/candidates-stat', {
                                statistics: stats,
                                users: someTests,
                                filter: 'Some Test Results',
                                info: 'All the user who have taken a test, but have not completed all 3 GQ tests.',
                                resume: true
                            });
                        })
                        break;
                case 'tests':
                        ApplicantService.fetchCompleteTestsApplicants().then(allTests => {
                            return res.view('admin/candidates-stat', {
                                statistics: stats,
                                users: allTests,
                                filter: 'Complete Test Results',
                                info: 'All the user who have completed all 3 GQ tests.',
                                resume: true
                            });
                        });
                        break;
                case 'jobs':
                        ApplicantService.fetchJobApplicants().then(jobApplicants => {
                            return res.view('admin/candidates-stat', {
                                statistics: stats,
                                users: jobApplicants,
                                filter: 'Job Applicants',
                                info: 'All the user have applied to a job.',
                                resume: true
                            });
                        })
                        break;
                case 'nojobs':
                    ApplicantService.fetchNoJobApplicants().then(noJobUsers => {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: noJobUsers,
                            filter: 'No Job Applications',
                            info: 'All the user who can apply to a job, but have not.',
                            resume: true
                        });
                    })
                    break;
                    default:
                        return res.notFound();
                    break;
            }
        }).catch(err => {
            return res.serverError(err);
        });
    },


    search: function(req, res) {
        const q = req.param;

        ApplicantService.searchResume(q('school'), q('course'), q('result'), q('certificate'), q('state')).then(function(users) {
            // choose a struggle
            if (q('page') == 'test') {
                // for test result page
                GQTestService.fetchAllCandidatesAptitudeTestResult(users).then(function(results) {
                    return res.view('admin/candidates', { candidates: results });
                }).catch(function(err) {
                    return res.serverError(err);
                });
            } else if (q('page') == 'stat') {
                // for all candidates' page
                ApplicantService.getApplicantStatistics().then(function(stats) {
                    Resume.find({ user: users }).exec(function(err, fusers) {
                        return res.view('admin/candidates-stat', {
                            statistics: stats,
                            users: fusers,
                            filter: 'Search Result',
                            info: 'All the Candidates that match the search criteria',
                            resume: true
                        });
                    });
                });
            }
        }).catch(function(err) {
            if (q('page') == 'test') {
                return res.redirect('/admin/applicants');
            } else {
                return res.redirect('/admin/candidates/all');
            }
        });
    },

    deleteTestScoreAndFiles: function(req, res) {
        const userId = parseInt(req.param('userId') || "");

        if (!userId) {
            return res.badRequest('Missing/invalid user id');
        }
        CBTService.cancelGQApptitudeTest(userId);
        User.findOne(userId).exec(function(err, user) {
            sendMail.testResetNotification(user);
        });
        return res.ok();
    },


    sendEmail: function(req, res) {
        let email_arr = req.param('users').split(",");  // convert string to array
        if (email_arr.length < 50) {
            let emails = email_arr.toString();
            sendMail.emailCandidates(emails, req.param('subject'), req.param('message'));
            return res.json(200, { status: 'success' });
        } else {
            while (email_arr.length > 0) {
                let emails = [];
                while (email_arr.length > 0 && emails.length < 49) {
                    emails.push(email_arr.pop());
                }
                sendMail.emailCandidates(emails, req.param('subject'), req.param('message'));
            }
            return res.json(200, { status: 'success' });
        }
    },

    deleteApplicants: function(req, res) {
        var users = req.param('users');

        if (!users) {
            return res.badRequest('Missing Users');
        }

        return ApplicantService.deleteApplicant(users)
            .then(() => {
                return res.ok();
            })
            .catch(err => {
                return res.serverError(err);
            });
    }
};
