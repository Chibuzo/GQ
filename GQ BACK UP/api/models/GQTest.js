/**
 * GQTest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      test_name: {
          type: 'string'
      },

      category: {
          type: 'string'
      },

      difficulty: {
          type: 'string'
      },

      duration: {
          type: 'integer' // in minutes
      },

      instructions: {
          type: 'text'
      },

      questions: {
          collection: 'gqtestquestions',
          via: 'test'
      },

      status: {
          type: 'string',
          defaultsTo: 'Active'
      }
  }
};

