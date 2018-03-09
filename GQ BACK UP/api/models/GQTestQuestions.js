/**
 * GQTestQuestions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      test: {
          model: 'gqtest'
      },

      question: {
          type: 'text'
      },

      image_file: {
          type: 'string'
      },

      opt_a: {
          type: 'string'
      },

      opt_b: {
          type: 'string'
      },

      opt_c: {
          type: 'string'
      },

      opt_d: {
          type: 'string'
      },

      opt_e: {
          type: 'string'
      },

      answer: {
          type: 'string'
      }
  }
};

