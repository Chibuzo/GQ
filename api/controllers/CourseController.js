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
            body: q('body')
        };
        if (q('course_id')) {
            Course.update({ id: q('course_id') }, data).exec(function() {
                return res.redirect('/courses/list');
            });
        } else {
            Course.create(data).exec(function(err, course) {
                if (err) console.log(err);
                return res.redirect('/courses/list');
            });
        }
    },

    listCourses: function(req, res) {
        Course.find({ status: 'Active' }).exec(function(err, courses) {
            if (err) return res.badRequest();
            return res.view('course/listcourses', { courses: courses });
        });
    },

    getCourses: function(req, res) {
        Course.find().populate('subscriptions').exec(function(err, courses) {
            if (err) return res.badRequest();
            return res.view('course/manage-courses', { courses: courses });
        });
    },

    addNew: function(req, res) {
        //CourseCategor.find().exec(function(err, courseCat) {
            return res.view('course/addcourse');
        //})
    },

    editCourse: function(req, res) {
        Course.find({ id: req.param('id') }).exec(function(err, course) {
            return res.view('course/addcourse', { course: course[0] });
        });
    },

    subscribe: function(req, res) {
        if (req.session.userId) {
            var course_id = req.param('course_id');
            CourseSub.findOrCreate({ course: course_id, candidate: req.session.userId }, { course: course_id, candidate: req.session.userId }).exec(function() {});
            return res.ok();
        }
        return res.ok();
    },

    deleteCourse: function(req, res) {
        Course.destroy({ id: req.param('id') }).exec(function() {});
        return res.ok();
    }
};

