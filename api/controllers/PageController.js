/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        var today = new Date().toISOString();
        User.count({ user_type: 'Application'}).exec(function(err, users) {
            Job.count({ closing_date: { '>=': today } }).exec(function(err, jobs) {
                Course.count().exec(function (err, courses) {
                    return res.view('index', { candidates: users, courses: courses, jobs: jobs });
                });
            });
        });
    }
};

