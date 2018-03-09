/**
 * CompanyUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        //user: {
        //    model: 'user'
        //},
        fullname: {
            type: 'string'
        },

        email: {
            type: 'string'
        },

        company: {
            model: 'company'
        },

        address: {
            type: 'string'
        },

        country: {
            model: 'country'
        },

        r_state: {
            model: 'countrystate'
        },

        city: {
            type: 'string'
        },

        status: {
            type: 'string',
            defaultsTo: 'Inactive'
        }
    }
};

