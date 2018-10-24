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


    createNewResume: function(data, password = undefined) {
        return new Promise(function(resolve, reject) {
            // let's see if user already exist
            let user_data = { 
                email: data.email, 
                fullname: data.fullname, 
                user_type: 'Applicant',
            };
            if (password !== undefined) {
                user_data.password = password;
            };
            User.findOrCreate({ email: data.email }, user_data).exec(function(err, user) {
                if (err) return reject(err);
                // create resume
                data.user = user.id;

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
                    user.resume_id = resume.id;
                    return resolve(user);
                });
            });
        });
    },


    fetchScrappedCV: function(user_id) {
        const request = require("request");
        //var qs = require('querystring');

        //var data = { user_id: user_id };
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
    },

    sendShortForm: function(data) {
        const request = require("request");
        //var qs = require('querystring');

        //var data = { user_id: user_id };
        var options = {
            method: "POST",
            url: "https://api.neon.ventures/cvextractor/api/?i=gq/cv/get",
            form: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        // return new Promise(function(resolve, reject) {
        //     request(options, function(err, res, body) {
        //         if (err) {
        //             return reject(err);
        //         }
        //         // we are done
        //         return resolve(true);
        //         // try {
        //         //     var data = JSON.parse(body);
        //         //     return resolve(data.data);
        //         // } catch(err) {
        //         //     reject(err.message);
        //         // }
        //     });
        // });
    },


    saveEducation: function(institution, honour, r_class, programme, start_date, end_date, resume_id) {
        if (!institution || institution.length < 1) return;
        let education = {
            institution: institution,
            honour: honour,
            r_class: r_class,
            programme: programme,
            start_date: start_date ? new Date(Date.parse(start_date)).toISOString() : new Date().toISOString(),
            end_date: end_date ?  new Date(Date.parse(end_date)).toISOString(): new Date().toISOString(),
            resume: resume_id
        };
        Education.create(education).exec(function (err) {
            if (err) console.log('couldnt add educations for: ' + resume_id);
        });
    },

    saveQualification: function(qualification, institution, date_obtained, resume_id) {
        if (!qualification || qualification.length < 1) return;
        let data = {
            qualification: qualification,
            institution: institution,
            date_obtained: date_obtained ? new Date(Date.parse(date_obtained)).toISOString() : new Date().toISOString(),
            resume: resume_id
        };
        Qualification.create(data).exec(function(err) {
            if (err) console.log('couldnt add qualifications for: ' + resume_id);
        });
    },

    saveEmploymentHistory: function(company, role, location, duties, start_date, end_date, resume_id) {
        var data = {
            company: company,
            role: role,
            location: location,
            duties: duties,
            start_date: start_date ? new Date(Date.parse(start_date)).toISOString() : new Date().toISOString(),
            end_date: end_date ? new Date(Date.parse(end_date)).toISOString() : new Date().toISOString(),
            resume: resume_id
        };
        Employment.create(data).exec(function(err) {
            if (err) console.log('couldnt add employments for: ' + resume_id);
        });
    },

    saveReferee: function(name, company, job_title, email, phone, resume_id) {
        var reference = {
            name: name,
            company: company,
            job_title: job_title,
            email: email,
            phone: phone,
            resume: resume_id
        };
        ReferenceContact.create(reference).exec(function(err) {
            if (err) console.log('couldnt add reference for: ' + resume_id);
        });
    }
}