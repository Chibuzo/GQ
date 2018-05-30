/**
 * Company.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        company_name: {
          type: 'string'
        },

        sector: {
            type: 'string'
        },

        description: {
            type: 'text'
        },

        address: {
            type: 'string'
        },

        //country: {
        //    model: 'country'
        //},
        country: {
            type: 'string'
        },

        r_state: {
            type: 'string'
        },

        city: {
            type: 'string'
        },

        contact_person: {
          type: 'string'
        },

        contact_phone: {
          type: 'string'
        },

        contact_email: {
          type: 'string'
        },

        logo_name: {
            type: 'string'
        },

        status: {
          type: 'string',
          defaultsTo: 'Active'
        }
    }
};

