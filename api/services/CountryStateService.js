var Geonames = require('geonames.js');
var geonames = new Geonames({username: 'chibuzo', lan: 'en', encoding: 'JSON'});

module.exports = {
    getCountries: function () {
        return new Promise(function(resolve, reject) {
            Country.find().sort('country asc').exec(function(err, countries) {
                States.find().sort('state_name asc').exec(function(err, states) {
                    return resolve({ countries: countries, states: states });
                });
            });
        });
    },

    getCountryStates: function(country_id) {

    }
}