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

    'GET /applicant/dashboard': 'ApplicantController.dashboard',

    'GET /applicant/view-applications': 'ApplicationController.viewApplications',

    'GET /applicant/video': 'ApplicantController.videoPage',

    //'POST /applicant/add-video': 'ApplicantController.uploadVideo',    //--> deprecated
    'POST /applicant/updateYoutubeId': 'ApplicantController.addYoutubeVideoID',

    'POST /applicant/add-profilephoto': 'ApplicantController.uploadPhoto',

    'DELETE /applicant/test/:userId': 'ApplicantController.deleteTestScoreAndFiles',

    'GET /applicant/resume/:resume_id': 'ResumeController.viewResume',

    'GET /applicant/resume-user/:user_id': 'ResumeController.viewResumeByUser',

    'POST /applicant/select-candidate': 'SelectedCandidateController.selectCandidate',

    'POST /applicant/unselect-candidate': 'SelectedCandidateController.unSelectCandidate',

    'POST /selectedCandidates/accept': 'SelectedCandidateController.acceptCandidates',

    'GET /admin/setup': 'AdminController.setup',

    'GET /admin/create': { view: 'admin/create' },

    'POST /admin/create': 'AdminController.addAdmin',

    'POST /admin/login': 'AdminController.login',

    'GET /admin/signout': 'AdminController.signout',

    'GET /admin/dashboard': 'AdminController.dashboard',

    'GET /admin/manage-test': 'JobTestController.manageJobTests',

    'GET /admin/manage-courses': 'CourseController.getCourses',

    'GET /admin/applicants': 'ApplicantController.fetchApplicants',

    'GET /admin/gq-test': 'GQTestController.manageTest',

    'GET /admin/view-companies': 'CompanyController.viewCompanies',

    'GET /admin/coy-jobs/:coy_id': 'CompanyController.viewCompanyJobs',

    'GET /admin/candidates/:query': 'ApplicantController.fetchStatisticsPage',

    'POST /admin/sendemail': 'ApplicantController.sendEmail',

    'POST /admin/deleteCandidates': 'ApplicantController.deleteApplicants',

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

    //'GET /gqtest/remove': 'GQTestController.deleteTest',

    'GET /gqtest/delete-question': 'GQTestController.deleteQuestion',

    'GET /gqtest/gettest/:test_id/:job_id': 'GQTestController.getTest',

    'POST /gqtest/uploadProctorAudio': 'GQTestController.uploadProctorAudio',

    'POST /gqtest/uploadProctorPicture': 'GQTestController.uploadProctorPicture',

    'POST /gqtest/createProctorSession': 'ProctorRecordController.startSession',

    'GET /proctor/fetchFiles': 'ProctorRecordController.getTestProctorFiles',

    'GET /proctor/session': 'ProctorSessionController.getProctorSession',

    'POST /proctor/accept-test': 'ProctorRecordController.acceptTest',

    'POST /proctor/reject-test': 'ProctorRecordController.rejectTest',

    //'POST /gqtest/createProctorSession': 'ProctorRecordController.stopSession',
    'POST /courseCategory/save': 'CourseCategory.saveCategory',

    'GET /courseCategory/delete/:category_id': 'CourseCategory.deleteCategory',

    'GET /courses': 'CourseController.listCourses',

    'GET /course/addnew': 'CourseController.addNew',

    'GET /course/editcourse/:id': 'CourseController.editCourse',

    'POST /course/save': 'CourseController.saveCourse',

    'GET /course/delete/:id': 'CourseController.deleteCourse',

    'POST /course/subscribe': 'CourseController.subscribe',

    'GET /courses/list': 'CourseController.getCourses',

    'POST /sector/addsector': 'SectorController.addSector',

    'POST /company-request/send-request': 'CompanyRequestController.submitRequest',

    'GET /company-request/view-requests': 'CompanyRequestController.viewPendingRequests',

    'POST /company-request/approve': 'CompanyRequestController.approve',

    'GET /company-request/reject': 'CompanyRequestController.cancel',

    'POST /company/update-details': 'CompanyController.updateDetails',

    'GET /company/dashboard': 'CompanyController.dashboard',

    'GET /company/profile': 'CompanyController.profile',

    'POST /company/upload-csv': 'JobController.readApplicationCSV',

    'GET /company/users': 'CompanyController.getUsers',

    'POST /company/adduser': 'CompanyController.addUser',

    'GET /company/activate-user/:hash/:email': 'CompanyController.activateUser',

    'GET /company/user-profile': 'CompanyController.userProfile',

    'POST /company/update-user': 'CompanyController.updateUser',

    'POST /company/remove-user': 'CompanyController.removeUser',

    'GET /coy/setup/:hash/:email': 'CompanyController.initialSetup',

    'GET /job/manage': 'JobController.viewJobs',

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

	'GET /job/admin/view-applicants/:job_id': 'JobController.viewApplicantsforAdmin',

    'GET /job/candidates/:job_id': 'JobController.getApplicantsResults',

    'GET /job/view-shortlisted/:job_id': 'JobController.fetchShortlisted',

    'GET /job/:id/:title': 'JobController.showJob',

    'GET /jobcategory/:id/*': 'JobController.findJobsByCategory',

    'GET /getJobTest/:category/:job_level': 'JobTestController.getJobTest',

    'POST /jobcategory/addcategory': 'JobCategoryController.addCategory',

    'GET /test': 'TestController.testApi',

    'GET /gettest/:test_id/:job_id': 'TestController.getLandingPage',

    'POST /test/result': 'TestController.receiveAndSaveResult',

    'GET /test/show-result/:test_id': 'CBTTestController.showCandidateResult',

    'GET /result/getVideo': 'ResumeController.getVideo',

    'GET /assessments': 'CBTTestController.getTestResult',

    'GET /get-schools': 'SchoolsController.getSchools',

    'GET /applicants/search': 'ApplicantController.search',

    'GET /getYoutubeAccessToken': 'ApplicantController.getYoutubeAccessToken',

    'POST /deleteYoutubeVideo': 'ApplicantController.deleteYoutubeVideo',

    'GET /fetchScrapedJobs': 'JobController.fetchScrapedJobs',

    'GET /viewScrapedJobs': 'JobController.viewScrapedJobs',

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
};
