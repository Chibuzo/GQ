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
        CountryStateService.getCountries().then(function(resp) {
            resp.countries.geonames.forEach(function(country) {
                Country.create({ country: country.countryName }).exec(function(err, country) {});
            }).catch(function(err) {
                return res.ok();
            });
        });
        return res.ok();
    },

    loadStates: function (req, res) {
        var states = [{"id":"1","state_name":"Abuja"}, {"id":"2","state_name":"Anambra"}, {"id":"3","state_name":"Enugu"}, {"id":"4","state_name":"Akwa Ibom"}, {"id":"5","state_name":"Adamawa"}, {"id":"6","state_name":"Abia"}, {"id":"7","state_name":"Bauchi"}, {"id":"8","state_name":"Bayelsa"}, {"id":"9","state_name":"Benue"}, {"id":"10","state_name":"Borno"}, {"id":"11","state_name":"Cross River"}, {"id":"12","state_name":"Delta"}, {"id":"13","state_name":"Ebonyi"}, {"id":"14","state_name":"Edo"}, {"id":"15","state_name":"Ekiti"}, {"id":"16","state_name":"Gombe"}, {"id":"17","state_name":"Imo"}, {"id":"18","state_name":"Jigawa"}, {"id":"19","state_name":"Kaduna"}, {"id":"20","state_name":"Kano"}, {"id":"21","state_name":"Katsina"}, {"id":"22","state_name":"Kebbi"}, {"id":"23","state_name":"Kogi"}, {"id":"24","state_name":"Kwara"}, {"id":"25","state_name":"Lagos"}, {"id":"26","state_name":"Nasarawa"}, {"id":"27","state_name":"Niger"}, {"id":"28","state_name":"Ogun"}, {"id":"29","state_name":"Ondo"}, {"id":"30","state_name":"Osun"}, {"id":"31","state_name":"Oyo"}, {"id":"32","state_name":"Plateau"}, {"id":"33","state_name":"Rivers"}, {"id":"34","state_name":"Sokoto"}, {"id":"35","state_name":"Taraba"}, {"id":"36","state_name":"Yobe"}, {"id":"37","state_name":"Zamfara"}];
        states.forEach(function(state) {
            States.create({ state_name: state.state_name }).exec(function() {});
        });
        return res.ok();
    }
};

