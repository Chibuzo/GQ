'use strict';
const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var options = {
    viewEngine: 'express-handlebars',
    viewPath: sails.config.appPath + '/views/emails/'
};
let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'noreply@getqualified.work',
        pass: 'change+this'
    }
});
transporter.use('compile', hbs(options));

const BASE_URL = 'https://getqualified.work/';

module.exports = {
    sendVerificationEmail: function(coy) {
        var email_b64 = new Buffer(coy.contact_email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(coy.contact_email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');

        let mailOptions = {
            from: '"Get Qualified" <noreply@getqualified.work>', // sender address
            to: coy.contact_person + ', ' + coy.contact_email,
            subject: 'GQ Company Verification', // Subject line
            template: 'company_verification',
            context: {
                company: coy.company_name,
                contact_person: coy.contact_person,
                url: BASE_URL + 'coy/setup/' + hash + '/' + email_b64
            }
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    },

    sendConfirmationEmail: function(user) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var data = {
            user: user.fullname,
            url: BASE_URL + 'user/activate/' + email_b64 + '/' + hash
        };
        var subject = "Get Qualified - Confirm your email address";
        var template = 'verifyAccount';
        module.exports.sendEmail(user.email, subject, template, data);
    },
    
    sendCompanyInviteEmail: function(user, coy) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');
        var data = {
            user: user.fullname,
            company: coy.company_name,
            contact_name: coy.contact_person,
            url: BASE_URL + 'company/activate-user/' + hash + '/' + email_b64
        };
        var subject = "You're invited to join " + coy.company_name + " on GetQualified";
        var template = 'companyUserVerification';
        module.exports.sendEmail(user.email, subject, template, data);
    },
    
    sendAppliedJobNotice: function(job, user) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var data = {
            user: user.fullname,
            job_title: job.job_title,
            company: job.company.company_name,
            url: BASE_URL + 'user/activate/' + email_b64 + '/' + hash
        };
        var subject = "Application for the position of ". job.job_title + " with " + job.company_name;
        var template = 'appliedJobNotice';
        module.exports.sendEmail(user.email, subject, template, data);
    },

    companySignupRequest: function(coy) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var data = {
            user: user.fullname,
            job_title: job.job_title,
            company: job.company.company_name,
            url: BASE_URL + 'user/activate/' + email_b64 + '/' + hash
        };
        var subject = "Hello, from GetQualified team";
        var template = 'companySignUp';
        module.exports.sendEmail(user.email, subject, template, data);
    },

    passwordRecoveryLink: function(user) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var data = {
            user: user.fullname,
            job_title: job.job_title,
            company: job.company.company_name,
            url: BASE_URL + 'user/activate/' + email_b64 + '/' + hash
        };
        var subject = "Your GetQualified Password Reset Link";
        var template = 'companySignUp';
        module.exports.sendEmail(user.email, subject, template, data);
    },


    sendMail: function(to, subject, template, data) {
        let mailOptions = {
            from: '"Get Qualified" <noreply@getqualified.work>',
            to: to,
            subject: subject,
            template: template,
            context: data
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}
