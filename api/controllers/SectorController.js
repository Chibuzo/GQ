/**
 * SectorController
 *
 * @description :: Server-side logic for managing Sectors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveSector: function(req, res) {
        if (req.param('id')) {
            Sector.update({id: req.param('id')}, {title: req.param('sector')}).exec(function() {});
            return res.ok();
        } else {
            Sector.create({title: req.param('sector')}).exec(function (err) {
                if (err) console.log(err);
                return res.redirect('/admin/setup');
            });
        }
    }
};

