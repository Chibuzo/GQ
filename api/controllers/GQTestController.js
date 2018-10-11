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
        let user_id = req.param('user_id') || req.session.userId;
        if (isNaN(user_id)) {
            return res.json(400, { status: 'error', message: 'User ID must be a number' });
        }
        // dirty hack for resuming test that has sections. Currently, only applicable to GQ general test
        if (test_id == 1) {
            GQTestService.determineTestId(user_id).then(function (next_test) {
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
                    return res.json(404, { status: 'error', message: 'Test not found' });
                }
            });
        }
    },

    loadTest: function(req, res) {
        var test_id = req.param('test_id');
        GQTest.find({ id: test_id }).populate('questions').exec(function(err, gqtest) {
            if (err) return res.json(200, { status: 'error', message: "Couldn't load test questions at this time" });

            if (gqtest.length < 0) {
                return res.json(404, { status: 'error', message: 'Test not found' });
            }
            let questions = [];

            // exclude answer from questions
            gqtest[0].questions.forEach(function(quest) {
                questions.push({
                    id: quest.id,
                    question: quest.question,
                    image_file: quest.image_file,
                    opt_a: quest.opt_a,
                    opt_b: quest.opt_b,
                    opt_c: quest.opt_c,
                    opt_d: quest.opt_d,
                    opt_e: quest.opt_e
                });
            });
            return res.json(200, {
                status: 'success',
                questions: questions,
                test_id: gqtest[0].id,
                duration: gqtest[0].duration
            });
        });
    },

    saveTestState: function(req, res) {
        var q = req.param;
        let user_id = q('user_id') ? q('user_id') : req.session.userId;
        if (isNaN(user_id)) {
            return res.json(400, { status: 'error', message: 'User ID must be a number' });
        }
        var data = {
            candidate: user_id,
            test: q('test_id'),
            time_elapsed: q('current_time'),
            answered_questions: q('answered_questions') ? JSON.stringify(q('answered_questions')) : '',
            proctor_data: JSON.stringify(q('proctor_data')),
            proctor_session: q('proctor_session')
        };
        TestState.find({ candidate: user_id, test: q('test_id') }).exec(function(err, test) {
            if (err) {
                console.error(err);
            }
            if (test.length > 0) {
                TestState.update({ id: test[0].id }, data).exec(function() {});
            } else {
                TestState.create(data).exec(function() {});
            }
        });
        return res.json(200, { status: 'success' });
    },

    findSavedTest: function(req, res) {
        let user_id = req.session.userId ? req.session.userId : req.param('user_id');

        let sql = "SELECT answered_questions, time_elapsed, proctor_data, proctor_session FROM teststate WHERE candidate = ? AND test = ?";
        TestState.query(sql, [ user_id, req.param('test_id') ], function(err, old_test) {    
            if (err) {
                return res.json(400, { status: 'error', message: err });
            }
            GQTest.find({ id: req.param('test_id') }).populate('questions').exec(function(err, gqtest) {
                if (err) return res.json(200, { status: 'error', message: "Couldn't load test questions at this time" });
                let questions = [];
    
                // exclude answer from questions
                gqtest[0].questions.forEach(function(quest) {
                    questions.push({
                        id: quest.id,
                        question: quest.question,
                        image_file: quest.image_file,
                        opt_a: quest.opt_a,
                        opt_b: quest.opt_b,
                        opt_c: quest.opt_c,
                        opt_d: quest.opt_d,
                        opt_e: quest.opt_e
                    });
                });

                let prev_attempt = {}; 
                if (old_test.length > 0) {
                    prev_attempt = {
                        answered_questions: old_test[0].answered_questions,
                        time_elapsed: old_test[0].time_elapsed,
                        proctor_data: JSON.parse(old_test[0].proctor_data),
                        proctor_session: old_test[0].proctor_session
                    };
                }
                return res.json(200, { status: 'success', questions: questions, data: prev_attempt });
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
    // markGQTest: function(req, res) {
    //     var test_id = req.param('test_id');
    //     var no_of_questions = req.param('no_of_questions');
    //     var integrity_score = req.param('integrity_score');
    //     var userAnswers = req.param("userAnswers") || [];
    //     var invigilationTracking = req.param('invigilationTracking') || {};

    //     var score = 0;

    //     GQTestQuestions.find({test: test_id}).exec(function(err, questions) {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }

    //         userAnswers.forEach(function(userAnswer) {
    //             var question = _.find(questions, function(q) {
    //                 return q.id == userAnswer.quest_id;
    //             });

    //             if (!question) { // candidate didn't answer
    //                 console.error(`Coundn't find question for ${userAnswer.quest_id} in test: ${test_id}`);
    //                 return;
    //             }

    //             if (question.answer === userAnswer.ans) {
    //                 score++;
    //             }
    //         });

    //         // fall back for user who don't refresh their JS during this release
    //         if (_.isEmpty(invigilationTracking)) {
    //             invigilationTracking = {
    //                 noFace: -1,
    //                 noise: -1,
    //                 multipleFaces: -1
    //             };
    //         }

    //         // save integrity score
    //         ProctorSession.update({ id: req.session.proctor },
    //             {
    //                 integrity_score: integrity_score,
    //                 noFaceCount: invigilationTracking.noFace,
    //                 noiseCount: invigilationTracking.noise,
    //                 multipleFacesCount: invigilationTracking.multipleFaces
    //             }
    //         ).exec(function() {});

    //         CBTService.saveTestScore(test_id, score, no_of_questions, req.session.userId, req.session.proctor).then(function() {
    //             CBTService.saveGeneralTestScore(req.session.userId).then(function(resp) {
    //                 // end proctor session
    //                 req.session.proctor = false;

    //                 // update candidate's resume
    //                 Resume.update({user: req.session.userId}, {test_status: 'true'}).exec(function (err, resume) {
    //                     if (resume[0].status != 'Complete' && resume[0].video_status == true && resume[0].profile_status == true) {
    //                         Resume.update({ id: resume.id }, { status: 'Complete' }).exec(function () {});
    //                     }
    //                 });
    //                 CBTService.candidateGeneralTestResult(req.session.userId).then(function(result) {
    //                     return res.json(200, { status: 'success', result: result });
    //                 }).catch(function(err) {
    //                     console.log(err)
    //                 });
    //             }).catch(function(err) {
    //                 console.log(err)
    //             });
    //         }).catch(function(err) {
    //             console.log(err)
    //         });
    //     });
    // },

    markGQ: function(req, res) {
        let user_id = req.param('user_id') ? req.param('user_id') : req.session.userId;
        if (isNaN(user_id)) {
            return res.json(400, { status: 'error', message: 'User ID must be a number' });
        }
        let test_id = parseInt(req.param('test_id'));
        let no_of_questions = req.param('no_of_questions');
        let userAnswers = req.param("userAnswers") || [];
		let invigilationTracking = req.param('invigilationTracking') || {};
        let proctorSessId = req.param('proctor_session');

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
        ProctorSession.update({ id: proctorSessId },
            {
                integrity_score: invigilationTracking.integrityScore,
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
                return res.json(400, { status: 'error', message: err });
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
            CBTService.saveTestScore(test_id, score, no_of_questions, user_id, proctorSessId).then(function() {
                CBTService.saveGeneralTestScore(user_id).then(function(resp) {
                    var state = resp === true ? 'Done' : 'On';
                    if (test_id == 1) GeneralReportService.updateField('test_in_progress');
                    if (test_id == 3) {
                        // update candidate's resume
                        Resume.update({user: user_id}, {test_status: 'true'}).exec(function (err, resume) {
                            if (err) {
                                return res.json(400, { status: 'error', message: err });
                            }
                            if (resume.length < 1) {
                                return res.json(400, { status: 'error', message: 'Something unsual happened - User likely doesn\'t exist' });
                            }
                            if (resume[0].status != 'Complete' && resume[0].video_status == true && resume[0].profile_status == true) {
                                Resume.update({ id: resume.id }, { status: 'Complete' }).exec(function () {});
                            }
                        });
                        GeneralReportService.updateField('test');
                        GeneralReportService.updateField('test_in_progress', 'minus');
                    }
                    // clean up any saved test data
                    TestState.destroy({ candidate: user_id, test: test_id }).exec(function() {});
                    return res.json(200, { status: 'success', state: state });
                }).catch(function(err) {
                    console.log(err);
                    return res.json(200, { status: 'error', state: state });
                });
            }).catch(function(err) {
                console.error(err);
                return res.json(400, { status: 'error', message: err });
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

    showAptitudeTestResults: function(req, res) {
        return res.view('admin/testresult');
    },
    
    getAptitudeTestResults: function(req, res) {
        let start = req.param('start');
        let rows = req.param('length');
        let draw = req.param('draw');
        let search = req.param('search').value;
        let order_field = req.param('order')[0].column;
        let order_direction = req.param('order')[0].dir;

        switch (req.param('mode')) {
            case 'job_applicants':
                let job_id = req.param('job_id');
                if (job_id && !isNaN(job_id)) {
                    if (search && search.length > 2) {
                        let sql = "SELECT DISTINCT u.id FROM application ap JOIN user u ON u.id = ap.applicant WHERE job = ? AND fullname LIKE ? OR email LIKE ? AND job = ?";
                        Application.query(sql, [ job_id, search + '%', search + '%', job_id ], function(err, result) {
                            if (err) {
                                console.log(err);
                            }
                            let applicants = [];
                            result.forEach(function(row) {
                                applicants.push(row.id);
                            });
                            GQTestService.fetchAllCandidatesAptitudeTestResult(applicants, start, rows, 'job', order_field, order_direction).then(function(candidates) {
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
                            GQTestService.fetchAllCandidatesAptitudeTestResult(candidatesIds, start, rows, 'job', order_field, order_direction).then(function(candidates) {
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

            case 'all':
                if (search && search.length > 2) {
                    let sql = "SELECT id FROM user WHERE fullname LIKE ? OR email LIKE ?";
                    User.query(sql, [ search + '%', search + '%'], function(err, result) {
                        if (err) {
                            console.log(err);
                        }
                        let users = [];
                        result.forEach(function(row) {
                            users.push(row.id);
                        });
                        GQTestService.fetchAllCandidatesAptitudeTestResult(users, start, rows, 'all', order_field, order_direction).then(function(candidates) {
                            return res.json(200, { status: 'success', draw: draw, recordsTotal: candidates.num, recordsFiltered: candidates.num, data: candidates });
                        })
                        .catch(function(err) {
                            return json(400, { status: 'error', message: err });
                        });
                    });
                } else {
                    GQTestService.fetchAllCandidatesAptitudeTestResult(undefined, start, rows, 'all', order_field, order_direction).then(function(candidates) {
                        return res.json(200, { status: 'success', draw: draw, recordsTotal: candidates.num, recordsFiltered: candidates.num, data: candidates });
                    })
                    .catch(function(err) {
                        return json(400, { status: 'error', message: err });
                    });
                }
                break;

            default:    
                break;    
        }
    },

    fetchGQAptitudeTestResult: function(req, res) {
        this.fetchGQAptitudeTestResult.find({ user: req.param('user_id') }).exec(function(err, result) {
            if (err) {
                return res.json(400, { status: 'error', message: err });
            }
            return res.json(200, { status: 'success', data: resuilt });
        });
    },

    createToken: function(req, res) {
        User.find({ id: req.session.userId }).exec(function(err, user) {
            if (err) return res.redirect('/login'); // nigga fucking around - we don't play here

            if (user.length > 0) {
                const crypto = require('crypto');
                const secret = 'this is bullshit';
                const token = crypto.createHmac('sha256', secret).update(user[0].email).digest('hex');

                TestToken.destroy({ user_id: req.session.userId }).exec(function() {
                    TestToken.create({ token: token, user_id: user[0].id }).exec(function(err) {
                        if (err) return res.serverError(err);

                        return res.redirect('https://api.neon.ventures/gq/cbt/' + token);
                    });
                });
            }
            return res.ok();
        });
    },

    authencateExternalUser: function(req, res) {
        const token = req.param('token');

        TestToken.find({ token: token }).exec(function(err, tok) {
            if (err) return res.json(400, { status: 'error', message: err });

            if (tok.length > 0) {
                let t = new Date(tok[0].createdAt);
                t = t.setMinutes(t.getMinutes() + 60);
                if (new Date().getTime() > new Date(t).getTime()) {
                    return res.json(400, { status: 'error', message: 'Invalid token' });
                } else {
                    return res.json(200, { status: 'success', user_id: tok[0].user_id });
                }
            } else {
                return res.json(404, { status: 'error', message: 'Token not found' });
            }
        });
    }
};
