/**
 * GQTestController
 *
 * @description :: Server-side logic for managing Gqtests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	manageTest: function(req, res) {
        GQTest.find().populate('questions').sort({createdAt: 'desc'}).exec(function(err, tests) {
            if (err) return res.badRequest(err);
            return res.view('gqtest/manage-tests', { tests: tests });
        });
    },

    createTestPage: function(req, res) {
        return res.view('gqtest/createnew');
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
                if (err) return res.json(200, { status: 'error', msg: err });

                return res.json(200, { status: 'success' });
            });
        }
    },

    uploadQuestions: function(req, res) {
        GQTestService.extractTestQuestionsFromExcel(req.file('xslx_questions'), req.param('test_id'));
        return res.ok();
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
            GQTestService.addImageToQuestion(req.file('question_image'), req.param('image_file')).then(function(resp) {
                data.image_file = resp;
                GQTestQuestions.update({ id: req.param('question_id') }, data).exec(function (err, quest) {
                    if (err) return res.json(200, {status: 'error', msg: err});
                    return res.json(200, {status: 'success'});
                });
            }).catch(function(err) {
                if (err) return res.json(200, { status: 'error', 'msg': err });
            });
        } else {
            GQTestQuestions.create(data).exec(function (err, quest) {
                if (err) return res.json(200, {status: 'error', msg: err});
                GQTestService.addImageToQuestion(req.file('question_image'), req.param('image_file')).then(function(resp) {
                    GQTestQuestions.update({ id: quest.id }, { image_file: resp }).exec(function() {});
                    return res.json(200, {status: 'success'});
                }).catch(function(err) {
                    if (err) return res.json(200, { status: 'error', 'msg': err });
                });;
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

    getTest: function(req, res) {
        var test_id = req.param('test_id');

        GQTestResult.find({
            test: test_id,
            candidate: req.session.userId
        }).populate('test').exec(function (err, test_result) {
            if (err) console.log(err)
            if (test_result.length > 0) {
                GQTestService.prepareCandidateResult(test_id, test_result[0].score, test_result[0].no_of_questions).then(function (result) {
                    return res.view('gqtest/gqtest', { result: result, test_id: test_id, test: test_result });
                });
            } else {
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
                    //console.log(test);
                    return res.json(200, {
                        status: 'success',
                        test_id: test[0].id,
                        test_name: test[0].test_name,
                        instructions: test[0].instructions
                    });
                });
            });
        } else {
            GQTest.find({id: test_id}).exec(function (err, test) {
                if (err) return console.log(err);
                return res.json(200, {
                    status: 'success',
                    test_id: test[0].id,
                    test_name: test[0].test_name,
                    instructions: test[0].instructions
                });
            });
        }
    },

    loadTest: function(req, res) {
        var test_id = req.param('test_id');
        GQTest.find({ id: test_id }).populate('questions').exec(function(err, test) {
            if (err) return res.json(200, { status: 'error', msg: "Couldn't load test questions at this time" });
            req.session.suppliedAnswers = [];
            return res.json(200, {
                status: 'success',
                questions: test[0].questions,
                test_id: test[0].id,
                duration: test[0].duration
            });
        });
    },

    returnAnswer: function(req, res) {
        GQTestQuestions.find({ id: req.param('quest_id') }).exec(function(err, quest) {
            if (err) return;
            // check if a question has been answered earlier and discard the earlier answer
            req.session.suppliedAnswers = req.session.suppliedAnswers.filter(function(e) {
                return e.id !== req.param('quest_id');
            });
            req.session.suppliedAnswers.push({
                id: req.param('quest_id'),
                supplied_ans: req.param('answer'),
                correct_ans: quest[0].answer
            });
            return res.json(200, { status: 'success' });
        });
    },

    markTest: function(req, res) {
        var test_id = req.param('test_id');
        var no_of_questions = req.param('no_of_questions');
        var score = 0;

        req.session.suppliedAnswers.forEach(function(quest) {
            if (quest.supplied_ans === quest.correct_ans) {
                score++;
            }
        });
        
        // save or update candidate's test score
        CBTService.saveTestScore(test_id, score, no_of_questions, req.session.userId, req.session.proctor).then(function() {
            // destroy stored test answers
            req.session.suppliedAnswers = [];
            GQTestService.prepareCandidateResult(test_id, score, no_of_questions).then(function(resp) {
                return res.json(200, { status: 'success', result: resp });
            }).catch(function(err) {
                console.log(err)
            });
        });

        // end protor session for all tests except the three aptitude tests with ids (1,2,3)
        if ([1,2,3].indexOf(test_id) == -1) {
            req.session.proctor = false;
        }
    },

    markGQTest: function(req, res) {
        var test_id = req.param('test_id');
        var no_of_questions = req.param('no_of_questions');
        var score = 0;

        req.session.suppliedAnswers.forEach(function(quest) {
            if (quest.supplied_ans === quest.correct_ans) {
                score++;
            }
        });
        CBTService.saveTestScore(test_id, score, no_of_questions, req.session.userId, req.session.proctor).then(function() {
            CBTService.saveGeneralTestScore(req.session.userId).then(function(resp) {
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

        // end protor session
        req.session.proctor = false;
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
                            score: result.score,
                            percentage: percentage,
                            average_score: test_ave[0].score,
                            result: percentage > 59 ? 'Passed' : 'Failed',
                            test_date: result.updatedAt
                        });
                    });
                    return res.view('gqtest/view-results', {
                        results: test_results,
                        test: results[0].test,
                        candidate: results[0].candidate
                    });
                });
            } else {
                return res.json(200, { status: 'success', result: {} });
            }
        });
    },

    deleteTest: function(req, res) {
        if (req.session.admin === true) {
            GQTest.destroy({ id: req.param('quest_id') }).exec(function() {
                // handle questions
            });
        }
    },

    deleteQuestion: function(req, res) {
        if (req.session.admin === true) {
            GQTestQuestions.destroy({id: req.param('quest_id')}).exec(function () {});
            return res.ok();
        }
    },

    uploadProctorAudio: function(req, res) {
        var path = require('path').resolve(sails.config.appPath + '/assets/proctorFiles');
        var hr = process.hrtime();
        var filename = '/aud_' + hr[1] + '.wav';
        path += filename;
        var audio = req.param('data').split(';base64,').pop();

        var buff = new Buffer(audio, 'base64');
        const fs = require('fs');
        fs.writeFileSync(path, buff);
        //console.log('Audio ' + req.session.proctor)
        // save audio filename
        var data = {
            filename: filename,
            file_type: 'audio',
            proctor: req.session.proctor
        };
        ProctorRecord.create(data).exec(function() {});
        return res.ok()
    },

    uploadProctorPicture: function(req, res) {
        var path = require('path').resolve(sails.config.appPath + '/assets/proctorFiles');
        var hr = process.hrtime();
        var filename = '/pic_' + hr[1] + '.png';
        path += filename;
        var photo = req.param('imgBase64').split(';base64,').pop();
        var buff = new Buffer(photo, 'base64');
        const fs = require('fs');
        fs.writeFileSync(path, buff);
        //console.log('Video ' + req.session.proctor)

        // save photo filename
        var data = {
            filename: filename,
            file_type: 'photo',
            proctor: req.session.proctor
        };
        ProctorRecord.create(data).exec(function() {});
        return res.ok();
    }
};

