/**
 * GQTestController
 *
 * @description :: Server-side logic for managing Gqtests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');

module.exports = {
	manageTest: function(req, res) {
        var source, user_id, folder;
        if (req.session.admin === true) {
            source = 'GQ';
            user_id = req.session.admin_id;
            folder = 'admin';
        } else if (req.session.user_type == 'company-admin' || req.session.user_type == 'company-test') {
            source = 'COY';
            user_id = req.session.user_id;
            folder = 'company';
        } else {
            return res.serverError('Gerrout!!!');
        }
        GQTest.find().populate('questions').sort({createdAt: 'desc'}).exec(function(err, tests) {
            if (err) return res.badRequest(err);
            return res.view(folder + '/manage-tests', { tests: tests });
        });
    },

    createTestPage: function(req, res) {
        var folder = req.session.admin === true ? 'admin' : 'company';
        return res.view(folder + '/createnew');
    },

    saveTest: function(req, res) {
        var data = {
            test_name: req.param('test_name'),
            category: req.param('category'),
            difficulty: req.param('difficulty'),
            duration: req.param('duration'),
            instructions: req.param('instructions')
        };
        if (req.param('test_id') && _.isNumber(parseInt(req.param('test_id')))) {
            GQTest.update({ id: req.param('test_id') }, data).exec(function() {
                return res.json(200, { status: 'success' });
            });
        } else {
            GQTest.create(data).exec(function(err, test) {
                if (err) {
                    return res.json(200, { status: 'error', msg: err });
                }

                return res.json(200, { status: 'success' });
            });
        }
    },

    uploadQuestions: function(req, res) {
        GQTestService.extractTestQuestionsFromExcel(req.file('xslx_questions'), req.param('test_id'));
        return res.redirect('/gqtest/edittest/' + req.param('test_id'));
    },

    saveQuestion: function(req, res) {
        var data = {
            test: req.param('test_id'),
            question: req.param('question'),
            opt_a: req.param('opt_a'),
            opt_b: req.param('opt_b'),
            opt_c: req.param('opt_c'),
            opt_d: req.param('opt_d'),
            opt_e: req.param('opt_e'),
            answer: req.param('answer')
        };
        if (req.param('question_id') && _.isNumber(parseInt(req.param('question_id')))) {
            GQTestQuestions.update({ id: req.param('question_id') }, data).exec(function (err, quest) {
                if (err) return res.json(200, {status: 'error', msg: err});
                //return res.json(200, {status: 'success'});
            });
            GQTestService.addImageToQuestion(req.file('question_image')).then(function(resp) {
                GQTestQuestions.update({ id: req.param('question_id') }, { image_file: resp }).exec(function (err, quest) {
                    if (err) return res.json(200, {status: 'error', msg: err});
                    return res.json(200, {status: 'success'});
                });
            }).catch(function(err) {
                return res.json(200, {status: 'success'});
            });
        } else {
            GQTestQuestions.create(data).exec(function (err, quest) {
                if (err) return res.json(200, {status: 'error', msg: err});
                GQTestService.addImageToQuestion(req.file('question_image')).then(function(resp) {
                    GQTestQuestions.update({ id: quest.id }, { image_file: resp }).exec(function() {});
                    return res.json(200, {status: 'success'});
                }).catch(function(err) {
                    return res.json(200, {status: 'success'});
                    //if (err) return res.json(200, { status: 'error', 'msg': err });
                });
            });
        }
    },

    editTest: function(req, res) {
        var test_id = req.param('test_id');
        GQTest.find({ id: test_id }).populate('questions').exec(function(err, test) {
            if (err) return res.badRequest(err);
            return res.view('gqtest/edit-test', { test: test[0] });
        });
    },

    getQuestion: function(req, res) {
        var question_id = req.param('question_id');
        GQTestQuestions.find({ id: question_id }).exec(function(err, question) {
            if (err) return res.json(200, { status: 'error', msg: err });
            return res.json(200, { status: 'success', question: question[0] });
        });
    },

    // when candidate clicks on take test from a job
    getTest: function(req, res) {
        var test_id = req.param('test_id');
        var application_id = req.param('job_id');
       
        req.session.application_id = application_id;

        GQTestResult.find({
            test: test_id,
            candidate: req.session.userId
        }).populate('test').exec(function (err, test_result) {
            if (err) console.log(err)
            if (test_result.length > 0) {
                GQTestService.prepareCandidateResult(test_id, test_result[0].score, test_result[0].no_of_questions).then(function (result) {
                    return res.view('gqtest/gqtest', { result: result, test_id: test_id, test: test_result, test_title: test_result[0].test.test_name });
                });
            } else {
                // load test
                return res.view('gqtest/gqtest', { test_id: test_id });
            }
        });
    },

    loadTestInstruction: function(req, res) {
        var test_id = req.param('test_id');
        // dirty hack for resuming test that has sections. Currently, only applicable to GQ general test
        if (test_id == 1) {
            GQTestService.determineTestId(req.session.userId).then(function (next_test) {
                GQTest.find({id: next_test}).exec(function (err, test) {
                    if (err) return console.log(err);
                    if (test.length > 0) {
                        return res.json(200, {
                            status: 'success',
                            test_id: test[0].id,
                            test_name: test[0].test_name,
                            instructions: test[0].instructions
                        });
                    } else {
                        return res.json(400, { status: 'error' });
                    }
                });
            });
        } else {
            GQTest.find({id: test_id}).exec(function (err, test) {
                if (err) return console.log(err);
                if (test.length > 0) {
                    return res.json(200, {
                        status: 'success',
                        test_id: test[0].id,
                        test_name: test[0].test_name,
                        instructions: test[0].instructions
                    });
                } else {
                    return res.json(400, { status: 'error' });
                }
            });
        }
    },

    loadTest: function(req, res) {
        var test_id = req.param('test_id');
        GQTest.find({ id: test_id }).populate('questions').exec(function(err, test) {
            if (err) return res.json(200, { status: 'error', msg: "Couldn't load test questions at this time" });
            return res.json(200, {
                status: 'success',
                questions: test[0].questions,
                test_id: test[0].id,
                duration: test[0].duration
            });
        });
    },


    markTest: function(req, res) {
        var test_id = req.param('test_id');
        var no_of_questions = req.param('no_of_questions');
        var integrity_score = req.param('integrity_score');
        var userAnswers = req.param("userAnswers") || [];
		var invigilationTracking = req.param('invigilationTracking') || {};

        var score = 0;

            GQTestQuestions.find({test: test_id}).exec(function(err, questions) {
                if (err) {
                    console.error(err);
                    return;
                }

                userAnswers.forEach(function(userAnswer) {
                    var question = _.find(questions, function(q) {
                        return q.id == userAnswer.quest_id;
                    });

                    if (!question) {
                        // TODO: when starting a subsequent test, it submits the most recent answered question if last question wasn't skipped
                        console.error(`Coundn't find question for ${userAnswer.quest_id} in test: ${test_id}`);
                        return;
                    }

                    if (question.answer === userAnswer.ans) {
                        score++;
                    }
                });

                // fall back for user who don't refresh their JS during this release
                if (_.isEmpty(invigilationTracking)) {
                    invigilationTracking = {
                        noFace: -1,
                        noise: -1,
                        multipleFaces: -1
                    };
                }

            // update integrity score and invigilationTracking data
            ProctorSession.update({ id: req.session.proctor },
                {
                    integrity_score: integrity_score,
                    noFaceCount: invigilationTracking.noFace,
                    noiseCount: invigilationTracking.noise,
                    multipleFacesCount: invigilationTracking.multipleFaces
                }
            ).exec(function() {
                req.session.proctor = false;
            });

            // save or update candidate's test score
            CBTService.saveTestScore(test_id, score, no_of_questions, req.session.userId, req.session.proctor).then(function() {
                // destroy stored test answers
                // update application
                if (req.session.application_id) {
                    Application.update({ id: req.session.application_id }, { status: 'Under Review' }).exec(function(err, app) {
                        console.log(err)
                        console.log(app)
                        req.session.application_id = null;
                    });
                }

                GQTestService.prepareCandidateResult(test_id, score, no_of_questions)
                .then(function(resp) {
                    return res.json(200, { status: 'success', result: resp});
                }).catch(function(err) {
                    console.log(err);
                });
            });
        });
    },

    // Deprecated
    // called when the last section of GQ aptitude test gets submitted
    markGQTest: function(req, res) {
        var test_id = req.param('test_id');
        var no_of_questions = req.param('no_of_questions');
        var integrity_score = req.param('integrity_score');
        var userAnswers = req.param("userAnswers") || [];
        var invigilationTracking = req.param('invigilationTracking') || {};

        var score = 0;

        GQTestQuestions.find({test: test_id}).exec(function(err, questions) {
            if (err) {
                console.error(err);
                return;
            }

            userAnswers.forEach(function(userAnswer) {
                var question = _.find(questions, function(q) {
                    return q.id == userAnswer.quest_id;
                });

                if (!question) { // candidate didn't answer
                    console.error(`Coundn't find question for ${userAnswer.quest_id} in test: ${test_id}`);
                    return;
                }

                if (question.answer === userAnswer.ans) {
                    score++;
                }
            });

            // fall back for user who don't refresh their JS during this release
            if (_.isEmpty(invigilationTracking)) {
                invigilationTracking = {
                    noFace: -1,
                    noise: -1,
                    multipleFaces: -1
                };
            }

            // save integrity score
            ProctorSession.update({ id: req.session.proctor },
                {
                    integrity_score: integrity_score,
                    noFaceCount: invigilationTracking.noFace,
                    noiseCount: invigilationTracking.noise,
                    multipleFacesCount: invigilationTracking.multipleFaces
                }
            ).exec(function() {});

            CBTService.saveTestScore(test_id, score, no_of_questions, req.session.userId, req.session.proctor).then(function() {
                CBTService.saveGeneralTestScore(req.session.userId).then(function(resp) {
                    // end proctor session
                    req.session.proctor = false;

                    // update candidate's resume
                    Resume.update({user: req.session.userId}, {test_status: 'true'}).exec(function (err, resume) {
                        if (resume[0].status != 'Complete' && resume[0].video_status == true && resume[0].profile_status == true) {
                            Resume.update({ id: resume.id }, { status: 'Complete' }).exec(function () {});
                        }
                    });
                    CBTService.candidateGeneralTestResult(req.session.userId).then(function(result) {
                        return res.json(200, { status: 'success', result: result });
                    }).catch(function(err) {
                        console.log(err)
                    });
                }).catch(function(err) {
                    console.log(err)
                });
            }).catch(function(err) {
                console.log(err)
            });
        });
    },

    markGQ: function(req, res) {
        let test_id = req.param('test_id');
        test_id = parseInt(test_id);

        let no_of_questions = req.param('no_of_questions');
        let integrity_score = req.param('integrity_score');
        let userAnswers = req.param("userAnswers") || [];
		let invigilationTracking = req.param('invigilationTracking') || {};
        let proctorSessId = req.param('proctorSessId');

        let score = 0;

        if (proctorSessId != req.session.proctor) {
            AmplitudeService.trackEvent('Proctor Session ID Mismatch (Test)', req.session.userEmail, {
                location: 'GQTestController.markGQ()',
                testId: test_id,
                sessionProctor: req.session.proctor,
                requestProctor: proctorSessId
            });
        }
        // update integrity score and invigilationTracking data
        ProctorSession.update({ id: req.session.proctor },
            {
                integrity_score: integrity_score,
                noFaceCount: invigilationTracking.noFace,
                noiseCount: invigilationTracking.noise,
                multipleFacesCount: invigilationTracking.multipleFaces
            }
        ).exec(function() {
            req.session.proctor = false;
        });

        // Get all the answers for the test and mark user's answers
        GQTestQuestions.find({test: test_id}).exec(function(err, questions) {
            if (err) {
                console.error(err);
                return res.serverError(err);
            }

            userAnswers.forEach(function(userAnswer) {
                var question = _.find(questions, function(q) {
                    return q.id == userAnswer.quest_id;
                });

                if (!question) {
                    // TODO: when starting a subsequent test, it submits the most recent answered question if last question wasn't skipped
                    console.error(`Couldn't find question for ${userAnswer.quest_id} in test: ${test_id}`);
                    return;
                }

                if (question.answer === userAnswer.ans) {
                    score++;
                }
            });

            // save or update candidate's test score
            CBTService.saveTestScore(test_id, score, no_of_questions, req.session.userId, req.session.proctor).then(function() {
                CBTService.saveGeneralTestScore(req.session.userId).then(function(resp) {
                    var state = resp === true ? 'Done' : 'On';
                    if (test_id === 3) {
                        // update candidate's resume
                        Resume.update({user: req.session.userId}, {test_status: 'true'}).exec(function (err, resume) {
                            if (resume[0].status != 'Complete' && resume[0].video_status == true && resume[0].profile_status == true) {
                                Resume.update({ id: resume.id }, { status: 'Complete' }).exec(function () {});
                            }
                        });
    
                        // CBTService.candidateGeneralTestResult(req.session.userId).then(function(result) {
                        //     return res.json(200, { status: 'success', result: result, state: state });
                        // }).catch(function(err) {
                        //     console.log(err);
                        //     return res.serverError(err);
                        // });
                    }
                    return res.json(200, { status: 'success', state: state });
                }).catch(function(err) {
                    console.log(err);
                    return res.json(200, { status: 'error', state: state });
                });
            }).catch(function(err) {
                console.error(err);
                //return res.serverError(err);
            });
        });
    },

    viewResults: function(req, res) {
        var test_id = req.param('test_id');
        GQTestResult.find({ test: test_id }).populate('candidate').populate('test').limit(100).exec(function(err, results) {
            if (err) {}
            if (results.length > 0) {
                GQTestResult.find({test: test_id}).groupBy('test').average('score').exec(function(err, test_ave) {

                    var test_results = [];
                    results.forEach(function(result) {
                        var percentage = ((parseInt(result.score) / parseInt(result.no_of_questions)) * 100).toFixed(1);
                        test_results.push({
                            candidate: result.candidate,
                            score: result.score,
                            percentage: percentage,
                            //average_score: test_ave[0].score,
                            result: percentage > 59 ? 'Passed' : 'Failed',
                            test_date: result.updatedAt
                        });
                    });
                    return res.view('gqtest/view-results', {
                        results: test_results,
                        test: results[0].test
                    });
                });
            } else {
                return res.json(200, { status: 'success', result: {} });
            }
        });
    },

    deleteTest: function(req, res) {
        if (req.session.admin === true) {
            GQTest.destroy({ id: req.param('test_id') }).exec(function() {
                // handle questions
                GQTestQuestions.destroy({test: req.param('test_id')}).exec(function () {});
                return res.json(200, { status: 'success' });
            });
        }
    },

    deleteQuestion: function(req, res) {
        if (req.session.admin === true) {
            GQTestQuestions.destroy({id: req.param('quest_id')}).exec(function () {});
            return res.ok();
        }
    },

    deleteResult: function(req, res) {
        GQTestResult.destroy({ id: req.param('test_id') }).exec(function(err, test) {
            try {
                ProctorService.deleteProctorFiles(test[0].proctor);
            } catch(err) {
                console.log(err);
            } finally {
                return res.json(200, { status: 'success' });
            }
        });
    },

    uploadProctorAudio: function(req, res) {
        if (!req.param('data')) {
            return res.json(400, { status: 'error', message: "Expected data (data) not found. Be consistent!" });
        }
        var path = require('path').resolve(sails.config.appPath + '/assets/proctorFiles');
        var hr = process.hrtime();
        var filename = '/aud_' + hr[1] + '.wav';
        path += filename;
        var audio = req.param('data').split(';base64,').pop();
        var buff = new Buffer(audio, 'base64');
        fs.writeFileSync(path, buff);

        // copy the uploaded audio to S3
        S3Service.uploadProtorFile(path, 'audio/wav').then(function(resp) {        
            // check source
            var session_id = false;
            var uri_path = req.path.split('/')[1];
            if (uri_path == 'api') {
                session_id = req.param('session_id');
            } else {
                session_id = req.session.proctor;
            }

            // save audio filename
            if (session_id) {
                var data = {
                    filename: resp.url,
                    file_type: 'audio',
                    proctor: session_id
                };
                ProctorRecord.create(data).then(function() {
                    return res.json(201, { status: 'success' });
                }).catch(function(err) {
                    sails.log.error(err);
                    return res.json(400, { status: 'error', message: err });
                });
            }
            // delete file from GQ
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        }).catch(err => {
            return res.json(400, { status: 'error', message: err });
        });
    },

    uploadProctorPicture: function(req, res) {
        if (!req.param('imgBase64')) {
            return res.json(400, { status: 'error', message: "Expected data (imgBase64) not found. Be consistent!" });
        }
        var path = require('path').resolve(sails.config.appPath + '/assets/proctorFiles');
        var eventName = req.param('eventName') ?  req.param('eventName') + "_" : "";
        var hr = process.hrtime();
        var filename = `/pic_${eventName}${hr[1]}.png`;
        path += filename;
        var photo = req.param('imgBase64').split(';base64,').pop();
        var buff = new Buffer(photo, 'base64');
        fs.writeFileSync(path, buff);

        // copy the uploaded photo to S3
        S3Service.uploadProtorFile(path, 'image/png').then(function(resp) {
            // check source
            var session_id = false;
            var uri_path = req.path.split('/')[1];
            if (uri_path == 'api') {
                session_id = req.param('session_id');
            } else {
                session_id = req.session.proctor;
            }

            // save photo filename
            if (session_id) {
                var data = {
                    filename: resp.url,
                    file_type: 'photo',
                    proctor: session_id
                };
                ProctorRecord.create(data).then(function() {
                    return res.json(201, { status: 'success' });
                }).catch(function(err) {
                    sails.log.error(err);
                    return res.json(400, { status: 'error', message: err });
                });
            }
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        }).catch(err => {
            //console.log(err);
            return res.json(400, { status: 'error', message: err });
        });
    },
    
    getAptitudeTestResults: function(req, res) {
        let job_id = req.param('job_id');
        let start = req.param('start');
        let rows = req.param('length');
        let draw = req.param('draw');
        let search = req.param('search').value;

        switch (req.param('mode')) {
            case 'job_applicants':
                if (req.param('job_id') && !isNaN(job_id)) {
                    if (search && search.length > 2) {
                        let sql = "SELECT DISTINCT u.id FROM application ap JOIN user u ON u.id = ap.applicant WHERE job = ? AND fullname LIKE ? OR email LIKE ? ";
                        Application.query(sql, [ job_id, search + '%', search + '%' ], function(err, result) {
                            if (err) {
                                console.log(err);
                            }
                            let applicants = [];
                            result.forEach(function(row) {
                                applicants.push(row.id);
                            });
                            GQTestService.fetchAllCandidatesAptitudeTestResult(applicants, start, rows).then(function(candidates) {
                                return res.json(200, { status: 'success', draw: draw, recordsTotal: candidates.num, recordsFiltered: candidates.num, data: candidates });
                            })
                            .catch(function(err) {
                                return json(400, { status: 'error', message: err });
                            });
                        });
                    } else {
                        Application.find({ job: job_id }).exec(function(err, applicants) {
                            if (err) {
                                return res.json(400, { status: 'error', message: err });
                            }
                            let candidatesIds = [];
                            applicants.forEach(function (applicant) {
                                if (applicant.applicant) {
                                    candidatesIds.push(applicant.applicant);
                                }
                            });
                            GQTestService.fetchAllCandidatesAptitudeTestResult(candidatesIds, start, rows).then(function(candidates) {
                                return res.json(200, { status: 'success', draw: draw, recordsTotal: candidates.num, recordsFiltered: candidates.num, data: candidates });
                            })
                            .catch(function(err) {
                                return json(400, { status: 'error', message: err });
                            });
                        });
                    }
                } else {
                    return res.json(404, { status: 'error', message: 'job_id must be numeric' });
                }
                break;
            default:    
                break;    
        }
    }
};
