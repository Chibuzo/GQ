module.exports = {
    saveTest: function (tests) {
        async.eachSeries(tests.records, function(test, cb) {
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
                    console.log(err);
                    cb();
                });
            });
        }, function(err) {
            if (err) console.log(err);
        });
    },

    getJobTestResults: function(candidates, jobtest, req_gq_test = true) {
        return new Promise(function(resolve, reject) {
            let gq_results = [];
            let aptitude_test_results = [], test_date;
            let composite_score = 0;
            let integrity_score = proctor_id = proctor_status = 'NA';

            async.eachSeries(candidates, async function(candidate, cb) {
                let gqTestResults = [];
                let gq_percentage = 'NA', gq_score = 0;
                if (req_gq_test) {
                    gqTestResults = await GQTestResult.find({test: [1, 2, 3], candidate: candidate.uid});
                    
                    // lets make sure this candidate has completed the 3 tests. Yeah because we may manually reset one score without removing the total score from GQAptitudeTestResult table
                    if (gqTestResults.length < 3 && !jobtest) return cb();

                    let total_num_questions = 0;
                    gqTestResults.forEach(function (test) {
                        total_num_questions += parseInt(test.no_of_questions);
                        gq_score += parseInt(test.score);
                    });
                    composite_score = gq_percentage = ((gq_score / parseInt(total_num_questions)) * 100).toFixed(1);
                    aptitude_test_results.push(gq_score);
                    //test_date = gqTestResults[3].createdAt;
                }

                let test_result;
                let job_percentage = 'NA', test_id = false;
                if (jobtest) {
                    if (jobtest.test_source == 'gq') {
                        test_result = await GQTestResult.findOne({ test: jobtest.gq_test, candidate: candidate.uid }).populate('proctor');
                    } else {
                        test_result = await TestResult.findOne({ test_id: jobtest.test.test_id, applicant: candidate.uid }).populate('proctor');
                    }
                    // ALERT: necessary evil
                    // test_result can come from one of two tables (testresult or gqtestresult)
                    // testresult has percentage field, gqtestresult does not
                    if (test_result) {
                        job_percentage = test_result.percentage || test_result.transcript_id ? parseInt(test_result.percentage) : ((parseInt(test_result.score) / parseInt(test_result.no_of_questions)) * 100).toFixed(1);
                        composite_score = req_gq_test ? (job_percentage / 2) + (gq_percentage / 2) : job_percentage;
                    } else {
                        // candidate hasn't taken competency test, continue with the next candidate
                        return cb();
                    }

                    // proctor details
                    if (test_result.proctor) {
                        integrity_score = test_result.proctor.integrity_score;
                        proctor_id = test_result.proctor.id;
                        proctor_status = test_result.proctor.status;
                    }

                    test_id = test_result.test;
                    //test_date = test_result.createdAt;
                }

                gq_results.push({
                    test_id: test_id || null,
                    applicant: { fullname: candidate.fullname, email: candidate.email, id: candidate.uid },
                    score: job_percentage,
                    percentage: gq_percentage,
                    test_result: composite_score > 59 ? 'Passed' : 'Failed',
                    composite_score: composite_score,
                    job_score: true,
                    aptitude_test: gq_score,
                    integrity_score: integrity_score,
                    proctor_status: proctor_status,
                    proctor_id: proctor_id,
                    //createdAt: test_date
                });
                cb();
            }, function(err) {
                if (err) return reject(err);
                gq_results.aptitude_scores = aptitude_test_results.sort(function(a, b) { return a - b; });
                return resolve(gq_results);
            });
        });
    },

    // processJobResult: function(results) {
    //     return new Promise(function(resolve, reject) {
    //         var gq_results = [];
    //         var aptitude_test_results = []; // for computing aptitude test ranking
    //         async.eachSeries(results, function(result, cb) {
    //             // get their BEST aptitude test score
    //             GQAptitudeTestResult.find({ user: result.candidate.id }).sort('score desc').limit(1).exec(function(err, apt_score) {
    //             GQTestResult.find({ test: [1, 2, 3], candidate: candidate.uid }).exec(function (err1, gqTestResults) {                    
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //                 // for jobs that require GQ Aptitude test
    //                 if (apt_score.length > 0) {
    //                     let percentage = ((parseInt(result.score) / parseInt(result.no_of_questions)) * 100).toFixed(1);
    //                     let gq_score =  ((apt_score[0].score / 60) * 100).toFixed(1);
    //                     // if the job has a competency test, compute the two, else use only aptitude test score

    //                     // if (result.score) {
    //                     //     composite_score = (gq_score / 2) + (percentage / 2);
    //                     //     aptitude_test_results.push(composite_score);
    //                     // } else {
    //                     //     composite_score = apt_score[0].score;
    //                     //     aptitude_test_results.push(apt_score[0].score);
    //                     // }
    //                     let composite_score = (gq_score / 2) + (percentage / 2);
    //                     aptitude_test_results.push(composite_score);

    //                     gq_results.push({
    //                         test_id: result.id,
    //                         applicant: result.candidate,
    //                         job_score: result.score ? percentage : 'NA', // condition not really required
    //                         percentage: gq_score,
    //                         percentile: '-',
    //                         test_result: percentage > 59 ? 'Passed' : 'Failed',
    //                         composite_score: composite_score,
    //                         aptitude_test: apt_score.length > 0 ? apt_score[0].score : '-',
    //                         integrity_score: result.proctor.integrity_score,
    //                         proctor_status: result.proctor.status,
    //                         proctor_id: result.proctor.id,
    //                         createdAt: result.createdAt
    //                     });
    //                     cb();
    //                 } else {
    //                     cb();
    //                 }
    //             });
    //         }, function() {
    //             gq_results.aptitude_scores = aptitude_test_results.sort(function(a, b) { return a - b });
    //             return resolve(gq_results);
    //         });
    //     });
    //},

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
            GQTestResult.find({ candidate: candidate }).exec(function(err, tests) {
                if (tests.length < 3) return resolve('On'); // still taking test

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
        });
    },

    // GQ aptitude test result for a candidate [ Resume Page ]
    candidateGeneralTestResult: function(candidate_id) {
        return new Promise(function(resolve, reject) {
            GQAptitudeTestResult.find({ user: candidate_id }).populate('user').exec(function(err, candidate_score) {
                if (candidate_score.length < 1) {
                    return resolve(false);
                }
                //GQAptitudeTestResult.find().sort('score desc').groupBy('score').sum('score').exec(function(err, result) {
                    GQTestResult.find({ test: [1,2,3], candidate: candidate_id }).populate('test').populate('proctor').exec(function(err, tests) {
                        if (tests[0] && tests[1] && tests[2]) {
                            var c_score = candidate_score[0];
                            c_score.total_num_questions = parseInt(tests[0].no_of_questions) + parseInt(tests[1].no_of_questions) + parseInt(tests[2].no_of_questions);
                            c_score.percentage = ((c_score.score / c_score.total_num_questions) * 100).toFixed(1);
                            //c_score.rank = result.map(function (e) { return e.score; }).indexOf(candidate_score[0].score) + 1;
                            // c_score.candidates = result.length;
                            c_score.general_ability_name = tests[0].test.test_name;
                            c_score.general_ability = tests[0].score;
                            c_score.general_percentage = ((tests[0].score / tests[0].no_of_questions) * 100).toFixed(1);
                            c_score.verbal_name = tests[1].test.test_name;
                            c_score.verbal = tests[1].score;
                            c_score.verbal_percentage = ((tests[1].score / tests[1].no_of_questions) * 100).toFixed(1);
                            c_score.maths_name = tests[2].test.test_name;
                            c_score.maths = tests[2] ? tests[2].score : 0;
                            c_score.maths_percentage = ((c_score.maths / tests[2].no_of_questions) * 100).toFixed(1);

                            return resolve(c_score);
                        } else {
                            // reset general score
                            GQAptitudeTestResult.destroy({ user: candidate_id }).exec(function() {
                                return module.exports.candidateGeneralTestResult(candidate_id);
                            });
                        }
                    });
                //});
            });
        });
    },


    cancelGQApptitudeTest: function(userId) {
        return Promise.all([
                GQAptitudeTestResult.destroy({user: userId}),
                GQTestResult.destroy({ candidate: userId, test: [1, 2, 3 ] }),
                Resume.update({user: userId}, {test_status: false, status: 'Incomplete'})
            ]).then(results => {
                let destroyedRecords = results[1];

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
            }).catch(err => {
                throw err;
            })
    }
}
