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
          type: 'float'
      },

      percentile: {
          type: 'float'
      },

      average_score: {
          type: 'float'
      },

      test_result: {
          type: 'string'
      },

      transcript_id: {
          type: 'string'
      }
  }
};

