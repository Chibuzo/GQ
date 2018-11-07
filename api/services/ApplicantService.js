function fetchNoTestsApplicants() {
    // Find all the applicants who have a photo and complete resume
    // Find all the applicants who have taken a GQ Test
    // Remove applicants who have taken a GQ Test from applicants with complete resume and photo

    return Promise.all([
        Resume.find({photo_status: true, profile_status: true}),
        GQTestResult.find({test: [1, 2, 3]})
    ]).then(results => {
        let userCompleteResumes = results[0];
        let usersWithTests = results[1];

       let testsByUsersId = _(usersWithTests).groupBy((test) => {
            return test.candidate;
        }).map((value, key) => {
            return parseInt(key)
        }).value();

        return _.filter(userCompleteResumes, (resume) => {
            return !testsByUsersId.includes(parseInt(resume.user))
        });
    })
}

function fetchSomeTestsApplicants() {
    // Find all the applicants who have taken test 1, 2, or 3
    // Group by Candidate
    // Remove candidates who have < 3 tests

    // let sql = "SELECT candidate FROM gqtestresult WHERE test IN (1,2,3) AND candidate <> ''";
    // return GQTestResult.query(sql, function(err, result) {
    //     console.log(result)
    // });
    return GQTestResult.find({test: [1, 2, 3]})
    .then(gqTestResults => {
        let usersWithTests = _.groupBy(gqTestResults, (testResult) => {
            return testResult.candidate;
        });

        let usersWithSomeTests = _.filter(usersWithTests, (tests, candidateId) => {
            return tests.length < 3;
        });

        let usersWithSomeTestsIds = _.map(usersWithSomeTests, (testsArr, candidateId) => {
            // just in case there by a result without a candidate
            var id = parseInt(testsArr[0].candidate);
            if (id > 0) return id;
        });
        //console.log(usersWithSomeTestsIds);

        return Resume.find({user: usersWithSomeTestsIds});
    });
}

function fetchCompleteTestsApplicants() {
    // Find all the applicants who have taken test 1, 2, or 3
    // Group by Candidate
    // Remove candidates who have < 3 tests

    return GQAptitudeTestResult.find()
    .then(gqAptitudeTestResults => {
        let userIds = _.map(gqAptitudeTestResults, (testResult) => {
            return testResult.user;
        });

        return Resume.find({user: userIds});
    })
}

function fetchJobApplicants() {
    return Application.find()
        .then(jobApplicants => {
            let userIds = jobApplicants.map(jobApplicant => {
                return jobApplicant.applicant;
            });

            return Resume.find({user: userIds})
        })
}

function fetchNoJobApplicants() {
    // Find all Candidates who have a complete profile (CV, Photo, Video, Test)
    // Find all the Candidates who have applied for a job
    // Difference of the two

    return Promise.all([
            Resume.find({status: 'Complete'}),
            Application.find()
        ]).then(results => {
            let resumes = results[0];
            let applicants = results[1];

            let applicantIds = _.map(applicants, applicant => {
                return parseInt(applicant.applicant);
            });

            return _.filter(resumes, resume => {
                return !_.includes(applicantIds, parseInt(resume.user));
            });
        })
}

module.exports = {
	getChecklistData: function(userId) {
		return new Promise(function(resolve, reject) {
			return Promise.all([
				Resume.findOne({user: userId}),
				Application.find({applicant: userId})
			]).then(results => {
				let userResume = results[0];
				let applications = results[1];

				let checklist = [];

                // Resume/CV
                if (userResume.source !== 'GJ') {
                    checklist.push({
                        title: 'Fill Out Resume/CV',
                        text: 'Your CV is the first chance you get to make a good impression on a potential employer.',
                        iconClass: userResume.profile_status == true ? 'fa fa-check-circle': 'fa fa-certificate',
                        action: '/applicant/resume-page#resume-tab',
                        completed: userResume.profile_status == true,
                        disbaledClass: ""
                    });
                }

				// Profile Picture
				checklist.push({
					title: 'Upload Profile Photo',
					text: 'Companies are much more likely to hire applicants with a quality profile picture.',
					iconClass: userResume.photo_status == true ? 'fa fa-check-circle': 'fa fa-user-circle',
					action: '/applicant/resume-page#photo',
					completed: userResume.photo_status == true,
					disbaledClass: userResume.profile_status == true ? '': 'disabled'
				});

				// Test
				let disabledTest = userResume.profile_status != true || userResume.photo_status != true;
				checklist.push({
					title: 'Take Aptitude Test',
					text: 'Aptitude tests afford companies an opportunity to make a more informed decision when it comes to hiring.',
					iconClass: userResume.test_status == true && userResume.photo_status == true ? 'fa fa-check-circle': 'fa fa-calculator',
					action: disabledTest ? "" : '/applicant/resume-page#test',
					completed: userResume.test_status == true && userResume.photo_status == true,
					disbaledClass: disabledTest ? "disabled" : ""
				});


				// Video Profile
				let disabledVideo = userResume.test_status != true || disabledTest;
				checklist.push({
					title: 'Upload Introduction Video',
					text: 'A video profile gives companies the ability to assess your professional presentation and demeanor.',
					iconClass: userResume.video_status == true && !disabledVideo ? 'fa fa-check-circle': 'fa fa-file-video-o',
					action: '/applicant/resume-page#video',
					completed: userResume.video_status == true && !disabledVideo,
					disbaledClass: disabledVideo ? "disabled" : ""
				});

                // Apply to a job
                if (userResume.source !== 'GJ') {
                    let disableJob = !userResume.video_status || disabledVideo || !userResume.profile_status;
                    checklist.push({
                        title: 'Apply to a Job',
                        text: 'Look through our job postings and apply.',
                        iconClass: applications.length > 0 && disableJob != true ? 'fa fa-check-circle': 'fa fa-briefcase',
                        action: applications.length < 1 && disableJob ? "" : '/jobs',
                        completed: applications.length > 0 && disableJob != true,
                        disbaledClass: disableJob ? "disabled" : ""
                    });
                }

				return resolve(checklist);
			}).catch(err => {
				console.error(err);
				reject(err);
			});
		});

	},

    getApplicantStatistics: function() {
        return new Promise(function(resolve, reject) {
            UserStatistics.find().exec(function(err, stat) {
                if (err) {
                    return reject(err);
                }
                const st = stat[0];
                return resolve({
                    applicants: st.all_applicants,
                    active: st.active_applicants,
                    inactive: st.all_applicants - st.active_applicants,
                    complete: st.complete_resume,
                    incomplete: st.active_applicants - st.complete_resume,
                    photos: st.photos,
                    nophotos: st.active_applicants - st.photos,
                    videos: st.videos,
                    novideos: st.test - st.videos,
                    notests: st.photos - st.test,
                    sometests: st.test_in_progress,
                    tests: st.test,
                    //jobs: results[12].length,
                    //nojobs: results[13].length
                });
            });
        });
    },

    fetchAll: function() {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant'}).sort('createdAt desc').limit(1000).exec(function (err, applicants) {
                return resolve(applicants);
            });
        });
    },


    fectchActiveStatus: function(status) {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant', status: status}).sort('createdAt desc').limit(2000).exec(function (err, inactive) {
                return resolve(inactive);
            });
        });
    },

    fetchResumeStatusByQuery: function(statusQuery) {
        return Resume.find(statusQuery).sort('updatedAt desc').limit(2000);
    },


    fetchResumeStatus: function(status) {
        return Resume.find({status: status}).sort('updatedAt desc').limit(2000);
    },

    fetchPhotoStatus: function(status) {
        return Resume.find({photo_status: status}).sort('updatedAt desc').limit(2000);
    },

    fetchNoTestsApplicants: fetchNoTestsApplicants,

    fetchSomeTestsApplicants: fetchSomeTestsApplicants,

    fetchCompleteTestsApplicants: fetchCompleteTestsApplicants,

    fetchJobApplicants: fetchJobApplicants,

    fetchNoJobApplicants: fetchNoJobApplicants,

    searchResume: function(_school, _course, _result, _certification, _state) {
        const school = _school ? _school.trim() : false;
        const course = _course ? _course.trim() : false;
        const result = _result ? _result.trim() : false;
        const certification = _certification ? _certification.trim() : false;
        const state = _state ? _state.trim() : false;

        var data = [];

        var sql = "SELECT user, r_state FROM resume r ";
        var where = "WHERE fullname <> '' ";

        if (school || course || result) {
            sql += "JOIN education e ON e.resume = r.id ";
            if (school) {
                where += "AND e.institution LIKE ? ";
                data.push('%' + school + '%');
            }
            if (course) {
                sql += "JOIN employment emp ON r.id = emp.resume "
                where += "AND e.programme LIKE ? ";
                where += "OR emp.role LIKE ? "
                data.push('%' + course + '%');
                data.push('%' + course + '%');
            }
            if (result) {
                where += "AND e.r_class = ? ";
                data.push(result);
            }
        } 
        if (certification) {
            sql += "JOIN qualification q ON r.id = q.resume ";
            where += "AND q.qualification LIKE ? ";
            data.push('%' + certification + '%');
        }
        if (state) {
            where += "AND r.r_state = ?"; 
            data.push(state);
        }
        
        return new Promise(function(resolve, reject) {
            // if search button is click and no field was set
            if (data.length == 0) {
                return reject('Phew!!! Redirect to same page.');
            } else {
                sql += where;
                Resume.query(sql, data, function(err, result) {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    var users = [];
                    result.forEach(function(user) {
                        users.push(user.user);
                    });
                    return resolve(users);
                });
            }
        });
    },


	deleteApplicant: function(users) {
		let destroyPromises = [
			User.destroy({ id: users }),
			Resume.destroy({user: users}),
			Application.destroy({applicant: users})
		];

		_.each(users, (user) => {
			destroyPromises.push(CBTService.cancelGQApptitudeTest(user));
		});

		return Promise.all(destroyPromises)
			.then(results => {
				let destroyedResumes = results[1];

				// Get the resume Ids
				resumeIds = _.map(destroyedResumes, (resume) => {
					return parseInt(resume.id);
				});

				return Promise.all([
					Education.destroy({resume: resumeIds}),
					Qualification.destroy({resume: resumeIds}),
					ReferenceContact.destroy({resume: resumeIds})
				]);
			}).catch(err => {
				throw err;
			});
	}
}
