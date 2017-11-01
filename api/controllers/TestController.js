/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	testApi: function(req, res) {
        var request = require('request');
        //var request = require('superagent');
        var body = {
            "request": {
                "authentication": {
                    "password": "1p2r9o6d4u5t1c",
                    "partnerid": "1296451"
                },
                "method": {
                    "name": "GetTestList"
                }
            }
        };

        //request.post('https://assessments.getqualified.work/webservices/')
        //    //.set('Content-Type', 'application/x-www-form-urlencode')
        //    .set('Content-Type', 'application/json')
        //    //.type('form')
        //    .send(body)
        //    .end((err, res) => {
        //        //if (err) console.log(err);
        //        console.log(res.text);
        //});
        var option = {
            url: "https://assessments.getqualified.work/webservices/",
            //headers: { "Content-Type": 'application/x-www-form-urlencode' },
            method: "POST",
            body: { "request": {
                    "authentication": {
                        "password": "1p2r9o6d4u5t1c",
                        "partnerid": "1296451"
                    },
                    "method": {
                        "name": "GetTestList"
                    }
                }},
                json: true
            };
        request(option, function(err, response, body) {
            console.log(err);
            //console.log('Response: ' + JSON.stringify(response));
            console.log('Body: ' + JSON.stringify(body));
        });
    }
};

