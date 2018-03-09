module.exports = {
    viewResume: function(resume_id) {
        return new Promise(function(resolve, reject) {
            var test_id = 1;
            Resume.findOne({ id: resume_id })
                .populate('user').populate('educations').populate('qualifications').populate('employments').populate('referencecontacts')
                .exec(function(err, resume) {
                    if (err) return;
                    // check for test result
                    CBTService.candidateGeneralTestResult(req.session.userId).then(function(result) {
                        var _result, test_title;
                        if (result) {
                            _result = result;
                            test_title = 'General Aptitude Test';
                        }
                        return resolve({
                            resume: resume,
                            result: result,
                            test_title: test_title
                        });
                    });
                    //GQTestResult.find({
                    //    test: test_id,
                    //    candidate: resume.user.id
                    //}).populate('test').exec(function (err, test_result) {
                    //    if (err) return reject(err);
                    //    if (test_result.length > 0) {
                    //        GQTestService.prepareCandidateResult(test_id, test_result[0].score, test_result[0].no_of_questions).then(function (result) {
                    //            //return res.view('applicant/viewresume'
                    //        });
                    //    } else {
                    //        return resolve({ resume: resume });
                    //        //return res.view('applicant/viewresume', { resume: resume });
                    //    }
                    //});
                });
        });
    }
}