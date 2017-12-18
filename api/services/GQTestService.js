module.exports = {
    extractTestQuestionsFromExcel: function(file_input, test_id) {
        var filename, testexcel = 'assets/testexcel/';
        file_input.upload({
            dirname: require('path').resolve(sails.config.appPath, testexcel),
            saveAs: function(file, cb) {
                var ext = file.filename.split('.').pop();
                filename = 'test_' + test.id + '.' + ext;
                return cb(null, filename);
            }
        },
        function(err, uploadedFile) {

        });
    },

    addImageToQuestion: function(image, current_img_name) {
        return new Promise(function(resolve, reject) {
            if (image) {
                var filename, hr = process.hrtime();
                var allowedImgTypes = ['image/jpg', 'image/jpeg'];
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
                        if (err) return err;
                        return resolve(filename);
                    });
            } else {
                return resolve('');
            }
        });
    },

    prepareCandidateResult: function(test_id, candidate_score, no_of_questions) {
        return new Promise(function(resolve, reject) {
            GQTestResult.find({test: test_id}).groupBy('test').average('score').exec(function(err, test_ave) {
                if (err) return reject(err);
                if (test_ave.length < 1) reject('No Result');
                var percentage = ((parseInt(candidate_score) / parseInt(no_of_questions)) * 100).toFixed(1);
                var result = {
                    score: candidate_score,
                    percentage: percentage,
                    average: test_ave[0].score,
                    result: percentage > 69 ? 'Passed' : 'Failed',
                    no_of_questions: no_of_questions
                };
                return resolve(result);
            });
        });
    }
}