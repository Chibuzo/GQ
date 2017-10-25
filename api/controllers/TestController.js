/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	testApi: function(req, res) {
        var HTTP = require('machinepack-http');
        var data = {
            'request': {
                'authentication': {
                    'password': '1p2r9o6d4u5t1c',
                    'partner': '1296451'
                },
                'method': {
                    'name': 'GetTestList'
                }
            }
        };
        HTTP.get({
            url: '/webservices/',
            baseUrl: 'https://productivepeople.expertrating.com',
            data: data
        }).exec({
            error: function (err) {
                console.log(err.response.error.info);
            },
            requestFailed: function (err) {
                console.log(err.response.error.info);
            },
            success: function (data) {
                console.dir(data.response.error.info);
                return res.ok();
            }
        });
    }
};

