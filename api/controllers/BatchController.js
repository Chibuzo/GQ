/**
 * BatchController
 *
 * @description :: Server-side logic for managing Batches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadSchools: function(req, res) {
        //Schools.destroy({}).exec(function () {});
        const fs = require('fs');
        var csvpath = "assets/csv-files/csv7.csv";
        fs.readFile(csvpath, 'utf8', function(err, data) {
            console.log(err);
            var rows = data.split('\n');
            // sign up the applicants
            rows.forEach(function (row) {
                var entry = row.split(',');
                if (entry[1] === undefined || entry[1] == null || entry[2] === undefined || entry[2] == null) {}
                else {
                    var abbr = entry[1].replace(/['"]+/g, '');
                    var school = entry[2].replace(/['"]+/g, '');
                    Schools.create({ abbr: abbr, school_name: school }).exec(function () {});
                }
            });
        });
    },

    countries: function (req, res) {
        CountryStateService.getCountryStates(658);
        return res.ok();
    }
};

