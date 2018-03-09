/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	testApi: function(req, res) {
        var request = require('request');
        var qs = require('querystring');
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

        var option = {
            url: "https://assessments.getqualified.work/webservices/",
            method: "POST",
            form: qs.stringify(body),
            json: true
        };
        request(option, function(err, response, body) {
            console.log(err);
            //console.log('Response: ' + JSON.stringify(response));
            console.log('Body: ' + JSON.stringify(body));
        });
    },

    saveTest: function(req, res) {
        var data = { "records":
        [{
            "test_id": 6683,
            "test_name": "Demo Adobe Photoshop CS3 Test",
            "coverage": "Layers ;Type ;Automating Tasks and Keyboard Shortcuts ;Workspace ;Working with Images, Retouching and Transforming ;Color Management ;Color and Tonal Adjustments ;Using Selection and Drawing ;Filters and Saving Images ;Working With Web, Video and Animation",
            "total_questions": 10,
            "duration": 10,
            "passing_marks": 60,
            "category": "Demo Tests"
        }, {
            "test_id": 6684,
            "test_name": "Demo Programming with C++ Test",
            "coverage": "Classes ;Constructors ;Variables and Datatypes",
            "total_questions": 10,
            "duration": 10,
            "passing_marks": 60,
            "category": "Demo Tests"
        }, {
            "test_id": 6685,
            "test_name": "Demo HTML 4.01 Test",
            "coverage": "Advanced Tags ;Fundamentals ;Tags ;Tables ;Links and Images ;Forms and Frames",
            "total_questions": 10,
            "duration": 10,
            "passing_marks": 60,
            "category": "Demo Tests"
        }, {
            "test_id": 6682,
            "test_name": "Demo Editing Skills Certification",
            "coverage": "Prepositions ;Parallel Construction ;Comma Usage ;Punctuation ;Misplaced Modifiers ;Apostrophe Usage ;Sentence Structure ;Pronoun Usage ;Tenses ;Article Usage",
            "total_questions": 10,
            "duration": 10,
            "passing_marks": 60,
            "category": "Demo Tests"
        }, {
            "test_id": 10169,
            "test_name": "Productive People Sales Aptitude Test",
            "coverage": "",
            "total_questions": 90,
            "duration": 75,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10202,
            "test_name": "GetQualified Graduate Python Test",
            "coverage": "",
            "total_questions": 142,
            "duration": 110,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10154,
            "test_name": "Productive People Business Analyst Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10155,
            "test_name": "Productive People Quality Assurance Associate Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10160,
            "test_name": "Productive People Information Security Officer Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10153,
            "test_name": "Productive People Software Engineer Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10152,
            "test_name": "Productive People Software Engineer- Front End Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10148,
            "test_name": "Productive People Business Intelligence Consultant Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10147,
            "test_name": "Productive People Database Administrator Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10149,
            "test_name": "Productive People Project Manager Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10146,
            "test_name": "Productive People Enterprise Architect Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }, {
            "test_id": 10145,
            "test_name": "Productive People UI Developer Test",
            "coverage": "",
            "total_questions": 110,
            "duration": 90,
            "passing_marks": 60,
            "category": "Intelligence and Aptitude"
        }]};

        CBTService.saveTest(data);
    },

    getLandingPage: function (req, res) {
        var request = require('request');
        var qs = require('querystring');

        req.session.job_id = req.param('job_id');

        var data = {
            password: '1p2r9o6d4u5t1c',
            partnerid: '1296451',
            testid: req.param('test_id'),
            partneruserid: req.session.userId,
            returnURL: 'https://getqualified.work/test/show-result/' + req.param('test_id'),
            dev: false,
            debug: false,
            //secure_mode: 1,
            //browser_proctoring: 1,
            //webcam_proctoring: 1,
            //webcam_mandatory: 1,
            //reuse: true,
            er_internal: '1296451'
        };
        //console.log(data)
        request.post('https://assessments.getqualified.work/webservices/generateticket.aspx', { form: qs.stringify(data) }, function(err, response, body) {
            var result = JSON.parse(body);
            if (err || result.response.info.success != 1) {
                // show error page
            }
            return res.redirect(result.response.info.ticket);
        });
    },
    
    receiveAndSaveResult: function (req, res) {
        var temp = Object.keys(req.body);
        temp += ':' + req.body[temp];
        var data = JSON.parse(temp);
        var result = data.request.method;

        CBTTest.find({ test_id: result.test_id }).exec(function(err, test) {
            var test_result = {
                test_id: result.test_id,
                applicant: result.user_id,
                percentage: result.percentage,
                score: Math.floor((result.percentage / 100) * test[0].total_questions),
                percentile: result.percentile,
                average_score: result.average_score,
                test_result: result.test_result,
                transcript_id: result.transcript_id,
                //jobtest: jobtest[0].id
            };
            TestResult.find({ test_id: result.test_id, applicant: result.user_id }).exec(function(err, result) {
                if (result.length > 0) {
                    TestResult.update({ test_id: result.test_id, applicant: result.user_id }, test_result).exec(function() {});
                } else {
                    TestResult.create(test_result).exec(function (err) {
                        if (err) console.log(err);
                    });
                }
            });
        });
        // update application
        if (req.session.job_id) {
            // update application status
            Application.update({ job: req.session.job_id, applicant: req.session.userId }, { status: 'Under Review' }).exec(function() {});
        }
        return res.ok();
    },

    ajaxTest: function(req, res) {
        console.log(req.param('msg'));
        return res.ok();
    }
};

