module.exports = {
    fetchAllCandidates: function(start, rows, query, search = undefined) {
        return new Promise(function(resolve, reject) {
            if (search && search.length > 2) {
                module.exports.searchCandidates(search).then(function(users) {
                    return resolve(users);
                });
            } 
            else 
            {
                UserStatistics.find().exec(function(err, stat) {
                    if (err) return reject(err);

                    if (['all', 'active', 'inactive'].indexOf(query) !== -1) {
                        let _where;
                        if (query == 'all') {
                            _where = { user_type: 'Applicant' };
                        } else {
                            _where = {
                                user_type: 'Applicant',
                                status: query
                            };
                        }
                        let criteria = { where: _where, limit: rows, skip: start };
                        User.find(criteria, { select: [ 'fullname', 'email', 'status', 'id', 'createdAt' ] }).sort('createdAt desc').exec(function(err, users) {
                            if (err) return reject(err);
                        
                            let candidates = [];
                            if (query == 'all') candidates.num = stat[0].all_applicants;
                            else if (query == 'active') candidates.num = stat[0].active_applicants;
                            else if (query == 'inactive') candidates.num = stat[0].all_applicants - stat[0].active_applicants;
                            users.forEach(user => {
                                candidates.push({ applicant: user });
                            });
                            return resolve(candidates);
                        });
                    }
                    else 
                    {
                        switch (query) {
                            case 'complete':    // complete resume
                                module.exports.fetchResume(true, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });
                                break;
                            case 'incomplete':  // incomplete resume   
                                module.exports.fetchResume(false, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });
                                break;
                            case 'photo':
                                module.exports.fetchPhoto({ photo_status: true }, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });
                                break;
                            case 'no-photo':
                                module.exports.fetchPhoto({ photo_status: false }, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });
                                break;
                            case 'test-completed':
                                module.exports.fetchTest({ test_status: true }, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });
                                break;    
                            case 'no-test':
                                module.exports.fetchTest({ test_status: false, photo_status: true }, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });  
                                break;  
                            case 'video':
                                module.exports.fetchVideo({ video_status: true }, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });
                                break;    
                            case 'no-video':
                                module.exports.fetchVideo({ video_status: false, test_status: true }, stat[0], start, rows).then(resumes => {
                                    return resolve(resumes);
                                }).catch(err => {
                                    return reject(err);
                                });  
                                break;      
                        }
                    }
                });
            }
        });
    },


    fetchResume: function(query, stat, start, rows) {
        let criteria = { where: { profile_status: query }, limit: rows, skip: start };
        return new Promise(function(resolve, reject) {
            Resume.find(criteria, { select: [ 'fullname', 'email', 'status', 'user', 'createdAt' ] }).sort('createdAt desc').exec(function(err, resume) {
                if (err) return reject(err);

                let candidates = [];
                candidates.num = query === true ? stat.complete_resume : stat.active_applicants - stat.complete_resume;
                resume.forEach(user => {
                    candidates.push({ applicant: user });
                });
                return resolve(candidates);
            });
        });
    },


    fetchPhoto: function(query, stat, start, rows) {
        let criteria = { where: query, limit: rows, skip: start };
        return new Promise(function(resolve, reject) {
            Resume.find(criteria, { select: [ 'fullname', 'email', 'status', 'user', 'createdAt' ] }).sort('createdAt desc').exec(function(err, resume) {
                if (err) return reject(err);

                let candidates = [];
                candidates.num = query.photo_status === true ? stat.photos : stat.active_applicants - stat.photos;
                resume.forEach(user => {
                    candidates.push({ applicant: user });
                });
                return resolve(candidates);
            });
        });
    },


    fetchTest: function(query, stat, start, rows) {
        let criteria = { where: query, limit: rows, skip: start };
        return new Promise(function(resolve, reject) {
            Resume.find(criteria, { select: [ 'fullname', 'email', 'status', 'user', 'createdAt' ] }).sort('createdAt desc').exec(function(err, resume) {
                if (err) return reject(err);

                let candidates = [];
                candidates.num = query.test_status === true ? stat.test : stat.photos - stat.test;
                resume.forEach(user => {
                    candidates.push({ applicant: user });
                });
                return resolve(candidates);
            });
        });
    },


    fetchVideo: function(query, stat, start, rows) {
        let criteria = { where: query, limit: rows, skip: start };
        return new Promise(function(resolve, reject) {
            Resume.find(criteria, { select: [ 'fullname', 'email', 'status', 'user', 'createdAt' ] }).sort('createdAt desc').exec(function(err, resume) {
                if (err) return reject(err);

                let candidates = [];
                candidates.num = query.video_status === true ? stat.videos : stat.test - stat.videos;
                resume.forEach(user => {
                    candidates.push({ applicant: user });
                });
                return resolve(candidates);
            });
        });
    },


    searchCandidates: function(search) {
        return new Promise(function(resolve, reject) {
            let sql = "SELECT DISTINCT email, fullname, status, id, createdAt FROM user WHERE fullname LIKE ? OR email LIKE ? ";
            User.query(sql, [ search + '%', search + '%' ], function(err, result) {
                if (err) {
                    return reject(err);
                }
                let candidates = [];
                candidates.num = result.length;
                result.forEach(user => {
                    candidates.push({ applicant: user });
                });
                return resolve(candidates);
            });
        });
    }
}