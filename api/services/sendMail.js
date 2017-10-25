/**
 * Created by Uzo on 3/15/2017.
 */

module.exports = {
    sendEmail: function(template, data, opts, cb) {
        sails.hooks.email.send(template, data, opts, cb);
    },
    
    sendVerificationEmail: function(coy) {
        var base_url = 'http://144.217.245.35:1330/';
        var email_b64 = new Buffer(coy.contact_email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(coy.contact_email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');
        var data = {
            company: coy.company_name,
            contact_name: coy.contact_person,
            email: coy.contact_email,
            url: base_url + 'coy/setup/' + hash + '/' + email_b64
        };
        var opts = {
            from: "Get Qualified <no-reply@getqualifed.ng>",
            sender: "no-reply@getqualifed.ng",
            to: 'chibuzo.henry@gmail.com',
            subject: "GQ Company Verification"
        };
        module.exports.sendEmail('verificationEmail', data, opts, function(err) {
            if (err) console.log(err);
        });
    },

    sendConfirmationEmail: function(user) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var data = {
            user: user.fullname,
            email: email_b64,
            hash: hash
        };
        var opts = {
            from: "Get Qualified <no-reply@getqualified.ng>",
            sender: "no-reply@getqualified.ng",
            to: user.email,
            subject: "Get Qualified - Confirm Your Account"
        };
        module.exports.sendEmail('activationEmail', data, opts, function(err) {
            if (err) console.log(err);
        });
    },
    
    sendErrMsg: function(err, data) {

    },
    
    sendWalletBackUpEmail: function(username, email, mnemonic) {
        var data = {
            user: username,
            mnemonic: mnemonic
        };
        var opts = {
            from: "CapitalX <no-reply@capitalx.ng>",
            sender: "no-reply@capitalx.ng",
            to: email,
            subject: "Capitalx Bitcoin Wallet backup"
        };
        module.exports.sendEmail('walletBackupEmail', data, opts, function(err) {
            if (err) console.log(err);
        });
    }
    
   
}
