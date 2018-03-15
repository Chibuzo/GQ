'use strict';

const CLIENT_ID = '299471869990-6hd22d0dsevi56lbg8ier0m4g3ooncas.apps.googleusercontent.com';
const CLIENT_SECRET = '79rrgeVw1GZQsptVQ1oKvywK';
const REDIRECT_URL = 'https://getqualified.work/getYoutubeAccessToken';

const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

module.exports = {
    getToken: function() {
        return new Promise(function(resolve, reject) {
            const fs = require('fs');
            var tokens = JSON.parse(fs.readFileSync(require('path').resolve(sails.config.appPath, "config/youtube_tokens.json"), 'utf8'));
            if (!tokens.access_token) {
                var url = oauth2Client.generateAuthUrl({
                    access_type: 'offline',
                    scope: 'https://www.googleapis.com/auth/youtube',
                });
                return resolve({ state: 'refresh', url: url });
            } else {
                oauth2Client.setCredentials(tokens);
                if (parseInt(tokens.expiry_date) > parseInt(Date.now())) {
                    return resolve({ state: 'ok', tokens: tokens });
                } else {
                    oauth2Client.refreshAccessToken(function(err, tokens) {
                        if (err) return reject(err);
                        if (tokens) {
                            fs.writeFile(require('path').resolve(sails.config.appPath, "config/youtube_tokens.json"), JSON.stringify(tokens), 'utf8', function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                        }
                        if (!err) {
                            oauth2Client.setCredentials(tokens);
                            return resolve({ state: 'ok', tokens: tokens });
                        }
                    });
                }
            }
        });
    },

    authenticate: function(code) {
        return new Promise(function(resolve, reject) {
            const fs = require('fs');
            var tokens = JSON.parse(fs.readFileSync(require('path').resolve(sails.config.appPath, "config/youtube_tokens.json"), 'utf8'));
            if (tokens.access_token) {
                oauth2Client.setCredentials(tokens);
                return resolve(tokens);
            } else {
                oauth2Client.getToken(code, function(err, tokens) {
                    if (err) return reject(err);
                    // Now tokens contains an access_token and an optional refresh_token. Save them.
                    if (tokens) {
                        fs.writeFile(require('path').resolve(sails.config.appPath, "config/youtube_tokens.json"), JSON.stringify(tokens), 'utf8', function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }
                    if (!err) {
                        oauth2Client.setCredentials(tokens);
                        return resolve(tokens);
                    }
                });
            }
        });
    },


    deleteVideo: function(video_id) {

        var fs = require('fs');
        var readline = require('readline');
        var google = require('googleapis');
        var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/google-apis-nodejs-quickstart.json
        var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
        var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
            process.env.USERPROFILE) + '/.credentials/';
        var TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';

        // Load client secrets from a local file.
        authorize(JSON.parse(content), {'params': {'id': '',
            'onBehalfOfContentOwner': ''}}, videosDelete);

        /**
         * Create an OAuth2 client with the given credentials, and then execute the
         * given callback function.
         *
         * @param {Object} credentials The authorization client credentials.
         * @param {function} callback The callback to call with the authorized client.
         */
        function authorize(credentials, requestData, callback) {
            var clientSecret = credentials.installed.client_secret;
            var clientId = credentials.installed.client_id;
            var redirectUrl = credentials.installed.redirect_uris[0];
            var auth = new googleAuth();
            var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH, function(err, token) {
                if (err) {
                    getNewToken(oauth2Client, requestData, callback);
                } else {
                    oauth2Client.credentials = JSON.parse(token);
                    callback(oauth2Client, requestData);
                }
            });
        }

        /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         *
         * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
         * @param {getEventsCallback} callback The callback to call with the authorized
         *     client.
         */
        function getNewToken(oauth2Client, requestData, callback) {
            var authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });
            console.log('Authorize this app by visiting this url: ', authUrl);
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Enter the code from that page here: ', function(code) {
                rl.close();
                oauth2Client.getToken(code, function(err, token) {
                    if (err) {
                        console.log('Error while trying to retrieve access token', err);
                        return;
                    }
                    oauth2Client.credentials = token;
                    storeToken(token);
                    callback(oauth2Client, requestData);
                });
            });
        }

        /**
         * Store token to disk be used in later program executions.
         *
         * @param {Object} token The token to store to disk.
         */
        function storeToken(token) {
            try {
                fs.mkdirSync(TOKEN_DIR);
            } catch (err) {
                if (err.code != 'EEXIST') {
                    throw err;
                }
            }
            fs.writeFile(TOKEN_PATH, JSON.stringify(token));
            console.log('Token stored to ' + TOKEN_PATH);
        }

        /**
         * Remove parameters that do not have values.
         *
         * @param {Object} params A list of key-value pairs representing request
         *                        parameters and their values.
         * @return {Object} The params object minus parameters with no values set.
         */
        function removeEmptyParameters(params) {
            for (var p in params) {
                if (!params[p] || params[p] == 'undefined') {
                    delete params[p];
                }
            }
            return params;
        }

        /**
         * Create a JSON object, representing an API resource, from a list of
         * properties and their values.
         *
         * @param {Object} properties A list of key-value pairs representing resource
         *                            properties and their values.
         * @return {Object} A JSON object. The function nests properties based on
         *                  periods (.) in property names.
         */
        function createResource(properties) {
            var resource = {};
            var normalizedProps = properties;
            for (var p in properties) {
                var value = properties[p];
                if (p && p.substr(-2, 2) == '[]') {
                    var adjustedName = p.replace('[]', '');
                    if (value) {
                        normalizedProps[adjustedName] = value.split(',');
                    }
                    delete normalizedProps[p];
                }
            }
            for (var p in normalizedProps) {
                // Leave properties that don't have values out of inserted resource.
                if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
                    var propArray = p.split('.');
                    var ref = resource;
                    for (var pa = 0; pa < propArray.length; pa++) {
                        var key = propArray[pa];
                        if (pa == propArray.length - 1) {
                            ref[key] = normalizedProps[p];
                        } else {
                            ref = ref[key] = ref[key] || {};
                        }
                    }
                };
            }
            return resource;
        }


        function videosDelete(auth, requestData) {
            var service = google.youtube('v3');
            var parameters = removeEmptyParameters(requestData['params']);
            parameters['auth'] = auth;
            service.videos.delete(parameters, function(err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }
                console.log(response);
            });
        }
    }
}