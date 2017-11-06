
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

    'GET /admin/setup': 'AdminController.setup',

    'GET /admin/create': { view: 'admin/create' },

    'POST /admin/create': 'AdminController.addAdmin',

    'POST /admin/login': 'AdminController.login',

    'GET /admin/signout': 'AdminController.signout',

    'GET /admin/dashboard': 'AdminController.dashboard',

    'GET /admin/manage-test': 'JobTestController.manageJobTests',

    'POST /company-request/send-request': 'CompanyRequestController.submitRequest',

    'GET /company-request/view-requests': 'CompanyRequestController.viewPendingRequests',

    'POST /company-request/approve': 'CompanyRequestController.approve',

    'POST /company/update-details': 'CompanyController.updateDetails',

    'GET /company/dashboard': 'CompanyController.dashboard',

    'GET /company/profile': 'CompanyController.profile',

    'POST /company/upload-csv': 'JobController.readApplicationCSV',

    'GET /coy/setup/:hash/:email': 'CompanyController.initialSetup',

    'GET /job/manage': 'JobController.viewJobs',

    'GET /job/addjob': 'JobController.newJobForm',

    'POST /job/save': 'JobController.saveJob',

    'GET /job/editjob/:job_id': 'JobController.editJob',

    'GET /job/remove': 'JobController.deleteJob',

    'GET /jobs': 'JobController.listJobs',

    'GET /job/apply/:id': 'JobController.apply',

    'GET /job/:id/:title': 'JobController.showJob',

    'POST /job/add-test': 'JobTestController.assignTest',

    'POST /jobtest/remove-job': 'JobTestController.removeTest',

    'POST /jobcategory/addcategory': 'JobCategoryController.addCategory',

    //'GET /job/view-applications':

    'GET /test': 'TestController.testApi',

    'GET /gettest/:test_id': 'TestController.getLandingPage',

    'POST /test/result': 'TestController.receiveAndSaveResult',

    //'GET /test/result': 'TestController.receiveAndSaveResult',

    'GET /savetest': 'TestController.saveTest',

    'GET /test/json': 'TestController.testJson'
};
