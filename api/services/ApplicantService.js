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

				// Profile Picture
				checklist.push({
					title: 'Upload Profile Photo',
					text: 'Companies are much more likely to hire applicants with a quality profile picture.',
					iconClass: userResume.photo_status == true ? 'fa fa-check-circle': 'fa fa-user-circle',
					action: '/applicant/resume-page#photo',
					completed: userResume.photo_status == true,
					disbaledClass: ""
				});

				// Resume/CV
				checklist.push({
					title: 'Fill Out Resume/CV',
					text: 'Your CV is the first chance you get to make a good impression on a potential employer.',
					iconClass: userResume.profile_status == true ? 'fa fa-check-circle': 'fa fa-certificate',
					action: '/applicant/resume-page#resume-tab',
					completed: userResume.profile_status == true,
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
					title: 'Upload Introduction Profile',
					text: 'A video profile gives companies the ability to assess your professional presentation and demeanor.',
					iconClass: userResume.video_status == true ? 'fa fa-check-circle': 'fa fa-file-video-o',
					action: '/applicant/resume-page#video',
					completed: userResume.video_status == true,
					disbaledClass: ""
				});

				// Apply to a job
				let disableJob = !userResume.video_status || !userResume.test_status || userResume.profile_status;
				checklist.push({
					title: 'Apply to a Job',
					text: applications.length < 1 && disableJob ? 'Please complete your GQ Profile before applying to a job' :
						'Look through our job postings and apply.',
					iconClass: applications.length > 0 ? 'fa fa-check-circle': 'fa fa-briefcase',
					action: disableJob ? "" : '/jobs',
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
        return new Promise(function(resolve, reject) {
            User.count({user_type: 'Applicant'}).exec(function (err, applicant) {
                User.count({status: 'Inactive'}).exec(function (err, inactive) {
                    Resume.count().exec(function (err, active) {
                        Resume.count({status: 'Incomplete'}).exec(function (err, incomplete) {
                            return resolve({
                                applicants: applicant,
                                inactive: inactive,
                                incomplete: incomplete
                            });
                        });
                    });
                });
            });
        });
    },


    fetchAll: function() {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant'}).exec(function (err, applicants) {
                return resolve(applicants);
            });
        });
    },


    fetchInactive: function() {
        return new Promise(function(resolve) {
            User.find({user_type: 'Applicant', status: 'Inactive'}).exec(function (err, inactive) {
                return resolve(inactive);
            });
        });
    },


    fetchIncomplete: function() {
        return new Promise(function(resolve) {
            Resume.find({ status: 'Incomplete' }).exec(function(err, incomplete) {
                return resolve(incomplete);
            });
        });
    },


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
