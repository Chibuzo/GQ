module.exports.routes = {

    '/': 'PageController.index',

    '/candidates': 'ApplicantController.showLanding',

    '/signup': { view: 'signup' },

    '/login': { view: 'login' },

    '/login/:base64_url': 'UserController.specialLoginPage',

    '/admin': { view: 'admin/login' },

    'GET /user/activate/:email/:hash': 'UserController.activateAccount',

    'POST /user/login': 'UserController.signin',

    'POST /user/signup': 'UserController.signup',

    'POST /user/update': 'UserController.updateProfile',

    'POST /user/sendPswdResetEmail': 'UserController.sendPswdResetEmail',

    'POST /user/resetpassword': 'UserController.resetPassword',

    'GET /user/resetpassword/:email/:hash': 'UserController.showResetPasswordPage',

    'GET /applicant/profile': 'UserController.profile',

    'GET /signout': 'UserController.signout',

    'GET /applicant/resume-page': 'ResumeController.editView',

    'POST /resume/update': 'ResumeController.save',

    'POST /resume/remove-education': 'ResumeController.removeEducation',

    'POST /resume/remove-certification': 'ResumeController.removeCertification',

    'POST /resume/remove-employment': 'ResumeController.removeEmployment',

    'POST /resume/remove-referee': 'ResumeController.removeReferee',

    'GET /resume/view/:user_id/:job_id': 'ResumeController.viewJobResume',

    'GET /applicant/dashboard': 'ApplicantController.dashboard',

    'GET /applicant/view-applications': 'ApplicationController.viewApplications',

    'GET /applicant/video': 'ApplicantController.videoPage',

    'POST /applicant/add-profilevideo': 'ApplicantController.uploadVideo', 

    'POST /applicant/updateYoutubeId': 'ApplicantController.addYoutubeVideoID',

    'POST /applicant/add-profilephoto': 'ApplicantController.uploadPhoto',

    'DELETE /applicant/test/:userId': 'ApplicantController.deleteTestScoreAndFiles',

    'POST /test/deleteScore': 'ApplicantController.deleteTestScoreAndFiles',

    'GET /applicant/resume/:resume_id': 'ResumeController.viewResume',

    'GET /applicant/resume-user/:user_id': 'ResumeController.viewResumeByUser',

    'POST /applicant/select-candidate': 'SelectedCandidateController.selectCandidate',

    'POST /applicant/unselect-candidate': 'SelectedCandidateController.unSelectCandidate',

    'POST /selectedCandidates/interview': 'SelectedCandidateController.interviewCandidatesRequest',

    'GET /admin/setup': 'AdminController.setup',

    'GET /admin/create': { view: 'admin/create' },

    'POST /admin/create': 'AdminController.addAdmin',

    'POST /admin/login': 'AdminController.login',

    'GET /admin/signout': 'AdminController.signout',

    'GET /admin/dashboard': 'AdminController.dashboard',

    'GET /admin/manage-test': 'JobTestController.manageJobTests',

    'GET /admin/manage-courses': 'CourseController.getCourses',

    'GET /admin/applicants': 'ApplicantController.fetchApplicants',

    'GET /gqtest/manage': 'GQTestController.manageTest',

    'GET /admin/view-companies': 'CompanyController.viewCompanies',

    'GET /admin/coy-jobs/:coy_id/:status': 'CompanyController.viewCompanyJobs',

    'GET /admin/candidates/:query': 'ApplicantController.fetchStatisticsPage',

    'POST /admin/sendemail': 'ApplicantController.sendEmail',

    'DELETE /admin/deleteCandidates': 'ApplicantController.deleteApplicants',

    'GET /gqtest/createnew': 'GQTestController.createTestPage',

    'POST /gqtest/savetest': 'GQTestController.saveTest',

    'POST /gqtest/savequestion': 'GQTestController.saveQuestion',

    'GET /gqtest/edittest/:test_id': 'GQTestController.editTest',

    'POST /gqtest/upload-questions': 'GQTestController.uploadQuestions',

    'GET /gqtest/getquestion/:question_id': 'GQTestController.getQuestion',

    'GET /gqtest/load-test-instruction/:test_id': 'GQTestController.loadTestInstruction',

    //'GET /gqtest/load-default': 'GQTestController.loadGQDefaultTest',
    'GET /gqtest/load-test/:test_id': 'GQTestController.loadTest',

    'POST /gqtest/marktest': 'GQTestController.markTest',

    'POST /gqtest/mark/gq': 'GQTestController.markGQ',

    'POST /gqtest/markGQAptitude': 'GQTestController.markGQTest',

    'GET /gqtest/viewresults/:test_id': 'GQTestController.viewResults',

    'GET /gqtest/remove/:test_id': 'GQTestController.deleteTest',

    'GET /gqtest/delete-question': 'GQTestController.deleteQuestion',

    'GET /gqtest/deleteResult': 'GQTestController.deleteResult',

    'GET /gqtest/gettest/:test_id/:job_id/:gqtest_id': 'GQTestController.getTest',

    'POST /gqtest/uploadProctorAudio': 'GQTestController.uploadProctorAudio',

    'POST /gqtest/uploadProctorPicture': 'GQTestController.uploadProctorPicture',

    'POST /gqtest/createProctorSession': 'ProctorRecordController.startSession',

    'GET /proctor/fetchFiles': 'ProctorRecordController.getTestProctorFiles',

    'GET /proctor/session': 'ProctorSessionController.getProctorSession',

    'POST /proctor/accept-test': 'ProctorRecordController.acceptTest',

    'POST /proctor/reject-test': 'ProctorRecordController.rejectTest',

    'POST /courseCategory/save': 'CourseCategory.saveCategory',

    'GET /courseCategory/delete/:category_id': 'CourseCategory.deleteCategory',

    'GET /courses': 'CourseController.listCourses',

    'GET /course/addnew': 'CourseController.addNew',

    'GET /course/editcourse/:id': 'CourseController.editCourse',

    'POST /course/save': 'CourseController.saveCourse',

    'GET /course/delete/:id': 'CourseController.deleteCourse',

    'POST /course/subscribe': 'CourseController.subscribe',

    'GET /courses/list': 'CourseController.getCourses',

    'POST /sector/saveSector': 'SectorController.saveSector',

    'POST /company-request/send-request': 'CompanyRequestController.submitRequest',

    'GET /company-request/view-requests': 'CompanyRequestController.viewPendingRequests',

    'POST /company-request/approve': 'CompanyRequestController.approve',

    'GET /company-request/reject': 'CompanyRequestController.cancel',

    'POST /company/update-details': 'CompanyController.updateDetails',

    'GET /company/dashboard/:msg': 'CompanyController.dashboard',

    'GET /company/profile': 'CompanyController.profile',

    'POST /company/upload-csv': 'JobController.readApplicationCSV',

    'GET /company/users': 'CompanyController.getUsers',

    'POST /company/adduser': 'CompanyController.addUser',

    'GET /company/activate-user/:hash/:email': 'CompanyController.activateUser',

    'GET /company/user-profile': 'CompanyController.userProfile',

    'POST /company/update-user': 'CompanyController.updateUser',

    'POST /company/remove-user': 'CompanyController.removeUser',

    'GET /get-companies': 'CompanyController.fetchCompanies',

    'GET /coy/setup/:hash/:email': 'CompanyController.initialSetup',

    'GET /job/addjob/:coy_id': 'JobController.newJobForm',

    'GET /job/addjob': 'JobController.newJobForm',

    'POST /job/save': 'JobController.saveJob',

    'GET /job/editjob/:job_id': 'JobController.editJob',

    'GET /job/remove': 'JobController.deleteJob',

    'GET /jobs': 'JobController.listJobs',

    'GET /job/apply/:id': 'JobController.apply',

    'GET /job/view-candidate-results/:job_id': 'JobCandidateController.getJobCandidates',

    'POST /job/add-test': 'JobTestController.assignTest',

    'POST /jobtest/remove-job': 'JobTestController.removeTest',

    'POST /job/set-test-rating': 'JobTestController.setJobTestRating',

    'GET /job/view-applicants/:job_id': 'JobController.viewApplicants',

	'GET /admin/job/:job_id/view-applicants': 'JobController.viewApplicantsforAdmin',

    'GET /job/candidates/:job_id': 'JobController.getApplicantsResults',

    'GET /job/view-shortlisted/:job_id': 'JobController.fetchShortlisted',

    'GET /job/closejob/:job_id': 'JobController.closeJob',

    'GET /job/archive/:job_id': 'JobController.archiveJob',

    'GET /admin/job/:job_id/view-shortlisted': 'JobController.fetchShortlistedForAdmin',

    'GET /job/:id/:title': 'JobController.showJob',

    'GET /job/:id': 'JobController.showJob',

    'POST /job/enable-contactview': 'JobController.enableContactView',

    'GET /jobcategory/:id/*': 'JobController.findJobsByCategory',

    'GET /getJobTest/:category/:job_level': 'JobTestController.getJobTest',

    'POST /jobcategory/saveCategory': 'JobCategoryController.saveCategory',

    //'GET /test': 'TestController.testApi',

    'GET /gettest/:test_id/:job_id': 'TestController.getLandingPage',

    'POST /test/result': 'TestController.receiveAndSaveResult',

    'GET /test/show-result/:test_id': 'CBTTestController.showCandidateResult',

    'GET /test/getTestList/:category_id': 'TestController.getTestListByCategory',

    'GET /result/getVideo': 'ResumeController.getVideo',

    'GET /assessments': 'CBTTestController.getTestResult',

    'GET /get-schools': 'SchoolsController.getSchools',

    'GET /applicants/search': 'ApplicantController.search',

    'GET /getYoutubeAccessToken': 'ApplicantController.getYoutubeAccessToken',

    'POST /deleteYoutubeVideo': 'ApplicantController.deleteYoutubeVideo',

    'POST /fetchScrapedJobs': 'JobController.fetchScrapedJobs',

    'GET /viewScrapedJobs': 'JobController.viewScrapedJobs',

    'POST /scrapedJobs/moveToJobBoard': 'JobController.moveToJobBoard',

    'POST /scrapedJob/claimJob': 'JobController.moveToCompany',

    'GET /editprofile/:user_id': 'AdminController.hijackAccount',

    'GET /companyprofile/:coy_id': 'AdminController.hijackCompany',

    'GET /downloadsamplecsv': 'JobController.downloadCSVSample',

    'GET /viewsampleresume': 'ResumeController.viewSampleCV',

    //'GET /listtest': 'TestController.testApi',

    //'GET /email': { view: 'email' },
    //
    //'POST /pushajax': 'TestController.ajaxTest',
    //
    //'GET /loadschools': 'BatchController.loadSchools',
    //
    //'GET /savetest': 'TestController.saveTest',
    //
    //'GET /countries': 'BatchController.countries',
    //
    //'/states': 'BatchController.loadStates'

    'GET /getstates': 'BatchController.getStates',


    /*****************************************************
     * GQ API v1 routes
     * */
    'POST /api/v1/postjob': 'JobApiController.createJob',

    'GET /api/v1/joburl/:job_id': 'JobApiController.returnJobUrl',


    'POST /api/v1/proctor/getsessionid': { 
        controller: 'ProctorRecordController', action: 'startSession', 
        cors: {
            allowOrigins: ['*'],
            allowCredentials: false
        }
    },

    'POST /api/v1/proctor/uploadphoto': {
        controller: 'GQTestController', action: 'uploadProctorPicture',
        cors: {
            allowOrigins: ['*'],
            allowCredentials: false
        }
    },

    'POST /api/v1/proctor/uploadaudio': {
        controller: 'GQTestController', action: 'uploadProctorAudio',
        cors: {
            allowOrigins: ['*'],
            allowCredentials: false
        }
    },

    'POST /api/v1/proctor/saveproctordata': {
        controller: 'ProctorRecordController', action: 'saveEvidenceData',
        cors: {
            allowOrigins: ['*'],
            allowCredentials: false
        }
    },

    // candidates
    'POST /api/v1/candidates/fetchgqresults': {
        controller: 'GQTestController', action: 'getAptitudeTestResults',
        cors: {
            allowOrigins: ['*'],
            allowCredentials: false
        }
    }
};
