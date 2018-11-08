'use strict';

const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var options = {
    viewEngine: 'express-handlebars',
    viewPath: sails.config.appPath + '/views/emails/'
};
let transporter = nodemailer.createTransport({
    //host: 'email-smtp.us-east-1.amazonaws.com',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        // user: 'AKIAJWG4GYVXU25FAE3Q',
        // pass: 'An1W3fla+EB6cCgehn+rLukdFxzO7DgoSz/oMg4cAvqU'
        user: 'noreply@getqualified.work',
        pass: 'GQ+18#n3w@pzwd&'
    }
});
transporter.use('compile', hbs(options));

const BASE_URL = sails.config.baseurl;
const SENT_FROM = 'noreply@getqualified.work';
const GQ_EMAIL = 'support@getqualified.work';
const PRODUCTIVE_PEOPLE_EMAIL = 'sefinatu.atta@productivepeople.org';

module.exports = {
    companyVerification: function(coy) {
        var email_b64 = new Buffer(coy.contact_email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(coy.contact_email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');

        let mailOptions = {
            from: '"Get Qualified" <' + SENT_FROM + '>',
            to: coy.contact_person + ', ' + coy.contact_email,
            subject: 'Welcome to GetQualified: Activate your account',
            template: 'company_verification',
            context: {
                //company: coy.company_name,
                contact_person: coy.contact_person,
                url: BASE_URL + 'coy/setup/' + hash + '/' + email_b64
            }
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //console.log('Message sent: %s', info.messageId);
        });
    },

    // candidate verification email
    sendConfirmationEmail: function(user) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var data = {
            user: user.fullname,
            url: BASE_URL + 'user/activate/' + email_b64 + '/' + hash
        };
        var subject = "Confirm your email address";
        var template = 'verifyAccount';
        module.exports.sendMail(user.email, subject, template, data);
    },

    sendCompanyInviteEmail: function(user, coy) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'thishastobesomethingextremelynonsensicalanduseless').digest('hex');
        var data = {
            user: user.fullname,
            company: coy.company_name,
            contact_person: coy.contact_person,
            url: BASE_URL + 'company/activate-user/' + hash + '/' + email_b64
        };
        var subject = "You're invited to join " + coy.company_name + " on GetQualified";
        var template = 'companyUserVerification';
        module.exports.sendMail(user.email, subject, template, data);
    },

    sendAppliedJobNotice: function(job, user, msg_type) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var date_opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var fyi, newuser, incompleteprofile;
        switch(msg_type) {
            case 'fyi':
                fyi = true;
                break;
            case 'new-user':
                newuser = true;
                break;
            case 'incomplete-profile':
                incompleteprofile = true;
                break;
            default:
                break;
        }
        // determine company name
        let company = '';
        //let source = 'GQ';
        let GJ = false;
        let GQ = false;
        if (job.source !== 'GQ') {
            company = job.company_name;
            GJ = true;
        } else {
            company = job.company.company_name;
            GQ = true;
        }
        var data = {
            user: user.fullname.length > 1 ? user.fullname : 'Candidate',
            job_title: job.job_title,
            company: company,
            fyi: fyi,
            cobrand: GJ,
            nobrand: GQ,
            newuser: newuser,
            incompleteprofile: incompleteprofile,
            closing_date: job.closing_date.toLocaleDateString('en-US', date_opt),
            activation_url: BASE_URL + 'user/activate/' + email_b64 + '/' + hash,
            url: BASE_URL
        };
        var subject = "Application for the position of " + job.job_title + " at " + company;
        var template = 'appliedJobNotice';
        module.exports.sendMail(user.email, subject, template, data);
    },

    customSendAppliedJobNotice: function(name, email) {
        var data = {
            user: name,
        };
        var subject = "GetQualified - Congratulations!!!";
        var template = 'customAppliedJobNotice';
        let mailOptions = {
            from: '"Get Qualified" <' + SENT_FROM + '>',
            to: email,
            replyTo: 'support@getqualified.work',
            subject: subject,
            template: template,
            context: data
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(email);
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
        //module.exports.sendMail(email, subject, template, data);
    },

    // sent after company account activation
    companyIntroduction: function(email, contact_person) {
        var data = {
            contact_person: contact_person
        };
        var subject = "Activation completed";
        var template = 'companyIntro';
        module.exports.sendMail(email, subject, template, data);
    },

    // on company sign up request
    companySignUpRequest: function(coy) {
        var data = {
            contact_person: coy.contact_person,
        };
        var subject = "Hello, from GetQualified";
        var template = 'companySignUp';

        module.exports.sendMail(coy.contact_email, subject, template, data);
    },

    // company new job
    companyNewJobAlert: function(email, contact_person, job_role) {
        var data = {
            contact_person: contact_person,
            job_role: job_role
        };
        var subject = "You have successfully created jobs on your GetQualified";
        var template = 'companyNewJob';
        module.exports.sendMail(email, subject, template, data);
    },

    // company request to interview candidates
    companyRequestCandidateInterview: function(companyName, jobTitle, users) {
        var subject = `${companyName} Would Like To Interview Candidates for ${jobTitle}`;
        var template = 'companyInterviewRequest';

        let data = {
            companyName,
            jobTitle,
            users
        }
        module.exports.sendMail(PRODUCTIVE_PEOPLE_EMAIL, subject, template, data);
    },

    // on shortlisted candidates
    candidatesShortlistAlert: function(email, role, contact_person) {
        var data = {
            contact_person: contact_person,
            role
        };
        var subject = role + " Your candidates have been shortlisted";
        var template = 'companyShortlist';
        module.exports.sendMail(email, subject, template, data);
    },

    sendPswdResetLink: function(user) {
        var email_b64 = new Buffer(user.email).toString('base64');
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(user.email + 'okirikwenEE129Okpkenakai').digest('hex');

        var data = {
            user: user.fullname,
            url: BASE_URL + 'user/resetpassword/' + email_b64 + '/' + hash
        };
        var subject = "Your GetQualified Password Reset Link";
        var template = 'passwordReset';
        module.exports.sendMail(user.email, subject, template, data);
    },

    // admin emails
    GQnewJobAlert: function(coy_name) {

    },

    // company creates new user
    GQCompanyNewUserAlert: function(user_name) {

    },

    // on company activation
    GQNewActiveCompany: function() {

    },


    // when candidate cheats during test
    notifyOnTestCheat: (user, test_name) => {
        var data = {
            user: user.fullname,
            test: test_name
        };
        var subject = "GetQualified has rejected your test result";
        var template = 'testCancellationNotice';
        module.exports.sendMail(user.email, subject, template, data);
    },


    notifyOnJobTestCheat: function(user, job_title) {
        var data = {
            user: user.fullname,
            job_title: job_title
        };
        var subject = "GetQualified has cancelled your competency test result";
        var template = 'jobtestCancellationNotice';
        module.exports.sendMail(user.email, subject, template, data);
    },


    testResetNotification: function(user) {
        var data = {
            user: user.fullname,
        };
        var subject = "GetQualified has Reset your Aptitude test";
        var template = 'testResetNotice';
        module.exports.sendMail(user.email, subject, template, data);
    },


    // after candidate activates their account
    welcomeNewCandidate: function(user) {
        var data = {
            user: user.fullname,
            url: BASE_URL + 'login'
        };
        var subject = "Welcome to GetQualified";
        var template = 'welcomeNewCandidate';
        module.exports.sendMail(user.email, subject, template, data);
    },


    emailCandidates: function(emails, subject, message) {
        var data = {
            message: message
        };

        var template = 'emailCandidates';
        let mailOptions = {
            from: '"Get Qualified" <' + SENT_FROM + '>',
            to: 'support@getqualified.work',
            subject: subject,
            bcc: emails,
            template: template,
            context: data
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //console.log('Message sent: %s', info.messageId);
        });
        //module.exports.sendMail(emails, subject, template, data);
    },

    notifyMe: function(count) {
        var data = {
            count: count,
        };
        var subject = "GQ Weekly Job Statistics Sent to Guardian";
        var template = 'GJstat';
        module.exports.sendMail('chibuzo.henry@gmail.com', subject, template, data);
    },

    sendMail: function(to, subject, template, data) {
        let mailOptions = {
            from: '"Get Qualified" <' + SENT_FROM + '>',
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
            //console.log('Message sent: %s', info.messageId);
        });
    }
}
