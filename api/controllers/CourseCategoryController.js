/**
 * CourseCategoryController
 *
 * @description :: Server-side logic for managing Coursecategories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    saveCategory: function(req, res) {
        if (req.param('category_id')) {
            CourseCategory.update({ id: req.param('category_id') }, { category: req.param('category') }).exec(function() {});
        } else {
            CourseCategory.create({ category: req.param('category') }).exec(function() {});
        }
        return res.redirect('/admin/manage-courses');
    },


    deleteCategory: function(req, res) {
        Course.count({ category: req.param('category_id') }).exec(function(err, num) {
            if (num < 1) {
                CourseCategory.destroy({ id: req.param('category_id') }).exec(function() {});
                return res.json(200, { status: 'success' });
            } else {
                // you can't delete category with courses!
                return res.json(200, { status: 'error', msg: "You can't delete this category because it still has some courses under it." });
            }
        });
    }
	
};

