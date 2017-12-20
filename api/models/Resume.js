/**
 * Resume.js
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
            unique: 'true',
            email: 'true',
        },

        gender: {
            type: 'string'
        },

        phone: {
            type: 'string',
            unique: 'true'
        },

        country: {
            type: 'string'
        },

        r_state: {
            type: 'string'
        },

        city: {
            type: 'string'
        },

        address: {
            type: 'string'
        },

        introduction: {
            type: 'string'
        },

        educations: {
            collection: 'education',
            via: 'resume'
        },

        qualifications: {
            collection: 'qualification',
            via: 'resume'
        },

        employments: {
            collection: 'employment',
            via: 'resume'
        },

        referencecontacts: {
            collection: 'referencecontact',
            via: 'resume'
        },

        employment_status: {
            type: 'string'
        },

        available_date: {
            type: 'date'
        },

        expected_salary: {
            type: 'float'
        },

        video_file: {
            type: 'string'
        },

        passport: {
            type: 'string'
        },

        user: {
            model: 'user'
        },

        status: {
            type: 'string',
            defaultsTo: 'Incomplete'
        }
    }
};

