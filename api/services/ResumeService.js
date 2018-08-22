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
                    resume.educations.forEach(function(edu) {
                        if (edu.r_class)
                            edu.r_class = r_class.find(r_clas => r_clas.id == edu.r_class).name;
                        else
                            edu.r_class = 0;    
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
                    }).catch(function(err) {
                        return resolve({
                            resume: resume,
                            result: undefined
                        });
                    });
                });
        });
    },


    createNewResume: function(data) {
        return new Promise(function(resolve, reject) {
            // let's see if user already exist
            User.findOrCreate({ email: data.email }, { email: data.email, fullname: data.fullname, user_type: 'Applicant' }).exec(function(err, user) {
                if (err) return reject(err);
                // create resume
                Resume.findOrCreate({ email: data.email }, data).exec(function(err, resume) {
                    if (err) return reject(err);
                    var msg_type;
                    if (user.status == 'Inactive') {
                        msg_type = 'new-user';
                    } else if (resume.status == 'Complete') {
                        msg_type = 'fyi';
                    } else {
                        msg_type = 'incomplete-profile';
                    }
                    user.user_status = msg_type;
                    return resolve(user);
                });
            });
        });
    },


    fetchScrappedCV: function(user_id) {
        var request = require("request");
        var qs = require('querystring');

        var data = { user_id: user_id };
        var options = {
            method: "POST",
            url: "https://api.neon.ventures/cvextractor/api/?i=gq/cv/get",
            form: JSON.stringify({ "user_id": user_id }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        return new Promise(function(resolve, reject) {
            request(options, function(err, res, body) {
                if (err) {
                    return reject(err);
                }
                try {
                    var data = JSON.parse(body);
                    return resolve(data.data);
                } catch(err) {
                    reject(err.message);
                }
            });
        });
    }
}