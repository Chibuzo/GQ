/**
 * Employment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      company: {
          type: 'string'
      },

      role: {
          type: 'string'
      },

      start_date: {
          type: 'date'
      },

      end_date: {
          type: 'date'
      },

      resume: {
          model: 'resume'
      }
  }
};

