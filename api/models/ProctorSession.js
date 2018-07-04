/**
 * ProctorSession.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      integrity_score: {
          type: 'integer',
          defaultsTo: 0
      },

      test_id: {
          type: 'integer'
      },

      test_source: {
          type: 'string', // GQ, XPR
          defaultsTo: 'GQ'
      },

      user_id: {
          type: 'integer'
      },

      status: {
          type: 'string',
          defaultsTo: 'Pending' // Accepted, Rejected
      },

      noFaceCount: {
          type: 'integer',
          defaultsTo: -1
      },

      noiseCount: {
          type: 'integer',
          defaultsTo: -1
      },

      multipleFacesCount: {
          type: 'integer',
          defaultsTo: -1
      }
  }
};
