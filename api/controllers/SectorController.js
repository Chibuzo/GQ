/**
 * SectorController
 *
 * @description :: Server-side logic for managing Sectors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addSector: function(req, res) {
        Sector.create({ title: req.param('sector') }).exec(function(err) {
            if (err) console.log(err);
            return res.redirect('/admin/setup');
        });
    }
};

