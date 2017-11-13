/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveCourse: function(req, res) {
        var q = req.param;
        var data = {
            course_title: q('course_title'),
            abstract: q('abstract'),
        };
        Course.create(data).exec(function(err, course) {
            if (err) console.log(err);
            return res.redirect('/courses/list');
        });
    },

    listCourses: function(req, res) {
        Course.find({ status: 'Active' }).exec(function(err, courses) {
            if (err) return res.badRequest();
            return res.view('course/listcourses', { courses: courses });
        });
    },

    getCourses: function(req, res) {
        Course.find().exec(function(err, courses) {
            if (err) return res.badRequest();
            return res.view('course/manage-courses', { courses: courses });
        });
    },

    addNew: function(req, res) {
        //CourseCategor.find().exec(function(err, courseCat) {
            return res.view('course/addcourse');
        //})
    }
};

