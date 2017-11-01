/**
 * CBTTest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        test_id: {
            type: 'string'
        },

        test_name: {
            type: 'string'
        },

        coverage: {
            type: 'string'
        },

        total_questions: {
            type: 'integer'
        },

        duration: {
            type: 'integer'
        },

        pass_mark: {
            type: 'integer'
        },

        category: {
            model: 'testcategory'
        }
    }
};

