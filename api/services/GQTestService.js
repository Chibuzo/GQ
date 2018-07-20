var Excel = require('exceljs');

module.exports = {
    extractTestQuestionsFromExcel: function(file_input, test_id) {
        var filename, testexcel = 'assets/testexcel/';
        file_input.upload({
            dirname: require('path').resolve(sails.config.appPath, testexcel),
            saveAs: function(file, cb) {
                var ext = file.filename.split('.').pop();
                filename = 'test_' + test_id + '.' + ext;
                return cb(null, filename);
            }
        },
        function(err, uploadedFile) {
            var workbook = new Excel.Workbook();
            workbook.xlsx.readFile(testexcel + filename)
                .then(function(d) {
                    // console.log('D:');
                    // console.log(d)
                    // use workbook
                    var sheet = workbook.getWorksheet(1);
                    for (i = 2; i < sheet.actualRowCount + 1; i++) {
                        var row = sheet.getRow(i);
                        //if (row.getCell('B').value) break;
                        var data = {
                            test: test_id,
                            question: row.getCell('B').value,
                            opt_a: row.getCell('C').value,
                            opt_b: row.getCell('D').value,
                            opt_c: row.getCell('E').value,
                            opt_d: row.getCell('F').value,
                            opt_e: row.getCell('G').value,
                            answer: row.getCell('H').value
                        };
                        GQTestQuestions.create(data).exec(function (err, quest) {});
                    }
                }).catch(function(err) {
                    console.log('Error!!!');
                    console.log(err);
                });
        });
    },

    addImageToQuestion: function(image, current_img_name) {
        return new Promise(function(resolve, reject) {
            if (image) {
                var filename, hr = process.hrtime();
                var allowedImgTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
                image.upload({
                    dirname: require('path').resolve(sails.config.appPath, 'assets/cbt-images/'),
                    saveAs: function(file, cb) {
                        if (allowedImgTypes.indexOf(file.headers['content-type']) === -1) {
                            return cb('Unsupported picture format.');
                        }
                        if (current_img_name) {
                            filename = current_img_name;
                        } else {
                            var ext = file.filename.split('.').pop();
                            filename = hr[1] + '.' + ext;
                        }
                        return cb(null, filename);
                    },
                    maxBytes: 100 * 1024 * 1024
                },
                function(err) {
                    if (err) return reject(err);
                    return resolve(filename);
                });
            } else {
                return reject('This is not supposed to happen');
            }
        });
    },

    // for GQ aptitude test
    // if a candidate has taken part of the test, continue from where the candidate stopped
    determineTestId: function(candidate_id) {
        return new Promise(function(resolve, reject) {
            // look for test result
            var tests_taken = []
            GQTestResult.find({ candidate: candidate_id, test: [1,2,3] }).exec(function(err, tests) {
                var _tests = [];
                if (tests.length == 0) {
                    return resolve(1);
                } else {
                    tests.forEach(function(test) {
                        _tests.push(test.test);
                    });
                    var next = _.difference([1,2,3], _tests);
                    next.sort(function(a, b) { return a - b; });
                    return resolve(next[0]);
                }
                //     if (tests[0].test < 3)
                //         return resolve(tests[0].test + 1);
                //     else // its 3 return 1
                //         return resolve(1);
                // } else {
                   
                // }
            });
        });
    },

    prepareCandidateResult: function(test_id, candidate_score, no_of_questions) {
        return new Promise(function(resolve, reject) {
            GQTestResult.find({test: test_id}).groupBy('test').average('score').exec(function(err, test_ave) {
                if (err) return reject(err);
                if (test_ave.length < 1) reject('No Result');
                var percentage = ((parseInt(candidate_score) / parseInt(no_of_questions)) * 100).toFixed(1);
                var result = {
                    score: candidate_score, // really don't need this
                    percentage: percentage,
                    average: test_ave[0].score,
                    result: percentage > 60 ? 'Passed' : 'Failed',
                    no_of_questions: no_of_questions
                };
                return resolve(result);
            });
        });
    },

    fetchAllCandidatesAptitudeTestResult: function(_candidates = undefined) {
        return new Promise(function(resolve, reject) {
            const candidates = [];
            const query = _candidates === undefined ? {}: {user: _candidates};
            GQAptitudeTestResult.find(query).sort('score desc').exec(function(err, apt_results) {
                var count = apt_results.length;
                var apt_scores = apt_results.map(function(e) { return e.score; });
                apt_scores = Array.from(new Set(apt_scores)); // remove duplicate scores
                async.eachSeries(apt_results, function(apt_result, cb) {
                    GQTestResult.find({ test: [1,2,3], candidate: apt_result.user }).sort('test asc').populate('candidate').populate('proctor').exec(function(err, tests) {
                        if (!tests[0] || tests.length < 3) return cb();
                    
                        let integrityScoreCumalative = _(tests).map(function(test) {
                            return test.proctor ? test.proctor.integrity_score : false;
                        })
                        .filter(function(integrityScore) {
                            return integrityScore !== false;
                        });
                        let integrityScore = integrityScoreCumalative.sum() / integrityScoreCumalative.value().length;
                        integrityScore = integrityScore.toFixed(1);

                        // Group together test information for each test
                        let generalAbilityTest = {
                            score: tests[0] ? ((tests[0].score / 20) * 100).toFixed(1) : -1,
                            proctorScore: _.get(tests, '[0].proctor.integrity_score', -1),
                            proctorId: _.get(tests, '[0].proctor.id', -1)
                        };

                        let verbalTest = {
                            score: tests[1] ? ((tests[1].score / 20) * 100).toFixed(1) : -1,
                            proctorScore: _.get(tests, '[1].proctor.integrity_score', -1),
                            proctorId: _.get(tests, '[1].proctor.id', -1)
                        };

                        let mathsTest = {
                            score: tests[2] ? ((tests[2].score / 20) * 100).toFixed(1) : -1,
                            proctorScore: _.get(tests, '[2].proctor.integrity_score', -1),
                            proctorId: _.get(tests, '[2].proctor.id', -1)
                        };

                        try {
                            candidates.push({
                                id: apt_result.user,
                                fullname: tests[0].candidate.fullname,
                                generalAbilityTest: generalAbilityTest,
                                verbalTest: verbalTest,
                                mathsTest: mathsTest,
                                test_date: apt_result.createdAt,
                                percentage: ((apt_result.score / 60) * 100).toFixed(1),
                                rank: apt_scores.indexOf(apt_result.score) + 1,
                                integrity_score: integrityScore,
                                status: apt_result.status
                            });
                            cb();
                        } catch (err) {
                            
                        }
                    });
                }, function(err) {
                    if (err) return reject(err);
                    candidates.num = count; // also return number of candidates that has taken the test
                    return resolve(candidates);
                });
            });
        });
    }
}
