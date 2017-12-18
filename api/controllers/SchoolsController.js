/**
 * SchoolsController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getSchools: function(req, res) {
        Schools.find().sort('abbr asc').exec(function(err, schools) {
            return res.json(200, { status: 'success', schools: schools });
        });
    }
};

