module.exports = {
    saveTest: function (tests) {
        var n = 0;
        tests.records.forEach(function(test) {
            TestCategory.findOrCreate({ category: test.category }, { category: test.category }).exec(function(err, cat) {
                if (err) return console.log(err);

                var data = {
                    test_id: test.test_id,
                    test_name: test.test_name,
                    coverage: test.coverage,
                    total_questions: test.total_questions,
                    duration: test.duration,
                    pass_mark: test.passing_marks,
                    category: cat.id
                };
                CBTTest.create(data).exec(function (err) {
                    //console.log(err);
                });
            });
        });
    },

    getJobTestResults: function(candidates, jobtest) {
        return new Promise(function(resolve, reject) {
            if (jobtest.test_source == 'gq') {
                GQTestResult.find({ test: jobtest.gq_test, candidate: candidates }).populate('candidate').populate('proctor').sort('score desc').exec(function(err, results) {
                    var gq_results = [];
                    if (results.length > 0) {
                        async.eachSeries(results, function(result, cb) {
                            GQTestService.prepareCandidateResult(jobtest.gq_test, result.score, result.no_of_questions).then(function (rsult) {
                                // get their BEST aptitude test score
                                GQAptitudeTestResult.find({ user: result.candidate.id }).sort('score desc').limit(0).exec(function(err, apt_score) {
                                    //rsult.test_title = test.test.test_name;
                                    gq_results.push({
                                        test_id: result.id,
                                        applicant: result.candidate,
                                        score: result.score,
                                        percentage: rsult.percentage,
                                        percentile: '-',
                                        //average_score: rsult.average,
                                        test_result: rsult.result,
                                        aptitude_test: apt_score.length > 0 ? apt_score[0].score : '-',
                                        integrity_score: result.proctor.integrity_score,
                                        proctor_status: result.proctor.status,
                                        proctor_id: result.proctor.id,
                                        createdAt: result.createdAt
                                    });
                                    cb();
                                });
                            }).catch(function (err) {
                                console.log(err);
                                cb(err);
                            });
                            return resolve(gq_results);
                        });
                    } else {
                        return resolve([]);
                    }
                });
            } else {
                TestResult.find({ test_id: jobtest.test.test_id, applicant: candidates }).populate('applicant').exec(function(err, results) {
                    return resolve(results);
                });
            }
        });
    },

    saveTestScore: function(test_id, score, no_of_questions, candidate_id, proctor_session) {
        return new Promise(function(resolve, reject) {
            GQTestResult.find({ candidate: candidate_id, test: test_id }).exec(function(err, test_result) {
                if (err) return console.log(err);
                if (test_result.length > 0) {
                    GQTestResult.update({ id: test_result[0].id }, { score: score, proctor: proctor_session }).exec(function() {
                        return resolve(true);
                    });
                } else {
                    var data = {
                        test: test_id,
                        candidate: candidate_id,
                        score: score,
                        no_of_questions: no_of_questions,
                        result: 'Passed', // requires some logic
                        proctor: proctor_session
                    };
                    GQTestResult.create(data).exec(function(err) {
                        return resolve(true);
                    });
                }
            });
        });
    },

    saveGeneralTestScore: function(candidate, score) {
        return new Promise(function(resolve, reject) {
            GQTestResult.find({
                candidate: candidate,
                test: [1, 2, 3]
            }).sum('score').groupBy('candidate').exec(function (err, scores) {
                var data = {
                    score: scores[0].score,
                    user: candidate
                };
                GQAptitudeTestResult.find({user: candidate}).exec(function (err, result) {
                    //console.log(result)
                    if (result.length > 0) {
                        GQAptitudeTestResult.update({user: candidate}, { score: scores[0].score }).exec(function () {
                            // hand errors if you like
                            return resolve(true); // 13/02/2018
                        });
                    } else {
                        GQAptitudeTestResult.create({user: candidate}, data).exec(function (e) {
                            return resolve(true); //
                        });
                    }
                });
            });
        });
    },

    candidateGeneralTestResult: function(candidate_id) {
        return new Promise(function(resolve, reject) {
        GQAptitudeTestResult.find({ user: candidate_id }).populate('user').exec(function(err, candidate_score) {
                if (candidate_score.length < 1) {
                    //return reject("Candidate doesn't have result"); // I'm not sure why this may ever happen
                    return resolve(false);
                }
                GQAptitudeTestResult.find().sort('score desc').groupBy('score').sum('score').exec(function(err, result) {
                    var c_score = candidate_score[0];
                    c_score.percentage = ((c_score.score / 60) * 100).toFixed(1);
                    c_score.rank = result.map(function(e) { return e.score; }).indexOf(candidate_score[0].score) + 1;
                    c_score.candidates = result.length;
                    return resolve(c_score);
                });
            });
        });
    }
}