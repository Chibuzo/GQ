/**
 * TestResult.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      test_id: {
          type: 'string'
      },

      applicant: {
          model: 'user'
      },

      percentage: {
          type: 'integer'
      },

      // not originally in expert rating
      score: {
          type: 'integer'
      },

      percentile: {
          type: 'integer'
      },

      average_score: {
          type: 'float'
      },

      test_result: {
          type: 'string'
      },

      proctor: {
          model: 'proctorsession'
      },

      transcript_id: {
          type: 'string'
      }
  }
};

