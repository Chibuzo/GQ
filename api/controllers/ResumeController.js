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

function removeLastEmptyStrings(arr = []) {
    let length = arr.length;

    if (arr.length > 0 && arr[length - 1] == "") {
        arr.pop();
    }

    return arr;
}

function updateResumeQualifications(q, resumeId) {
    // Qualifications

    // Store data from the Resume Form in variables
    let updatedQualificationsList = removeLastEmptyStrings(q('qualification'));
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

    Qualification.find({resume: resumeId})
    .then(function(qualificationsArr) {
        let currentQualificationsIDs = _.map(qualificationsArr, function(qualificationObject) {
            return qualificationObject.id
        });

        // Array of qualifications IDs to be deleted =  IDs current saved not included in the updated list
        let qualificationsToDelete = _.difference(currentQualificationsIDs, updatedQualificationsIDs);

        userQualifications.forEach(function(userQualification) {
            var qualification = {
                qualification: userQualification.name,
                date_obtained: userQualification.date ? new Date(Date.parse(userQualification.date)).toISOString() : new Date(Date.now()).toISOString(),
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
    let updatedInstitutionIDs = q('inst_id') || [];
    let updatedInstitutionList = removeLastEmptyStrings(q('institution'));
    let updatedHonorsList = q('honour') || [];
    let updatedProgrammeList = q('programme') || [];
    let updatedInstituteStart = q('inst_start_date') || [];
    let updatedInstituteEnd = q('inst_end_date') || [];

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
            start_date: updatedInstituteStart[idx] ? new Date(Date.parse(updatedInstituteStart[idx])).toISOString() : new Date(Date.now()).toISOString(),
            end_date: updatedInstituteEnd[idx] ? new Date(Date.parse(updatedInstituteEnd[idx])).toISOString(): new Date(Date.now()).toISOString(),
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
        console.error(err);
    });
}

function updateResumeEmploymentHistory(q, resumeId) {

    let updatedJobIds = q('employment_id') || [];
    let updatedCompanyList = removeEmptyStrings(q('company') || []);
    let updatedRoleList = q('job_title') || [];
    let updatedLocationList = q('location') || [];
    let updateDutiesList = q('duty') || [];
    let updateStartDates = q('employment_start_date') || [];
    let updateEndedDates = q('employment_start_date') || [];

    // Ensure updatedJobIds is an array of integers
    updatedJobIds = updatedJobIds.map(function(jobId) {
        return parseInt(jobId);
    });

    // Create an array of the updated jobs. false IDs indicate it needs to be created
    let userEmploymentHistory = updatedCompanyList.map(function(company, idx) {
        let id = updatedJobIds[idx] ? updatedJobIds[idx] : false;

        return {
            id: id,
            company: company,
            role: updatedRoleList[idx],
            location: updatedLocationList[idx],
            duties: updateDutiesList[idx],
            start_date: updateStartDates[idx] ? new Date(Date.parse(updateStartDates[idx])).toISOString() : new Date(Date.now()).toISOString(),
            end_date: updateEndedDates[idx] ? new Date(Date.parse(updateEndedDates[idx])).toISOString() :  new Date(Date.now()).toISOString(),
            resume: resumeId
        };
    });


    Employment.find({resume: resumeId}).then(function(employmentHistoryArr) {
        let currentEmploymentIds = _.map(employmentHistoryArr, function(employmentObject) {
            return employmentObject.id
        });

        // Array of job IDs to be deleted =  IDs current saved not included in the updated list
        let jobsToDelete = _.difference(currentEmploymentIds, updatedJobIds);

        userEmploymentHistory.forEach(function(employmentHistory) {
            var employmentHistoryClone = _.cloneDeep(employmentHistory);
            delete employmentHistoryClone.id;

            if (employmentHistory.id === false) {
                // Create
                Employment.create(employmentHistoryClone)
                .catch(err => {
                    console.error(err);
                });
            } else {
              // Update
              // TODO: Don't make an update if we don't have to...
              Employment.update({ id: employmentHistory.id }, employmentHistoryClone)
                .catch(err => {
                  console.error(err);
                });
            }
        });

      if (jobsToDelete.length > 0) {
        Employment.destroy({id: jobsToDelete})
          .catch(err => {
            console.error(err);
          });
      }

    }).catch(function(err) {
        console.error(err);
    })
}

function updateReferences(q, resumeId) {

    // TODO: only need to do this for first entry
    let referenceIds = q('reference_id') || [];
    let referenceFnameList = removeLastEmptyStrings(q('reference_fname'));
    let referenceLnameList = q('reference_lname') || [];
    let referenceCompanyList = q('reference_company') || [];
    let referenceJobList = q('reference_job_title') || [];
    let referenceEmailList = q('reference_email') || [];
    let referencePhoneList= q('reference_phone') || [];

    // Ensure referenceIds is an array of integers
    referenceIds = referenceIds.map(function(referenceId) {
        return parseInt(referenceId);
    });

    // Create an array of the updated references. false IDs indicate it needs to be created
    let userReferences = referenceFnameList.map(function(referenceFname, idx) {
        let id = referenceIds[idx] ? referenceIds[idx] : false;

        return {
            id: id,
            name: `${referenceFname} ${referenceLnameList[idx]}`,
            company: referenceCompanyList[idx],
            job_title: referenceJobList[idx],
            email: referenceEmailList[idx],
            phone: referencePhoneList[idx],
            resume: resumeId
        };
    });

    ReferenceContact.find({resume: resumeId}).then(function(referencesArr) {
        let currentReferencesIds = _.map(referencesArr, function(referenceObj) {
            return referenceObj.id
        });

        // Array of reference IDs to be deleted =  IDs current saved not included in the updated list
        let referencesToDelete = _.difference(currentReferencesIds, referenceIds);

        userReferences.forEach(function(userReference) {
            var userReferenceClone = _.cloneDeep(userReference);
            delete userReferenceClone.id;

            if (userReference.id === false) {
                // Create
                ReferenceContact.create(userReferenceClone)
                .catch(err => {
                    console.error(err);
                });
            } else {
              // Update
              // TODO: Don't make an update if we don't have to...
              ReferenceContact.update({ id: userReference.id }, userReferenceClone)
                .catch(err => {
                  console.error(err);
                });
            }


        });

      if (referencesToDelete.length > 0) {
        ReferenceContact.destroy({id: referencesToDelete})
          .catch(err => {
            console.error(err);
          });
      }
    }).catch(function(err) {
        console.error(err);
    });

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
}


module.exports = {
	editView: function(req, res) {
        const userEmail = req.session.userEmail;
        const enableAmplitude = process.env.ENABLE_AMPLITUDE ? true : false;

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
                            let resumeEducation = resume.educations;

                            let hasEducationName = resumeEducation && resumeEducation[0] && resumeEducation[0].institution ? true : false;
                            let hasEducationProgram = resumeEducation && resumeEducation[0] && resumeEducation[0].programme ? true : false;

                            return res.view('cv/update', {
                                resume: resume,
                                me: me,
                                honours: honours,
                                countries: resp.countries,
                                states: resp.states,
                                result: _result,
                                test_title: test_title,
                                canEditResume: true,
                                showContactInfo: true,
                                completeResumeEducation: resume.profile_status && hasEducationName && hasEducationProgram,
                                userEmail: userEmail,
                                enableAmplitude: enableAmplitude
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

        updateResumeQualifications(req.param, resumeId);

        updateResumeEmploymentHistory(req.param, resumeId);

        updateReferences(req.param, resumeId);

        updateResumeEducation(req.param, resumeId)
        // lets handle associative data

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
            // profile_status: ,
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
