/**
 * UserStatistics.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
          type: 'integer',
          primaryKey: true
        },

        all_applicants: {
          type: 'integer'
        },

        active_applicants: {
          type: 'integer'
        },

        complete_resume: {
          type: 'integer'
        },

        photos: {
          type: 'integer'
        },

        test: {
          type: 'integer'
        },

        test_in_progress: {
          type: 'integer'
        },

        videos: {
          type: 'integer'
        }
    }
};

