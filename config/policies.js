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

    JobController: {
        'viewJobs': 'isLoggedIn',
        'newJobForm':'isLoggedIn',
        'editJob': 'isLoggedIn',
        'viewJobs': 'isLoggedIn',
        'saveJob': 'isLoggedIn',
        'deleteJob': 'isLoggedIn'
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

    },

    CourseCategory: {
        '*': 'isAdmin'
    },

    GQTestController: {
        loadTestInstruction: 'isLoggedIn',
        loadTest: 'isLoggedIn',
        markTest: 'isLoggedIn',
        markGQTest: 'isLoggedIn',
        deleteTest: 'isAdmin',
        deleteQuestion: 'isAdmin',
        manageTest: 'isAdmin',
        saveTest: 'isAdmin',
        saveQuestion: 'isAdmin',
        uploadQuestions: 'isAdmin',
        editTest: 'isAdmin'
    },

    selectedCandidateController: {
        '*': 'isAdmin'
    },

    CompanyRequest: {
        '*': 'isAdmin'
    }
};
