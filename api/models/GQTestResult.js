/**
 * GQTestResult.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      test: {
          model: 'gqtest'
      },

      candidate: {
          model: 'user'
      },

      score: {
          type: 'integer'
      },

      no_of_questions: {
          type: 'integer'
      },

      result: {
          type: 'string'
      },

      proctor: {
          model: 'proctorsession'
      }
  }
};

