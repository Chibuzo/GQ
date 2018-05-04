/**
 * JobCategoryController
 *
 * @description :: Server-side logic for managing Jobcategories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	savecategory: function(req, res) {
        if (req.param('id')) {
            JobCategory.update({id: req.param('id')}, {category: req.param('category')}).exec(function() {});
            return res.ok();
        } else {
            JobCategory.create({category: req.param('category')}).exec(function () {
                return res.redirect('/admin/setup');
            });
        }
    }
};

