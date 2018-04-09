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
            if (!jobtest) { // use only GQ aptitude test
                // get the average integrity score for the 3 proctor sessions
                var gq_results = [];
                var aptitude_test_results = []; // for computing aptitude test ranking
                async.eachSeries(candidates, function(candidate_id, cb) {
                    // get their BEST aptitude test score
                    GQAptitudeTestResult.find({user: candidate_id}).populate('user').sort('score desc').limit(1).exec(function (err, apt_score) {
                        try {
                            var percentage = ((apt_score[0].score / 60) * 100).toFixed(1);
                            aptitude_test_results.push(apt_score[0].score);
                            gq_results.push({
                                test_id: apt_score[0].id,
                                applicant: apt_score[0].user,
                                score: 'NA',
                                percentage: 'NA',
                                percentile: '-',
                                test_result: percentage > 59 ? 'Passed' : 'Failed',
                                composite_score: 'NA',
                                //aptitude_test: apt_score.length > 0 ? apt_score[0].score : '-',
                                //integrity_score: result.proctor.integrity_score,
                                //proctor_status: result.proctor.status,
                                proctor_id: 0,
                                createdAt: apt_score[0].createdAt
                            });
                            cb();
                        } catch(err) {
                            cb(err);
                            return reject(err);
                        }
                    });
                }, function(err) {
                    if (err) return reject(err);
                    gq_results.aptitude_scores = aptitude_test_results.sort(function(a, b) { return a - b; });
                    return resolve(gq_results);
                });
            } else if (jobtest.test_source == 'gq') {
                GQTestResult.find({ test: jobtest.gq_test, candidate: candidates }).populate('candidate').populate('proctor').sort('score desc').exec(function(err, results) {
                    if (results.length > 0) {
                        module.exports.processJobResult(results).then(function(_results) {
                            resolve(_results);
                        }).catch(function(err) {
                            return reject('Something went wrong. Please try again');
                        });
                    } else {
                        return resolve([]);
                    }
                });
            } else if (jobtest.test_source == 'expertrating') {
                TestResult.find({ test_id: jobtest.test.test_id, applicant: candidates }).populate('applicant').exec(function(err, results) {
                    if (results.length > 0) {
                        module.exports.processJobResult(results).then(function(_results) {
                            resolve(_results);
                        }).catch(function(err) {
                            return reject('Something went wrong. Please try again');
                        });
                    } else {
                        return resolve([]);
                    }
                });
            }
        });
    },

    processJobResult: function(results) {
        return new Promise(function(resolve, reject) {
            var gq_results = [];
            var aptitude_test_results = []; // for computing aptitude test ranking
            async.eachSeries(results, function(result, cb) {
                // get their BEST aptitude test score
                GQAptitudeTestResult.find({ user: result.candidate.id }).sort('score desc').limit(1).exec(function(err, apt_score) {
                    var percentage = ((parseInt(result.score) / parseInt(result.no_of_questions)) * 100).toFixed(1);
                    // if the job has a competency test, compute the two, else use only aptitude test score
                    var composite_score;
                    if (result.score) {
                        composite_score = ((apt_score[0].score / 2) + (result.score / 2)).toFixed(1);
                        aptitude_test_results.push(composite_score);
                    } else {
                        composite_score = apt_score[0].score;
                        aptitude_test_results.push(apt_score[0].score);
                    }
                    gq_results.push({
                        test_id: result.id,
                        applicant: result.candidate,
                        score: result.score ? result.score : 'NA',
                        percentage: percentage,
                        percentile: '-',
                        test_result: percentage > 59 ? 'Passed' : 'Failed',
                        composite_score: composite_score,
                        //aptitude_test: apt_score.length > 0 ? apt_score[0].score : '-',
                        integrity_score: result.proctor.integrity_score,
                        proctor_status: result.proctor.status,
                        proctor_id: result.proctor.id,
                        createdAt: result.createdAt
                    });
                    cb();
                });
            }, function() {
                gq_results.aptitude_scores = aptitude_test_results.sort(function(a, b) { return a - b });
                return resolve(gq_results);
            });
        });
    },

    saveTestScore: function(test_id, score, no_of_questions, candidate_id, proctor_session) {
        return new Promise(function(resolve, reject) {
            GQTestResult.find({ candidate: candidate_id, test: test_id }).exec(function(err, test_result) {
                if (err) return console.log(err);
                if (test_result.length > 0) {
                    GQTestResult.update({id: test_result[0].id}, {
                        score: score,
                        no_of_questions: no_of_questions,
                        proctor: proctor_session
                    }).exec(function () {
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

    saveGeneralTestScore: function(candidate) {
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
                    if (result.length > 0) {
                        GQAptitudeTestResult.update({user: candidate}, { score: scores[0].score }).exec(function (err, res) {
                            // handle errors if you like
                            return resolve(true); // 13/02/2018
                        });
                    } else {
                        GQAptitudeTestResult.create(data).exec(function (e, nc) {
                            return resolve(true);
                        });
                    }
                });
            });
        });
    },

    // GQ aptitude test result for a candidate [ Resume Page ]
    candidateGeneralTestResult: function(candidate_id) {
        return new Promise(function(resolve, reject) {
            GQAptitudeTestResult.find({ user: candidate_id }).populate('user').exec(function(err, candidate_score) {
                if (candidate_score.length < 1) {
                    return resolve(false);
                }
                GQAptitudeTestResult.find().sort('score desc').groupBy('score').sum('score').exec(function(err, result) {
                    GQTestResult.find({ test: [1,2,3], candidate: candidate_id }).sort('test asc').populate('candidate').populate('proctor').exec(function(err, tests) {
                        var c_score = candidate_score[0];
                        c_score.percentage = ((c_score.score / 60) * 100).toFixed(1);
                        c_score.rank = result.map(function (e) { return e.score; }).indexOf(candidate_score[0].score) + 1;
                        c_score.candidates = result.length;
                        c_score.general_ability = tests[0].score;
                        c_score.general_percentage = ((tests[0].score / tests[0].no_of_questions) * 100).toFixed(1);
                        //c_score.general_rank =
                        c_score.verbal = tests[1].score;
                        c_score.verbal_percentage = ((tests[1].score / tests[1].no_of_questions) * 100).toFixed(1);
                        c_score.maths = tests[2].score;
                        c_score.maths_percentage = ((tests[2].score / tests[2].no_of_questions) * 100).toFixed(1);
                        return resolve(c_score);
                    });
                });
            });
        });
    },


    cancelGQApptitudeTest: function(userId) {
        return GQAptitudeTestResult.destroy({user: userId}).then(function() {
            return GQTestResult.destroy({candidate: userId}).then(function(destroyedRecords) {

                let proctorSessionIds = destroyedRecords.map(function(gqTestResult) {
                    return gqTestResult.proctor;
                });

                let destorySessionPromise = ProctorSession.destroy({id: proctorSessionIds}).then(function() {
                    return Promise.resolve();
                }).catch(err => {
                    console.err(err);
                    return Promise.reject(err);
                });

                let deleteProctorPromises = [];

                deleteProctorPromises.push(destorySessionPromise);

                proctorSessionIds.forEach(function(proctorSessionId) {
                    deleteProctorPromises.push(ProctorService.deleteProctorFiles(proctorSessionId));
                });
                return Promise.all(deleteProctorPromises);
            });
        });
    }
}