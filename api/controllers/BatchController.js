/**
 * BatchController
 *
 * @description :: Server-side logic for managing Batches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const fs = require('fs');
const path = require('path');

module.exports = {
	loadSchools: function(req, res) {
        //Schools.destroy({}).exec(function () {});
        var csvpath = "assets/csv-files/csv7.csv";
        fs.readFile(csvpath, 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                return res.serverError();
            }
            var rows = data.split('\n');
            
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

        // var data = {       	
        //     jobID: 60,
        //     email: 'c.hibuzo.henry@gmail.com',
        //     fullname: 'Frank Eneh',
        //     phone: '0804885754',
        //     gender: 'male',
        //     dob: '1986-04-16',
        //     address: 'No 3 moore street',
        //     country: 'Nigeria',
        //     state: 'Kwara',
        //     city: 'Kuba',
        //     professional_summary: 'I am me…',
        //     employment_status: 'Not employed/Employed',
        //     current_annual_salary: '1,000,000',
        //     expected_annual_salary: '1,200,000'
        // };

        var data = {
            "request": {
                "authentication": {
                    "email": "uzo.systems@gmail.com"
                },
                "job":
                  {
                        "company": {
                                "company_name": "GetQualified",
                                "contact_person": "John Doe",
                                "contact_email": "email.com",
                                "contact_phone": "09094758784"
                        },
                      "job_title": "HR Manager",
                      "job_location": "Lagos, Ikeja",
                      "job_description": "This job  is job",
                      "requirements":  ["a degree","3 years experience"],
                      "qualifications": ["MBA"],
                      "job_level": "Entry Level",
                      "closing_date": "2018-08-20",
                      "jobID": "1234"
                  }
            }
        };

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

    qualifiedReport: function(req, res) {
        const job_id = req.param('job_id');
        const split_by_state = true;
        if (split_by_state === true) {
            let states = [{"state_name":"Abia"}, {"state_name":"Abuja"}, {"state_name":"Adamawa"}, {"state_name":"Akwa Ibom"}, {"state_name":"Anambra"}, {"state_name":"Bauchi"}, {"state_name":"Bayelsa"}, {"state_name":"Benue"}, {"state_name":"Borno"}, {"state_name":"Cross River"}, {"state_name":"Delta"}, {"state_name":"Ebonyi"}, {"state_name":"Edo"}, {"state_name":"Ekiti"}, {"state_name":"Enugu"}, {"state_name":"Gombe"}, {"state_name":"Imo"}, {"state_name":"Jigawa"}, {"state_name":"Kaduna"}, {"state_name":"Kano"}, {"state_name":"Katsina"}, {"state_name":"Kebbi"}, {"state_name":"Kogi"}, {"state_name":"Kwara"}, {"state_name":"Lagos"}, {"state_name":"Nasarawa"}, {"state_name":"Niger"}, {"state_name":"Ogun"}, {"state_name":"Ondo"}, {"state_name":"Osun"}, {"state_name":"Oyo"}, {"state_name":"Plateau"}, {"state_name":"Rivers"}, {"state_name":"Sokoto"}, {"state_name":"Taraba"}, {"state_name":"Yobe"}, {"state_name":"Zamfara"}];
        }
        const criteria = `AND dob >= '1992-01-01' AND score > '29' AND r_class <= '2'`;

        const sql = `SELECT score, fullname, r.user AS uid, gq.id AS test_id, r.email, address, r_state, phone, dob, programme, r_class, available_date FROM application ap 
                    JOIN gqaptitudetestresult gq ON ap.applicant = gq.user 
                    JOIN resume r ON r.user = gq.user 
                    JOIN education e ON e.resume = r.id
                    WHERE job = ? ${criteria} GROUP BY email ORDER BY score DESC`;

        GQAptitudeTestResult.query(sql, [ job_id ], function(err, results) {
            let candidates = [], states = [];
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
                        state: result.r_state,
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
                    // collect individual states
                    if (split_by_state === true) {
                        if (states.indexOf(result.r_state) !== -1) states.push(result.r_state);
                    }
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
                    { header: 'Qualification', key: 'qualification', width: 40 },
                    { header: 'Class of Degree', key: 'degree_class', width: 16 },
                    { header: 'Location', key: 'location', width: 50 },
                    { header: 'Available Date', key: 'available_date', width: 15 },
                    { header: 'Verbal Reasoning', key: 'verbal', width: 18 },
                    { header: 'Numerical Reasoning', key: 'numeric', width: 22 },
                    { header: 'Critical Reasoning', key: 'critical', width: 19 },
                    { header: 'Total Score', key: 'total', width: 20 },
                    { header: 'Contact Phone', key: 'phone', width: 15 },
                    { header: 'Email Address', key: 'email', width: 30 },
                    { header: 'State', key: 'state', width: 10 }
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
                        email: user.email,
                        state: user.state
                    }).commit();
                });
                sheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(8).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(9).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(10).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getColumn(11).alignment = { vertical: 'middle', horizontal: 'center' };

                var file_name = sails.config.appPath + '/assets/csv-files/GQ_assessment_report.xlsx';
                workbook.xlsx.writeFile(file_name).then(function() {
                    return console.log(true);
                }).catch(function(err) {
                    return console.log(err);
                });
            });
        }); 
        return res.ok();      
    },


    qualifiedByStateReport: function(req, res) {
        const zip = require('node-zip')();
        const SkipperDisk = require('skipper-disk');

        const Excel = require('exceljs');

        const job_id = req.param('job_id');
        const score_format = 'percentage';
        const total_score_only = true;
        const states = [{"state_name":"Abia"}, {"state_name":"Abuja"}, {"state_name":"Adamawa"}, {"state_name":"Akwa Ibom"}, {"state_name":"Anambra"}, {"state_name":"Bauchi"}, {"state_name":"Bayelsa"}, {"state_name":"Benue"}, {"state_name":"Borno"}, {"state_name":"Cross River"}, {"state_name":"Delta"}, {"state_name":"Ebonyi"}, {"state_name":"Edo"}, {"state_name":"Ekiti"}, {"state_name":"Enugu"}, {"state_name":"Gombe"}, {"state_name":"Imo"}, {"state_name":"Jigawa"}, {"state_name":"Kaduna"}, {"state_name":"Kano"}, {"state_name":"Katsina"}, {"state_name":"Kebbi"}, {"state_name":"Kogi"}, {"state_name":"Kwara"}, {"state_name":"Lagos"}, {"state_name":"Nasarawa"}, {"state_name":"Niger"}, {"state_name":"Ogun"}, {"state_name":"Ondo"}, {"state_name":"Osun"}, {"state_name":"Oyo"}, {"state_name":"Plateau"}, {"state_name":"Rivers"}, {"state_name":"Sokoto"}, {"state_name":"Taraba"}, {"state_name":"Yobe"}, {"state_name":"Zamfara"}];
        
        async.eachSeries(states, function(state, cb) {
            const criteria = `AND dob >= '1992-01-01' AND score > '29' AND r_class <= '2' AND r_state = ?`;

            const sql = `SELECT score, fullname, r.user AS uid, gq.id AS test_id, r.email, address, r_state, phone, dob, programme, r_class, available_date FROM application ap 
                    JOIN gqaptitudetestresult gq ON ap.applicant = gq.user 
                    JOIN resume r ON r.user = gq.user 
                    JOIN education e ON e.resume = r.id
                    WHERE job = ? ${criteria} GROUP BY email ORDER BY score DESC`;
        
            GQAptitudeTestResult.query(sql, [ job_id, state.state_name ], function(err, results) {
                if (err) return console.log(err);
                if (results.length < 1) return cb();

                let n = 0; xlsx = [];
                const workbook = new Excel.Workbook();

                workbook.creator = 'getqualified.work';
                workbook.created = new Date();
                let sheet = workbook.addWorksheet("Candiates' List");

                if (total_score_only === true) 
                {
                    sheet.columns = [
                        { header: 'S/No', key: 's_no', width: 5 },
                        { header: 'Fullname', key: 'fullname', width: 30 },
                        { header: 'Age', key: 'age', width: 8 },
                        { header: 'Qualification', key: 'qualification', width: 25 },
                        { header: 'Class of Degree', key: 'degree_class', width: 16 },
                        { header: 'Location', key: 'location', width: 45 },
                        { header: 'Available Date', key: 'available_date', width: 15 },
                        { header: 'Total Score', key: 'total', width: 20 },
                        { header: 'Contact Phone', key: 'phone', width: 15 },
                        { header: 'Email Address', key: 'email', width: 30 }
                    ];
                }
                else
                {
                    sheet.columns = [
                        { header: 'S/No', key: 's_no', width: 5 },
                        { header: 'Fullname', key: 'fullname', width: 30 },
                        { header: 'Age', key: 'age', width: 8 },
                        { header: 'Qualification', key: 'qualification', width: 25 },
                        { header: 'Class of Degree', key: 'degree_class', width: 16 },
                        { header: 'Location', key: 'location', width: 45 },
                        { header: 'Available Date', key: 'available_date', width: 15 },
                        { header: 'Verbal Reasoning', key: 'verbal', width: 15 },
                        { header: 'Numerical Reasoning', key: 'numeric', width: 20 },
                        { header: 'Critical Reasoning', key: 'critical', width: 17 },
                        { header: 'Total Score', key: 'total', width: 20 },
                        { header: 'Contact Phone', key: 'phone', width: 15 },
                        { header: 'Email Address', key: 'email', width: 30 }
                    ];
                }
                async.eachSeries(results, function(user, done) {
                    n++;
                    let r_class = [{ name: "1", id: 1 }, { name: "2.1", id: 2 }, { name: "2.2", id: 3 }, { name: "3", id: 4 }];

                    let rclass = '-';
                    if (user.r_class) {
                        rclass = r_class.find(r_clas => r_clas.id == user.r_class).name;
                    }

                    if (total_score_only === true) 
                    {                    
                        sheet.addRow({
                            s_no: n,
                            fullname: user.fullname,
                            age: getAge(user.dob),
                            qualification: user.programme,
                            degree_class: rclass,
                            location: user.address,
                            available_date: user.available_date,
                            total: ((user.score / 60) * 100).toFixed(1) + '%',
                            phone: user.phone,
                            email: user.email
                        }).commit();
                        done();
                    } 
                    else 
                    {
                        GQTestResult.find({ test: [1,2,3], candidate: result.uid }).sort('test').exec(function(err, tests) {
                            if (err) {
                                return console.log(err);
                            }
                            //console.log(tests)
                            if (tests.length < 3) return cb();

                            let total_num_questions = parseInt(tests[0].no_of_questions) + parseInt(tests[1].no_of_questions) + parseInt(tests[2].no_of_questions);     

                            sheet.addRow({
                                s_no: n,
                                fullname: user.fullname,
                                age: getAge(user.dob),
                                qualification: user.programme,
                                degree_class: rclass,
                                location: user.address,
                                available_date: user.available_date,
                                verbal: score_format == 'percentage' ? ((tests[1].score / tests[1].no_of_questions) * 100).toFixed(0) : tests[1].score,
                                numeric: score_format == 'percentage' ? ((tests[2].score / tests[2].no_of_questions) * 100).toFixed(0) : tests[2].score,
                                critical: score_format == 'percentage' ? ((tests[0].score / tests[0].no_of_questions) * 100).toFixed(0) : tests[0].score,
                                total: (((tests[0].score + tests[1].score + tests[2].score) / total_num_questions) * 100).toFixed(1) + '%',
                                email: user.email,
                                phone: user.phone,
                            }).commit();
                            done();
                        });
                    } 
                }, function(err) {
                    if (err) {
                        console.log(err);
                    }

                    let row1 = sheet.getRow(1);
                    row1.height = 30;
                    row1.font = { name: 'Arial', size: 11, bold: true };
                    row1.alignment = { vertical: 'middle' };
                    
                    sheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' };
                    sheet.getColumn(8).alignment = { vertical: 'middle', horizontal: 'center' };
                    if (total_score_only !== true) {
                        sheet.getColumn(9).alignment = { vertical: 'middle', horizontal: 'center' };
                        sheet.getColumn(10).alignment = { vertical: 'middle', horizontal: 'center' };
                        sheet.getColumn(11).alignment = { vertical: 'middle', horizontal: 'center' };
                    }

                    var file_name = sails.config.appPath + '/assets/csv-files/Qualified_candidates_' + state.state_name + '_state.xlsx';
                    workbook.xlsx.writeFile(file_name).then(function() {
                        zip.file('Qualified_candidates_' + state.state_name + '_state.xlsx', fs.readFileSync(path.resolve(file_name)));
                        //xlsx.push(file_name);
                        cb();
                    }).catch(function(err) {
                        return console.log(err);
                    });
                });
            }); 
        }, function(err) {
            if (err) {
                return res.serverError(err);
            }
            let data = zip.generate({ base64: false, compression: 'DEFLATE' });
            fs.writeFileSync(sails.config.appPath + '/assets/csv-files/GQ_JobBatchedFiles.zip', data, 'binary');
            res.setHeader('Content-disposition', 'attachment; filename=GQ_JobBatchedFiles.zip');
            let fileAdapter = SkipperDisk();
            fileAdapter.read(sails.config.appPath + '/assets/csv-files/GQ_JobBatchedFiles.zip').on('error', function (err) {
                return res.serverError(err);
            }).pipe(res);
            return res.ok(); 
        });     
    },


    shortlistedReport: function(req, res) {
        const job_id = req.param('job_id');
        const sql = `SELECT score, fullname, r.email, phone, dob, gender, programme, r_class FROM selectedcandidate sc 
                        JOIN gqaptitudetestresult gq ON sc.candidate = gq.user 
                        JOIN resume r ON r.user = gq.user 
                        JOIN education e ON e.resume = r.id
                        WHERE job_id = ? GROUP BY email ORDER BY score DESC`;

        SelectedCandidate.query(sql, [ job_id ], function(err, results) {
            if (err) {
                return console.log(err);
            }

            const Excel = require('exceljs');
            const workbook = new Excel.Workbook();

            workbook.creator = 'getqualified.work';
            workbook.created = new Date();

            let sheet = workbook.addWorksheet('My Sheet');
            sheet.columns = [
                { header: 'S/No', key: 's_no', width: 5 },
                { header: 'Fullname', key: 'fullname', width: 28 },
                { header: 'Gender', key: 'gender', width: 13 },
                { header: 'Age', key: 'age', width: 8 },
                { header: 'Qualification', key: 'qualification', width: 40 },
                { header: 'Class of Degree', key: 'degree_class', width: 17 },
                { header: 'Aptitude Test', key: 'aptitude_test', width: 15 },
                { header: 'Contact Phone', key: 'phone', width: 18 },
                { header: 'Email Address', key: 'email', width: 30 }
            ];

            let row1 = sheet.getRow(1);
            row1.height = 30;
            row1.font = { name: 'Arial', size: 11, bold: true };
            row1.alignment = { vertical: 'middle' };

            let candidates = [];
            let n = 0;
            results.forEach(function(user) {
                let r_class = [
                    { name: "1", id: 1 }, { name: "2.1", id: 2 }, { name: "2.2", id: 3 }, { name: "3", id: 4 }
                ];

                let rclass = '-';
                if (user.r_class)
                    rclass = r_class.find(r_clas => r_clas.id == user.r_class).name;

                n++;
                sheet.addRow({
                    s_no: n,
                    fullname: user.fullname,
                    gender: user.gender,
                    age: getAge(user.dob),
                    qualification: user.programme,
                    degree_class: rclass,
                    aptitude_test: ((user.score / 60) * 100).toFixed(1),
                    phone: user.phone,
                    email: user.email
                }).commit();
            });
            sheet.getColumn(4).alignment = { vertical: 'middle', horizontal: 'left' };
            sheet.getColumn(7).alignment = { vertical: 'middle', horizontal: 'center' };

            var file_name = sails.config.appPath + '/assets/csv-files/GQ_shortlist.xlsx';
            workbook.xlsx.writeFile(file_name).then(function() {
                console.log(true);
                return res.ok();
            }).catch(function(err) {
                return console.log(err);
            });
        });
    },

    
    crudeReport: function(req, res) {
        const job_id = req.param('job_id');
        const sql = `SELECT dob, email, gq.user AS uid FROM application ap 
                    JOIN gqaptitudetestresult gq ON ap.applicant = gq.user 
                    JOIN resume r ON r.user = gq.user 
                    WHERE job = ? GROUP BY email`;

        GQAptitudeTestResult.query(sql, [ job_id ], function(err, results) {
            let stat = {
                complete_test: 0,
                age: 0
            };
            async.eachSeries(results, function(result, cb) {
                GQTestResult.find({ test: [1,2,3], candidate: result.uid }).sort('test').exec(function(err, tests) {
                    if (err) {
                        return console.log(err);
                    }
                    //console.log(tests)
                    if (tests.length < 3) return cb();
                    
                    stat.complete_test++;

                    // filter by age
                    let ages = 0;
                    if (getAge(result.dob) <= 27) {
                        stat.age++;
                    }
                });
            }, function(err) {
                console.log(stat)
            });
        });
    },

    exportCandidatesData: function(req, res) {
        var csvpath = 'assets/csv-files';
        req.file('csv').upload({
            dirname: require('path').resolve(sails.config.appPath, csvpath)
        },
        function(err, file) {
            if (err) {
                return res.badRequest(err);
            }
            try {
                var parser = require('csv-parse');
                const fs = require('fs');
                const path = require('path');
                fs.readFile(csvpath + '/' + path.basename(file[0].fd), 'utf8', function(err, csv_data) {
                    parser(csv_data, {relax_column_count: true, rtrim: true, ltrim: true, skip_lines_with_empty_values: true}, function (err, data) {
                        if (err) return console.log(err);
                        let emails = data.map(d => d[0]);
                        Resume.find({ email: emails }).populate('educations').populate('qualifications').populate('employments').populate('referencecontacts').populate('user').exec(function(err, resumes) {
                            if (err) return console.log(err);
                            fs.writeFile("resume.json", JSON.stringify(resumes), 'utf8', (err)=>{
                                if(err) console.log(err)
                                else console.log('File saved');
                                return res.ok();
                            });
                        });
                    });
                });
            } finally {
                console.log('We are done')
            }
        });
    },

    importCandidatesData: function(req, res) {
        const fs = require('fs');
        //const path = require('path');
        fs.readFile('resume.json', 'utf8', function(err, data) {
            let resumes = JSON.parse(data);
            resumes.forEach(function(d) {
                //let user = d.user;
                let edu = d.educations;
                let qual = d.qualifications;
                let emp = d.employments;
                let referee = d.referencecontacts;
               
                // create user and resume
                var data = {
                    fullname: d.fullname,
                    email:d.email,
                    gender: d.gender,
                    dob: d.dob ? new Date(Date.parse(d.dob)).toISOString() : new Date().toISOString(),
                    phone: d.phone,
                    country: d.country,
                    r_state: d.state,
                    city: d.city,
                    address: d.address,
                    introduction: d.introduction,
                    employment_status: d.employment_status,
                    available_date: d.available_date ? new Date(Date.parse(d.available_date)).toISOString() : new Date().toISOString(),
                    current_salary: d.current_salary ? d.current_salary : 0.0,
                    expected_salary: d.expected_salary ? d.expected_salary : 0.0,
                    profile_status: d.profile_status,
                    video_file: d.youtube_vid_id && d.youtube_vid_id.length > 5 ? 'https://api.neon.ventures/gqyt/files/' + d.youtube_vid_id + '.mp4' : d.video_file,
                    video_status: d.video_status,
                    photo: d.photo && d.photo.indexOf('http') === -1 ? 'https://getqualified.work/applicant_profilephoto/' + d.photo : d.photo,
                    photo_status: d.photo_status,
                    status: d.status
                };
                ResumeService.createNewResume(data).then(user => {
                    let resume_id = user.resume_id;
                    edu.forEach(ed => { ResumeService.saveEducation(ed.institution, ed.honour, ed.r_class, ed.programme, ed.start_date, ed.end_date, resume_id); });
                    qual.forEach(qual => { ResumeService.saveQualification(qual.qualification, qual.institution, qual.date_obtained, resume_id); });
                    emp.forEach(emp => { ResumeService.saveEmploymentHistory(emp.company, emp.role, emp.location, emp.duties, emp.start_date, emp.end_date, resume_id); });
                    referee.forEach(referee => { ResumeService.saveReferee(referee.name, referee.company, referee.job_title, referee.email, referee.phone, resume_id); });
                }).catch(err => {
                    console.log('Error creating resume for ' + d.email);
                    console.log(err);
                });
            });
            return res.ok();
        });
    },

    getTestInProgress: function(req, res) {
        return GQTestResult.find({test: [1, 2, 3]})
            .then(gqTestResults => {
                let usersWithTests = _.groupBy(gqTestResults, (testResult) => {
                    return testResult.candidate;
                });

                let usersWithSomeTests = _.filter(usersWithTests, (tests, candidateId) => {
                    return tests.length < 3;
                });

                let usersWithSomeTestsIds = _.map(usersWithSomeTests, (testsArr, candidateId) => {
                    // just in case there by a result without a candidate
                    var id = parseInt(testsArr[0].candidate);
                    if (id > 0) return id;
                });
                //console.log(usersWithSomeTestsIds);
                const fs = require('fs');
                fs.writeFile("sometest.json", JSON.stringify(usersWithSomeTestsIds), 'utf8', (err)=>{
                    if(err) console.log(err)
                    else console.log('File saved');
                    return res.ok();
                });

            });
    },


    processCVs: function(req, res) {
        const puppeteer = require('puppeteer');
        const fs = require('fs');

        Resume.find({ where: { scrapped: 0, profile_status: true }, limit: 22000, skip: 1000 }).exec(function(err, cvs) {
            if (err) return res.serverError(err);

            let job = async.queue(function(cv, cb) {
                let convertHTMLToPDF = async () => {

                    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

                    const page = await browser.newPage();
                    await page.goto('http://35.177.19.130:1337/viewresume/'+cv.id, { waitUntil: 'networkidle0' });
                    await page.pdf({path: 'resumePDF_'+cv.id+'.pdf'});
                    S3Service.uploadFile('resumePDF_'+cv.id+'.pdf', 'resume_pdfs', 'application/pdf').then(data => {
                        let message = { 
                            filename: data.url,
                            user_id: cv.user,
                            short_form: {
                                fullname: cv.fullname,
                                email: cv.email,
                                gender: cv.gender,
                                dob: cv.dob,
                                phone: cv.phone,
                                address: cv.address,
                                resident_country: cv.country,
                                state: cv.r_state,
                                city: cv.city,
                                profession_summary: cv.introduction,
                                employment_status: cv.employment_status,
                                current_annual_salary: cv.current_salary,
                                expected_annual_salary: cv.expected_salary
                            }
                        };
                        SQSService.sendJob(JSON.stringify(message));
                        Resume.update({ id: cv.id }, { scrapped: 1 }).exec(function() {});
                        fs.unlink('resumePDF_'+cv.id+'.pdf', function(e) {});
                    }).catch(err => {
                        console.log(err);
                    });
                    await browser.close();
                    cb();
                };

                convertHTMLToPDF();
            }, 7);

            job.push(cvs, function(e) {
                if (e) return console.log(e);
            });

            job.drain = function() {
                console.log('Done');
            }
        });
        return res.ok();
    },

    viewResume: function(req, res) {
        Resume.findOne({ id: req.param('id') })
                .populate('user').populate('educations').populate('qualifications').populate('employments').populate('referencecontacts')
                .exec(function(err, resume) {
                    if (err) return res.serverError(err);

                    return res.view('cv/resume', { resume: resume });
                });
    }
};

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

