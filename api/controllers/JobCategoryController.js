/**
 * JobCategoryController
 *
 * @description :: Server-side logic for managing Jobcategories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addcategory: function(req, res) {
        JobCategory.create({ category: req.param('category') }).exec(function() {
            return res.redirect('/admin/setup');
        });
    }
};

