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

        dob: {
            type: 'date'
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
            type: 'text'
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

        current_salary: {
            type: 'float'
        },

        expected_salary: {
            type: 'float'
        },

        video_file: {
            type: 'string'
        },

        youtube_vid_id: {
            type: 'string'
        },

        photo: {
            type: 'string'
        },

        photo_status: {
            type: 'boolean',
            defaultsTo: 'false'
        },

        profile_status: {
            type: 'boolean',
            defaultsTo: 'false'
        },

        video_status: {
            type: 'boolean',
            defaultsTo: 'false'
        },

        test_status: {
            type: 'boolean',
            defaultsTo: 'false'
        },

        scrapped: {
            type: 'boolean',
            defaultsTo: 'false'
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

