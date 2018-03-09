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
    }
}