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
					disbaledClass: ""
				});

				// Test
				let disabledTest = userResume.profile_status != true || userResume.photo_status != true;
				checklist.push({
					title: 'Take Apptitude Test',
					text: disabledTest ? 'Please upload a profile photo and complete your CV before taking the apptitude test':
						'Aptitude tests afford companies an opportunity to make a more informed decision when it comes to hiring.',
					iconClass: userResume.test_status == true ? 'fa fa-check-circle': 'fa fa-calculator',
					action: disabledTest ? "" : '/applicant/resume-page#test',
					completed: userResume.test_status == true,
					disbaledClass: disabledTest ? "disabled" : ""
				});


				// Video Profile
				checklist.push({
					title: 'Upload Introduction Video',
					text: 'A video profile gives companies the ability to assess your professional presentation and demeanor.',
					iconClass: userResume.video_status == true ? 'fa fa-check-circle': 'fa fa-file-video-o',
					action: '/applicant/resume-page#video',
					completed: userResume.video_status == true,
					disbaledClass: ""
				});

				// Apply to a job
				let disableJob = !userResume.video_status || !userResume.test_status || !userResume.profile_status;
				checklist.push({
					title: 'Apply to a Job',
					text: applications.length < 1 && disableJob ? 'Please complete your GQ Profile before applying to a job' :
						'Look through our job postings and apply.',
					iconClass: applications.length > 0 ? 'fa fa-check-circle': 'fa fa-briefcase',
					action: applications.length < 1 && disableJob ? "" : '/jobs',
					completed: applications.length > 0,
					disbaledClass: applications.length < 1 && disableJob ? "disabled" : ""
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
                Resume.count({status: 'Complete'}),
                Resume.count({status: 'Incomplete'}),
                Resume.count({photo_status: true}),
                Resume.count({photo_status: false}),
                Resume.count({video_status: true}),
                Resume.count({video_status: false})
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
                    novideos: results[8]
                }
            }).catch(err => {
                throw err;
            });
    },

    getAllApplicantStatistics: function() {

    	return Promise.all([
    			User.find({user_type: 'Applicant'}),
    			Resume.find(),
    		]).then(results => {
    			let applicantUserRecords = results[0];
    			let resumeRecords = results[1];

    			let inactiveCount = 0;
    			let incompleteCount = 0;
    			let applicantCount = applicantUserRecords.length;

    			let applicants =  applicantUserRecords.map(applicantUser => {
    				let isInactive = applicantUser.status == 'Inactive';
    				let cssClasses = "";
    				if (isInactive) {
    					inactiveCount++;
    					cssClasses += 'isInactive';
    				}

    				let applicantResume = _.find(resumeRecords, (resume) => {
    					return resume.user == applicantUser.id || !resume.user && resume.email == applicantUser.email
    				});

    				let isIncomplete = applicantResume && applicantResume.status == 'Incomplete';
    				if (isIncomplete) {
    					incompleteCount++;
    					cssClasses += 'isIncomplete';
    				}

    				return {
    					id: applicantUser.id,
    					createdAt: applicantUser.createdAt,
    					fullname: applicantUser.fullname,
    					email: applicantUser.email,
    					phone: applicantUser.phone,
    					isInactive,
    					isIncomplete,
    					cssClasses
    				}
    			});

    			return {
    				applicants,
    				stats: {
    					applicantCount,
	    				inactiveCount,
	    				incompleteCount
    				}
    			}

    		}).catch(err => {
    			throw error
    		})
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

    fetchNoTestsApplicants: function() {
        // Find all the applicants who have a photo and complete resume
        // Find all the applicants who have taken a GQ Test
        // Remove applicants who have taken a GQ Test from applicants with complete resume and photo

        Promise.all([
            Resume.find({photo_status: true, profile_status: true}),
            GQTestResult.find({test: [1, 2, 3]})
        ])
    }


    // ATTENTION: This is a destructive function, one must not use it
    deleteApplicant: function(users) {
        return new Promise(function(resolve, reject) {
            User.destroy({ id: users }).exec(function(err, deleted_users) {
                deleted_users.forEach(function(user) {
                    if (user.status == 'Active') {
                        Resume.destroy({user: user.id}).exec(function (err, resume) {
                            if (resume && resume.length > 0 && resume[0].status == 'Complete') {
                                JobService.removeApplicantJobs(user.id);
                            }
                        });
                        // delete profile photo
                        // delete video profile
                        // spit on his grave
                    }
                });
            });
        });
    }
}
