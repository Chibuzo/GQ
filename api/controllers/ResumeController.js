/**
 * ResumeController
 *
 * @description :: Server-side logic for managing Resumes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function removeEmptyStrings(arr = []) {
  return arr.filter((element) => {
    return element !== "";
  })
}

function updateResumeQualifications(q, resumeId) {
    // Qualifications

    // Store data from the Resume Form in variables
    let updatedQualificationsList = q('qualification') || [];
    let updatedQualificationsIDs = q('qualification_id') || [];
    let updatedQualificationsDates = q('qualification_date') || [];

    // Remove empty qualifications
    updatedQualificationsList = updatedQualificationsList.filter(function(qualification) {
        return qualification !== "";
    });

    // Ensure updatedQualificationsIDs is an array of integers
    updatedQualificationsIDs = updatedQualificationsIDs.map(function(qualificationId) {
        return parseInt(qualificationId);
    });

    // Create an array of the updated qualifications. false IDs indicate it needs to be created
    let userQualifications = updatedQualificationsList.map(function(qualificationItem, idx) {
        let id = updatedQualificationsIDs[idx] ? updatedQualificationsIDs[idx] : false;
        return {
            name: qualificationItem,
            id: id,
            date: updatedQualificationsDates[idx]
        };
    });

    Qualification.find({resume: q('resume_id')})
    .then(function(qualificationsArr) {
        let currentQualificationsIDs = _.map(qualificationsArr, function(qualificationObject) {
            return qualificationObject.id
        });

        // Array of qualifications IDs to be deleted =  IDs current saved not included in the updated list
        let qualificationsToDelete = _.difference(currentQualificationsIDs, updatedQualificationsIDs);

        userQualifications.forEach(function(userQualification) {
            var qualification = {
                qualification: userQualification.name,
                date_obtained: userQualification.date,
                resume: resumeId
            };

            if (userQualification.id === false) {
                // Create
                Qualification.create(qualification)
                .catch(err => {
                    console.error(err);
                })
            } else {
                // Update
                // TODO: Don't make an update if we don't have to...
                Qualification.update({ id: userQualification.id }, qualification)
                .catch(err => {
                    console.error(err);
                });
            }
        });

        if (qualificationsToDelete.length > 0) {
            Qualification.destroy({id: qualificationsToDelete})
            .catch(err => {
                console.error(err);
            });
        }
    }).catch(function(error) {
        console.error(error);
    });

}

function updateResumeEducation(q, resumeId) {
    // Education

    // Store data from the Resume Form in variables
    let updatedInstitutionIDs = removeEmptyStrings(q('inst_id'));
    let updatedInstitutionList = removeEmptyStrings(q('institution'));
    let updatedHonorsList = removeEmptyStrings(q('honour'));
    let updatedProgrammeList = removeEmptyStrings(q('programme'));
    let updatedInstituteStart = removeEmptyStrings(q('inst_start_date'));
    let updatedInstituteEnd = removeEmptyStrings(q('inst_end_date'));

    // Ensure updatedInstitutionIDs is an array of integers
    updatedInstitutionIDs = updatedInstitutionIDs.map(function(institutionId) {
        return parseInt(institutionId);
    });

    // Create an array of the updated institutions. false IDs indicate it needs to be created
    let userInsitutions = updatedInstitutionList.map(function(institution, idx) {
    let id = updatedInstitutionIDs[idx] ? updatedInstitutionIDs[idx] : false;

        return {
            id: id,
            institution: institution,
            honour: updatedHonorsList[idx] || "",
            programme: updatedProgrammeList[idx] || "",
            start_date: new Date(Date.parse(updatedInstituteStart[idx])).toISOString(),
            end_date: new Date(Date.parse(updatedInstituteEnd[idx])).toISOString(),
            resume: resumeId
        };
    });

    Education.find({resume: resumeId}).then(function(institutionsArr) {

        let currentInstitutionsObject = _.map(institutionsArr, function(institutionsObject) {
            return institutionsObject.id
        });

        // Array of institution IDs to be deleted =  IDs current saved not included in the updated list
        let institutionToDelete = _.difference(currentInstitutionsObject, updatedInstitutionIDs);

        userInsitutions.forEach(function(userInsitution) {
            var institution = _.cloneDeep(userInsitution);
            delete institution.id;

            if (userInsitution.id === false) {
                // Create
                Education.create(institution)
                .catch(err => {
                    console.error(err);
                });
            } else {
              // Update
              // TODO: Don't make an update if we don't have to...
              Education.update({ id: userInsitution.id }, institution)
                .catch(err => {
                  console.error(err);
                });
            }
        });

        if (institutionToDelete.length > 0) {
            Education.destroy({id: institutionToDelete})
            .catch(err => {
                console.error(err);
            });
        }

    })
    .catch(function(err) {
        console.log(err);
    });
}

function updateResumeEmploymentHistory(q, resumeId) {

    // let updatedCompanies = removeEmptyStrings()

    // Employments
    for (var i = 0; i < q('company').length; i++) {
        if (q('company')[i].length < 1) continue;

        var employment = {
            company: q('company')[i],
            role: q('job_title')[i],
            location: q('location')[i],
            duties: q('duty')[i],
            start_date: new Date(Date.parse(q('employment_start_date')[i])).toISOString(),
            end_date: new Date(Date.parse(q('employment_start_date')[i])).toISOString(),
            resume: q('resume_id')
        };

        if (q('employment_id') && !_.isUndefined(q('employment_id')[i]) && q('employment_id')[i] > 0) {
            Employment.update({ id: q('employment_id')[i] }, employment).exec(function() {});
        } else {
            Employment.findOrCreate({ company: q('company'), role: q('job_title') }, employment).exec(function() {});
            //sections.employment = true;
        }
    }
}

module.exports = {
	editView: function(req, res) {
        Resume.findOne({ user: req.session.userId })
            .populate('user').populate('educations').populate('qualifications').populate('employments').populate('referencecontacts')
            .exec(function(err, resume) {
                if (err) return;
                var me = {
                    fname: resume.user.fullname.split(' ')[0],
                    lname: resume.user.fullname.split(' ')[1]
                };
                CountryStateService.getCountries().then(function(resp) {
                    Honour.find().exec(function(err, honours) {
                        // check for test result
                        CBTService.candidateGeneralTestResult(req.session.userId).then(function(result) {
                            var _result, test_title;
                            if (result) {
                                _result = result;
                                test_title = 'General Aptitude Test';
                            }
                            return res.view('cv/update', {
                                resume: resume,
                                me: me,
                                honours: honours,
                                countries: resp.countries,
                                states: resp.states,
                                result: _result,
                                test_title: test_title,
                                canEditResume: true,
                                showContactInfo: true
                            });
                        }).catch(function(err) {
                            console.log(err);
                        });
                    });
                });
            });
    },

    save: function(req, res) {
        var q = req.param;  // trying to make life easier
        var sections = [], status; // for profile complete status
        let resumeId = q('resume_id');

        updateResumeEducation(req.param, resumeId);

        updateResumeQualifications(req.param, resumeId);

        updateResumeEmploymentHistory(req.param, resumeId);

        // lets handle associative data



        // Reference Contact, not compulsory
        for (var i = 0; i < q('reference_fname').length; i++) {
            if (q('reference_fname')[i].length < 1) continue;

            var reference = {
                name: q('reference_fname')[i] + ' ' + q('reference_lname')[i],
                company: q('reference_company')[i],
                job_title: q('reference_job_title')[i],
                email: q('reference_email')[i],
                phone: q('reference_phone')[i],
                resume: q('resume_id')
            };

            if (q('reference_id')[i] && q('reference_id')[i] > 0) {
                ReferenceContact.update({ id: q('reference_id')[i] }, reference).exec(function() {});
            } else {
                ReferenceContact.create(reference).exec(function() {});
            }
        }
        if ((q('video_status') == true) && (q('test_status') == true)) {
            status = 'Complete';
        } else {
            status = 'Incomplete';
        }
        var data = {
            gender: q('gender'),
            dob: new Date(Date.parse(q('dob'))).toISOString(),
            phone: q('phone'),
            country: q('country'),
            r_state: q('state'),
            city: q('city'),
            address: q('address'),
            introduction: q('introduction'),
            employment_status: q('employment_status'),
            available_date: new Date(Date.parse(q('available_date'))).toISOString(),
            expected_salary: q('expected_salary') ? q('expected_salary') : 0.0,
            // profile_status: sections.education,
            profile_status: true, // TODO: (Maybe) Have this be dependant on whether there is one educational field
            status: status
        };

        Resume.update({ id: q('resume_id') }, data).exec(function(err, resume) {
            if (err) {
              console.log(err);
                if (err.invalidAttributes && err.invalidAttributes.phone && err.invalidAttributes.phone[0] && err.invalidAttributes.phone[0].rule === 'unique') {
                    return res.json(200, {
                        status: 'error',
                        msg: 'You may already have an account on getQualified, Please try logging in to it.'
                    });
                } else {
                    return res.json(200, { status: 'error', msg: err });
                }
            }
            return res.json(200, { status: 'success' });
        });
    },

    getVideo: function(req, res) {
        var candidate_id = req.param('candidate_id');
        Resume.find({ user: candidate_id }).exec(function(err, resume) {
            if (err) return res.json(200, { status: 'error' });
            return res.json(200, { status: 'success', resume: resume[0] });
        });
    },

    viewResume: function(req, res) {
        var resume_id = req.param('resume_id');

        if (req.session.user_type == 'company' || req.session.user_type == 'company-admin') {
            folder = 'company';
        } else if (req.session.user_type == 'admin') {
            folder = 'admin';
        }
        ResumeService.viewResume(resume_id).then(function(response) {
					var me = {
							fname: response.resume.user.fullname.split(' ')[0],
							lname: response.resume.user.fullname.split(' ')[1]
					};
            return res.view('cv/viewresume', {
                resume: response.resume,
								me: me,
                result: response.result ? response.result : null,
                test_title: response.test_title ? response.test_title : null,
                folder: folder
            });
        }).catch(function(err) {
            console.log(err);
        });
    },

    viewResumeByUser: function(req, res) {
        if (req.session.user_type == 'company' || req.session.user_type == 'company-admin') {
            folder = 'company';
        } else if (req.session.user_type == 'admin') {
            folder = 'admin';
        }
        Resume.find({ user: req.param('user_id') }).exec(function(err, resume) {
            ResumeService.viewResume(resume[0].id).then(function(response) {
                var me = {
                    fname: response.resume.user.fullname.split(' ')[0],
                    lname: response.resume.user.fullname.split(' ')[1]
                };
                return res.view(folder + '/gqprofileview', {
                    resume: response.resume,
                    me: me,
                    result: response.result ? response.result : null,
                    test_title: response.test_title ? response.test_title : null,
                    folder: folder
                });
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
};
