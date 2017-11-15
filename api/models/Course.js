/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      course_title: {
          type: 'string'
      },

      abstract: {
          type: 'string'
      },

      category: {
          model: 'coursecategory'
      },

      subscriptions: {
          collection: 'coursesub',
          via: 'course'
      },

      status: {
          type: 'string',
          defaultsTo: 'Active'
      }
  }
};

