var Geonames = require('geonames.js');
var geonames = new Geonames({username: 'chibuzo', lan: 'en', encoding: 'JSON'});

module.exports = {
    getCountries: function () {
        return new Promise(function(resolve, reject) {
            geonames.countryInfo({}).then(function(countries){
                return resolve({ countries: countries });
            }).catch(function(err){
                console.log(err);
            });
        });
    },

    getCountryStates: function(country_id) {
        geonames.siblings({geonameId: '719819'}).then(function(resp){
            console.log(resp);
        });
    }
}