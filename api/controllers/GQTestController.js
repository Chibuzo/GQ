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
                GQTestService.extractTestQuestionsFromExcel(req.file('excelsheet'), req.param('test_id'));
                return res.json(200, { status: 'success' });
            });
        } else {
            GQTest.create(data).exec(function(err, test) {
                if (err) return res.json(200, { status: 'error', msg: err });

                // check for questions in excelsheet
                GQTestService.extractTestQuestionsFromExcel(req.file('excelsheet'), test.id);
                return res.json(200, { status: 'success' });
            });
        }
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
            });
        } else {
            GQTestQuestions.create(data).exec(function (err, quest) {
                if (err) return res.json(200, {status: 'error', msg: err});
                GQTestService.addImageToQuestion(req.file('question_image'), req.param('image_file')).then(function(resp) {
                    GQTestQuestions.update({ id: quest.id }, { image_file: resp }).exec(function() {});
                    return res.json(200, {status: 'success'});
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
        GQTest.find({ id: test_id }).exec(function(err, test) {
            if (err) return console.log(err);
            console.log(test);
            return res.json(200, {status: 'success', test_name: test[0].test_name, instructions: test[0].instructions});
        });
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

    //loadTest: function(req, res) {
    //    var test_id = req.param('test_id');
    //    GQTest.find({ id: test_id }).populate('questions').exec(function(err, test) {
    //        if (err) return res.json(200, { status: 'error', msg: "Couldn't load test questions at this time" });
    //        req.session.suppliedAnswers = [];
    //        return res.json(200, {
    //            status: 'success',
    //            questions: test[0].questions,
    //            test_id: test[0].id,
    //            duration: test[0].duration
    //        });
    //    });
    //},

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
        // update resume if it's GQ General aptitude test
        Resume.update({ user: req.session.userId }, { test_status: 'true' }).exec(function() {});
        
        // save or update candidate's test score
        GQTestResult.find({ candidate: req.session.userId, test: test_id }).exec(function(err, test_result) {
            if (err) return console.log(err);
            if (test_result.length > 0) {
                GQTestResult.update({ id: test_result[0].id }, { score: score }).exec(function() {
                    GQTestService.prepareCandidateResult(test_id, score, no_of_questions).then(function(resp) {
                        return res.json(200, { status: 'success', result: resp });
                    });
                });
            } else {
                var data = {
                    test: test_id,
                    candidate: req.session.userId,
                    score: score,
                    no_of_questions: no_of_questions,
                    result: 'Passed'
                };
                GQTestResult.create(data).exec(function(err) {
                    GQTestService.prepareCandidateResult(test_id, score, no_of_questions).then(function(resp) {
                        return res.json(200, { status: 'success', result: resp });
                    });
                });
            }
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
                            score: result.score,
                            percentage: percentage,
                            average_score: test_ave[0].score,
                            result: percentage > 69 ? 'Passed' : 'Failed',
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
        GQTestQuestions.destroy({ id: req.param('quest_id') }).exec(function() {});
    }
};

