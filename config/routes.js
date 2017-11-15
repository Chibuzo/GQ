
module.exports.routes = {

    '/': {
        view: 'index'
    },

    '/signup': { view: 'signup' },

    '/login': { view: 'login' },

    '/admin': { view: 'admin/login' },

    'GET /user/activate/:email/:hash': 'UserController.activateAccount',

    'POST /user/login': 'UserController.signin',

    'POST /user/signup': 'UserController.signup',

    'GET /applicant/profile': 'UserController.profile',

    'GET /signout': 'UserController.signout',

    'GET /applicant/resume-page': 'ResumeController.updateResume',

    'POST /resume/update': 'ResumeController.save',

    'POST /user/update': 'UserController.updateProfile',

    'GET /applicant/dashboard': 'UserController.dashboard',

    'GET /applicant/view-applications': 'ApplicationController.viewApplications',

    'GET /applicant/video': 'ApplicantController.videoPage',

    'POST /applicant/add-video': 'ApplicantController.uploadVideo',

    'GET /admin/setup': 'AdminController.setup',

    'GET /admin/create': { view: 'admin/create' },

    'POST /admin/create': 'AdminController.addAdmin',

    'POST /admin/login': 'AdminController.login',

    'GET /admin/signout': 'AdminController.signout',

    'GET /admin/dashboard': 'AdminController.dashboard',

    'GET /admin/manage-test': 'JobTestController.manageJobTests',

    'GET /admin/manage-courses': 'CourseController.getCourses',

    'GET /courses': 'CourseController.listCourses',

    'GET /course/addnew': 'CourseController.addNew',

    'POST /course/save': 'CourseController.saveCourse',

    'GET /courses/list': 'CourseController.getCourses',

    'POST /sector/addsector': 'SectorController.addSector',

    'POST /company-request/send-request': 'CompanyRequestController.submitRequest',

    'GET /company-request/view-requests': 'CompanyRequestController.viewPendingRequests',

    'POST /company-request/approve': 'CompanyRequestController.approve',

    'POST /company/update-details': 'CompanyController.updateDetails',

    'GET /company/dashboard': 'CompanyController.dashboard',

    'GET /company/profile': 'CompanyController.profile',

    'POST /company/upload-csv': 'JobController.readApplicationCSV',

    'GET /company/users': 'CompanyController.getUsers',

    'POST /company/adduser': 'CompanyController.addUser',

    'GET /company/activate-user/:hash/:email': 'CompanyController.activateUser',

    'POST /company/update-user': 'CompanyController.updateUser',

    'POST /company/remove-user': 'CompanyController.removeUser',

    'GET /coy/setup/:hash/:email': 'CompanyController.initialSetup',

    'GET /job/manage': 'JobController.viewJobs',

    'GET /job/addjob': 'JobController.newJobForm',

    'POST /job/save': 'JobController.saveJob',

    'GET /job/editjob/:job_id': 'JobController.editJob',

    'GET /job/remove': 'JobController.deleteJob',

    'GET /jobs': 'JobController.listJobs',

    'GET /job/apply/:id': 'JobController.apply',

    'GET /job/view-candidates/:job_id': 'JobCandidateController.getJobCandidates',

    'GET /job/:id/:title': 'JobController.showJob',

    'POST /job/add-test': 'JobTestController.assignTest',

    'POST /jobtest/remove-job': 'JobTestController.removeTest',

    'POST /jobcategory/addcategory': 'JobCategoryController.addCategory',

    'GET /test': 'TestController.testApi',

    'GET /gettest/:test_id': 'TestController.getLandingPage',

    'POST /test/result': 'TestController.receiveAndSaveResult',

    'GET /test/show-result/:test_id': 'CBTTestController.showCandidateResult'

    //'GET /savetest': 'TestController.saveTest',
};
