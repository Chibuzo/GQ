/**
 * TestResult.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      test: {
          modal: 'CBTTest'
      },

      applicant: {
          model: 'user'
      },

      percentage: {
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

      transcript_id: {
          type: 'string'
      }
  }
};

