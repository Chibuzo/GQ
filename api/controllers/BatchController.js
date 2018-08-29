/**
 * BatchController
 *
 * @description :: Server-side logic for managing Batches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadSchools: function(req, res) {
        //Schools.destroy({}).exec(function () {});
        const fs = require('fs');
        var csvpath = "assets/csv-files/csv7.csv";
        fs.readFile(csvpath, 'utf8', function(err, data) {
            console.log(err);
            var rows = data.split('\n');
            // sign up the applicants
            rows.forEach(function (row) {
                var entry = row.split(',');
                if (entry[1] === undefined || entry[1] == null || entry[2] === undefined || entry[2] == null) {}
                else {
                    var abbr = entry[1].replace(/['"]+/g, '');
                    var school = entry[2].replace(/['"]+/g, '');
                    Schools.create({ abbr: abbr, school_name: school }).exec(function () {});
                }
            });
            return res.ok();
        });
    },

    countries: function (req, res) {
        CountryStateService.getCountries().then(function(resp) {
            resp.countries.geonames.forEach(function(country) {
                Country.create({ country: country.countryName }).exec(function(err, country) {});
            }).catch(function(err) {
                return res.ok();
            });
        });
        return res.ok();
    },

    loadStates: function (req, res) {
        var states = [{"id":"1","state_name":"Abuja"}, {"id":"2","state_name":"Anambra"}, {"id":"3","state_name":"Enugu"}, {"id":"4","state_name":"Akwa Ibom"}, {"id":"5","state_name":"Adamawa"}, {"id":"6","state_name":"Abia"}, {"id":"7","state_name":"Bauchi"}, {"id":"8","state_name":"Bayelsa"}, {"id":"9","state_name":"Benue"}, {"id":"10","state_name":"Borno"}, {"id":"11","state_name":"Cross River"}, {"id":"12","state_name":"Delta"}, {"id":"13","state_name":"Ebonyi"}, {"id":"14","state_name":"Edo"}, {"id":"15","state_name":"Ekiti"}, {"id":"16","state_name":"Gombe"}, {"id":"17","state_name":"Imo"}, {"id":"18","state_name":"Jigawa"}, {"id":"19","state_name":"Kaduna"}, {"id":"20","state_name":"Kano"}, {"id":"21","state_name":"Katsina"}, {"id":"22","state_name":"Kebbi"}, {"id":"23","state_name":"Kogi"}, {"id":"24","state_name":"Kwara"}, {"id":"25","state_name":"Lagos"}, {"id":"26","state_name":"Nasarawa"}, {"id":"27","state_name":"Niger"}, {"id":"28","state_name":"Ogun"}, {"id":"29","state_name":"Ondo"}, {"id":"30","state_name":"Osun"}, {"id":"31","state_name":"Oyo"}, {"id":"32","state_name":"Plateau"}, {"id":"33","state_name":"Rivers"}, {"id":"34","state_name":"Sokoto"}, {"id":"35","state_name":"Taraba"}, {"id":"36","state_name":"Yobe"}, {"id":"37","state_name":"Zamfara"}];
        states.forEach(function(state) {
            States.create({ state_name: state.state_name }).exec(function() {});
        });
        return res.ok();
    },

    getStates: function(req, res) {
        States.find().sort('state_name asc').exec(function(err, states) {
            return res.json(200, { states: states });
        });
    },

    testApi: function(req, res) {
        var request = require("request");
        var qs = require('querystring');

        var data = {       	
            jobID: 60,
            email: 'c.hibuzo.henry@gmail.com',
            fullname: 'Frank Eneh',
            phone: '0804885754',
            gender: 'male',
            dob: '1986-04-16',
            address: 'No 3 moore street',
            country: 'Nigeria',
            state: 'Kwara',
            city: 'Kuba',
            professional_summary: 'I am me…',
            employment_status: 'Not employed/Employed',
            current_annual_salary: '1,000,000',
            expected_annual_salary: '1,200,000'
        };

        // var data = {
        //     "request": {
        //         "authentication": {
        //             "email": "uzo.systems@gmail.com"
        //         },
        //         "job":
        //           {
        //                 "company": {
        //                         "company_name": "GetQualified",
        //                         "contact_person": "John Doe",
        //                         "contact_email": "email.com",
        //                         "contact_phone": "09094758784"
        //                 },
        //               "job_title": "HR Manager",
        //               "job_location": "Lagos, Ikeja",
        //               "job_description": "This job  is job",
        //               "requirements":  ["a degree","3 years experience"],
        //               "qualifications": ["MBA"],
        //               "job_level": "Entry Level",
        //               "closing_date": "2018-08-20",
        //               "jobID": "1234"
        //           }
        //     }
        // };

        var options = {
            method: "POST",
            uri: "http://35.177.19.130:1337/api/v1/job/apply",
            json: true,
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        };
        
        request(options, function(err, resp, body) {
            console.log(err);
            console.log(body)
            //var data = JSON.parse(body);
            return res.ok();
        });
    },

    report: function(req, res) {
        const job_id = req.param('job_id');
        const sql = `SELECT score, fullname, r.user AS uid, gq.id AS test_id, r.email, address, phone, dob, programme, r_class, available_date FROM application ap 
                    JOIN gqaptitudetestresult gq ON ap.applicant = gq.user 
                    JOIN resume r ON r.user = gq.user 
                    JOIN education e ON e.resume = r.id
                    WHERE job = ? GROUP BY email ORDER BY score DESC`;

        GQAptitudeTestResult.query(sql, [ job_id ], function(err, results) {
            let candidates = [];
            async.eachSeries(results, function(result, cb) {
                GQTestResult.find({ test: [1,2,3], candidate: result.uid }).sort('test').exec(function(err, tests) {
                    if (err) {
                        return console.log(err);
                    }
                    //console.log(tests)
                    if (tests.length < 3) return cb();

                    let total_num_questions = parseInt(tests[0].no_of_questions) + parseInt(tests[1].no_of_questions) + parseInt(tests[2].no_of_questions);

                    let r_class = [
                        { name: "1", id: 1 }, { name: "2.1", id: 2 }, { name: "2.2", id: 3 }, { name: "3", id: 4 }
                    ];

                    let rclass = '-';
                    if (result.r_class)
                        rclass = r_class.find(r_clas => r_clas.id == result.r_class).name;

                    candidates.push({
                        fullname: result.fullname,
                        age: getAge(result.dob),
                        qualification: result.programme,
                        degree: rclass,
                        location: result.address,
                        email: result.email,
                        phone: result.phone,
                        // logic: ((tests[0].score / tests[0].no_of_questions) * 100).toFixed(0),
                        // verbal: ((tests[1].score / tests[1].no_of_questions) * 100).toFixed(0),
                        // maths: ((tests[2].score / tests[2].no_of_questions) * 100).toFixed(0),
                        logic: tests[0].score,
                        verbal: tests[1].score,
                        maths: tests[2].score,
                        total: (((tests[0].score + tests[1].score + tests[2].score) / total_num_questions) * 100).toFixed(1) + '%',
                        available_date: result.available_date
                    });
                    cb();
                }); 
            }, function(err) {
                if (err) {
                    console.log(err);
                }
                const Excel = require('exceljs');
                const workbook = new Excel.Workbook();

                workbook.creator = 'getqualified.work';
                workbook.created = new Date();

                let sheet = workbook.addWorksheet('My Sheet');
                sheet.columns = [
                    { header: 'S/No', key: 's_no', width: 5 },
                    { header: 'Fullname', key: 'fullname', width: 30 },
                    { header: 'Age', key: 'age', width: 8 },
                    { header: 'Qualification', key: 'qualification', width: 60 },
                    { header: 'Class of Degree', key: 'degree_class', width: 15 },
                    { header: 'Location (as shown in the address on CV)', key: 'location', width: 60 },
                    { header: 'Available Date', key: 'available_date', width: 15 },
                    { header: 'Verbal Reasoning', key: 'verbal', width: 15 },
                    { header: 'Numerical Reasoning', key: 'numeric', width: 20 },
                    { header: 'Critical Reasoning', key: 'critical', width: 17 },
                    { header: 'Total Score', key: 'total', width: 20 },
                    { header: 'Contact Phone', key: 'phone', width: 15 },
                    { header: 'Email Address', key: 'email', width: 30 }
                ];

                let row1 = sheet.getRow(1);
                row1.height = 30;
                row1.font = { name: 'Arial', size: 11, bold: true };
                row1.alignment = { vertical: 'middle' };

                let n = 0;
                candidates.forEach(function(user) {
                    n++;
                    sheet.addRow({
                        s_no: n,
                        fullname: user.fullname,
                        age: user.age,
                        qualification: user.qualification,
                        degree_class: user.degree,
                        location: user.location,
                        available_date: user.available_date,
                        verbal: user.verbal,
                        numeric: user.maths,
                        critical: user.logic,
                        total: user.total,
                        phone: user.phone,
                        email: user.email
                    }).commit();
                });
                sheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(8).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(9).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(10).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(11).alignment = { vertical: 'middle', horizontal: 'center' };

                var file_name = sails.config.appPath + '/assets/csv-files/wema_report.xlsx';
                workbook.xlsx.writeFile(file_name).then(function() {
                    return console.log(true);
                }).catch(function(err) {
                    return console.log(err);
                });
            });
        }); 
        return res.ok();      
    }
};

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

