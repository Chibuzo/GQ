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
                GQTestResult.find({ test: jobtest.gq_test, candidate: candidates }).populate('candidate').exec(function(err, results) {
                    var gq_results = [];
                    //console.log(results);
                    if (results.length > 0) {
                        async.eachSeries(results, function(result, cb) {
                            GQTestService.prepareCandidateResult(jobtest.gq_test, result.score, result.no_of_questions).then(function (rsult) {
                                //rsult.test_title = test.test.test_name;
                                gq_results.push({
                                    applicant: result.candidate,
                                    percentage: rsult.percentage,
                                    percentile: '-',
                                    average_score: rsult.average,
                                    test_result: rsult.result,
                                    createdAt: result.createdAt
                                });
                                cb();
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

    candidateTestResult: function(candidate_id, test) {
        return new Promise(function(resolve, reject) {
            GQTestResult.find({ test: test.id, candidate: candidate_id }).populate('candidate').exec(function(err, candidate_result) {
                GQTestResult.find({ test: test.id }).sort({'score desc'}).groupBy('score').exec(function(err, result) {
                    var result = candidate_result[0];
                    var result.rank = result.indexOf(candidate_result[0].score);
                    return resolve(result);
                });
            });
        });
    }
}