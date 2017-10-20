
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

    'GET /user/profile': 'UserController.profile',

    'GET /signout': 'UserController.signout',

    'GET /user/professional-profile': 'ResumeController.updateResume',

    'POST /resume/update': 'ResumeController.save',

    'POST /user/update': 'UserController.updateProfile',

    'GET /user/dashboard': 'UserController.dashboard',

    'GET /admin/create': { view: 'admin/create' },

    'POST /admin/create': 'AdminController.addAdmin',

    'POST /admin/login': 'AdminController.login',

    'GET /admin/signout': 'AdminController.signout',

    'GET admin/dashboard': 'AdminController.dashboard',

    'POST /company-request/send-request': 'CompanyRequestController.submitRequest',

    'GET /company-request/view-requests': 'CompanyRequestController.viewPendingRequests',

    'POST /company-request/approve': 'CompanyRequestController.approve',

    'POST /company/update-details': 'CompanyController.updateDetails',

    'GET /company/dashboard': 'CompanyController.dashboard',

    'GET /company/profile': 'CompanyController.profile',

    'POST /company/upload-csv': 'JobController.readApplicationCSV',

    'GET /coy/setup/:hash/:email': 'CompanyController.initialSetup',

    'GET /job/manage': 'JobController.viewJobs',

    'POST /job/add-new': 'JobController.addNewJob'

};
