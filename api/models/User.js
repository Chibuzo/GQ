/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        fullname: {
            type: 'string'
        },

        email: {
            type: 'string',
            email: 'true',
            unique: 'true'
        },

        password: {
            type: 'string'
        },

        user_type: {
            type: 'string'
        },

        company: {
            model: 'company'
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        banned: {
            type: 'boolean',
            defaultsTo: false
        },

        status: {
            type: 'string',
            defaultsTo: 'Inactive'
        }
    }
};


