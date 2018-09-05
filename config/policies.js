/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

    /***************************************************************************
    *                                                                          *
    * Default policy for all controllers and actions (`true` allows public     *
    * access)                                                                  *
    *                                                                          *
    ***************************************************************************/

    UserController: {
        dashboard: 'isLoggedIn',
        profile: 'isLoggedIn',
        updateProfile: 'isLoggedIn'
    },

    ApplicantController: {
        dashboard: 'isLoggedIn',
        deleteApplicants: 'isAdmin',
        deleteTestScoreAndFiles: 'isAdmin',
        fetchApplicants: 'isAdmin',
        search: 'isAdmin',
        fetchStatisticsPage: 'isAdmin',
    },

    JobController: {
        'viewJobs': 'isLoggedIn',
        'newJobForm':'isLoggedIn',
        'editJob': 'isLoggedIn',
        'viewJobs': 'isLoggedIn',
        'saveJob': 'isLoggedIn',
        'deleteJob': 'isLoggedIn',
        'viewApplicantsforAdmin': 'isAdmin',
        'fetchShortlistedForAdmin': 'isAdmin',
        'viewScrapedJobs': 'isAdmin',
        'fetchScrapedJobs': 'isAdmin'
    },

    JobTestController: {
        manageJobTests: 'isAdmin'
    },

    ResumeController: {
        '*': 'isLoggedIn',
    },

    AdminController: {
        'setup': 'isAdmin',
        'updateProfile': 'isAdmin',
        'profile': 'isAdmin'
        //'*': 'isAdmin'
    },

    CourseController: {
        'saveCourse': 'isAdmin',
        'getCourses': 'isAdmin',
        'addNew': 'isAdmin',
        'editCourse': 'isAdmin',
        'deleteCourse': 'isAdmin'
    },

    CourseCategory: {
        '*': 'isAdmin'
    },

    GQTestController: {
        loadTestInstruction: 'isLoggedIn',
        loadTest: 'isLoggedIn',
        getTest: 'isLoggedIn',
        markTest: 'isLoggedIn',
        markGQTest: 'isLoggedIn',
        markGQ: 'isLoggedIn',
        deleteTest: 'isAdminOrCompany',
        deleteQuestion: 'isAdminOrCompany',
        manageTest: 'isAdminOrCompany',
        saveTest: 'isAdminOrCompany',
        saveQuestion: 'isAdminOrCompany',
        uploadQuestions: 'isAdminOrCompany',
        editTest: 'isAdminOrCompany'
    },

    selectedCandidateController: {
        '*': 'isLoggedIn'
    },

    CompanyController: {
        'dashboard': 'isAdminOrCompany',
        'viewCompanyJobs': 'isAdmin',
        'viewCompanies': 'isAdmin',
        'addUser': 'isAdminOrCompany'
    },

    CompanyRequestController: {
        submitRequest: true,
        viewPendingRequests: 'isAdmin',
        approve: 'isAdmin',
        cancel: 'isAdmin',
    }
};
