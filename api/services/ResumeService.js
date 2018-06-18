module.exports = {
    viewResume: function(id, q = 'resume') {
        var criteria = q == 'resume' ? { id: id } : { user: id };
        return new Promise(function(resolve, reject) {
            var test_id = 1;
            Resume.findOne(criteria)
                .populate('user').populate('educations').populate('qualifications').populate('employments').populate('referencecontacts')
                .exec(function(err, resume) {
                    if (err) return;
                    let r_class = [
                        { name: "1st Class", id: 1 }, { name: "2nd Class Upper", id: 2 }, { name: "2nd Class Lower", id: 3 }, { name: "3rd Class", id: 4 }
                    ];
                    //var edu = [];
                    resume.educations.forEach(function(edu) {
                        edu.r_class = r_class.find(r_clas => r_clas.id == edu.r_class).name;
                    });
                    // check for test result
                    CBTService.candidateGeneralTestResult(resume.user.id).then(function(result) {
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
                });
        });
    }
}