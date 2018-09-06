/**
 * TestState.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  //connection: 'MysqlServer',
  tableName: 'teststate',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true
        },

        candidate: {
            model: 'user',
            columnName: 'candidate'
        },

        test: {
            model: 'gqtest',
            columnName: 'test'
        },

        time_elapsed: {
            type: 'string',
            columnName: 'time_elapsed'
        },

        proctor_data: {
            type: 'string',
            columnName: 'proctor_data'
        },

        proctor_session: {
            type: 'integer',
            columnName: 'proctor_session'
        },

        answered_questions: {
            type: 'string',
            columnName: 'answered_questions'
        }
    }
};

