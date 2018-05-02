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

    return GQTestResult.find({test: [1, 2, 3]})
    .then(gqTestResults => {
        let usersWithTests = _.groupBy(gqTestResults, (testResult) => {
            return testResult.candidate;
        });

        let usersWithSomeTests = _.filter(usersWithTests, (tests, candidateId) => {
            return tests.length < 3
        });

        let usersWithSomeTestsIds = _.map(usersWithSomeTests, (testsArr, candidateId) => {
            return parseInt(testsArr[0].candidate);
        });

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
				checklist.push({
					title: 'Fill Out Resume/CV',
					text: 'Your CV is the first chance you get to make a good impression on a potential employer.',
					iconClass: userResume.profile_status == true ? 'fa fa-check-circle': 'fa fa-certificate',
					action: '/applicant/resume-page#resume-tab',
					completed: userResume.profile_status == true,
					disbaledClass: ""
				});

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
				let disableJob = !userResume.video_status || disabledVideo || !userResume.profile_status;
				checklist.push({
					title: 'Apply to a Job',
					text: 'Look through our job postings and apply.',
					iconClass: applications.length > 0 && disableJob != true ? 'fa fa-check-circle': 'fa fa-briefcase',
					action: applications.length < 1 && disableJob ? "" : '/jobs',
					completed: applications.length > 0 && disableJob != true,
					disbaledClass: disableJob ? "disabled" : ""
				});

				return resolve(checklist);
			}).catch(err => {
				console.error(err);
				reject(err);
			})
		});

	},

    getApplicantStatistics: function() {

        return Promise.all([
                User.count({user_type: 'Applicant'}),
                User.count({user_type: 'Applicant', status: 'Active'}),
                User.count({user_type: 'Applicant', status: 'Inactive'}),
                Resume.count({profile_status: true}),
                Resume.count({profile_status: false}),
                Resume.count({photo_status: true}),
                Resume.count({photo_status: false}),
                Resume.count({video_status: true}),
                Resume.count({video_status: false}),
                fetchNoTestsApplicants(),
                fetchSomeTestsApplicants(),
                fetchCompleteTestsApplicants(),
                fetchJobApplicants(),
                fetchNoJobApplicants()
            ]).then(results => {
                return {
                    applicants: results[0],
                    active: results[1],
                    inactive: results[2],
                    complete: results[3],
                    incomplete: results[4],
                    photos: results[5],
                    nophotos: results[6],
                    videos: results[7],
                    novideos: results[8],
                    notests: results[9].length,
                    sometests: results[10].length,
                    tests: results[11].length,
                    jobs: results[12].length,
                    nojobs: results[13].length
                }
            }).catch(err => {
                throw err;
            });
    },

    fetchAll: function() {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant'}).exec(function (err, applicants) {
                return resolve(applicants);
            });
        });
    },


    fectchActiveStatus: function(status) {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant', status: status}).exec(function (err, inactive) {
                return resolve(inactive);
            });
        });
    },

    fetchResumeStatusByQuery: function(statusQuery) {
        return Resume.find(statusQuery);
    },


    fetchResumeStatus: function(status) {
        return Resume.find({status: status});
    },

    fetchPhotoStatus: function(status) {
        return Resume.find({photo_status: status});
    },

    fetchNoTestsApplicants: fetchNoTestsApplicants,

    fetchSomeTestsApplicants: fetchSomeTestsApplicants,

    fetchCompleteTestsApplicants: fetchCompleteTestsApplicants,

    fetchJobApplicants: fetchJobApplicants,

    fetchNoJobApplicants: fetchNoJobApplicants,

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
