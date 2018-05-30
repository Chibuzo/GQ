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
    let updatedQualificationsInstitutions = q('qualification_institution') || [];

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
            date: updatedQualificationsDates[idx],
            institution: updatedQualificationsInstitutions[idx]
        };
    });

    return Qualification.find({resume: resumeId})
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
                resume: resumeId,
                institution: userQualification.institution
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
    })
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

    return Education.find({resume: resumeId}).then(function(institutionsArr) {

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

    });
}

function updateResumeEmploymentHistory(q, resumeId) {

    let updatedJobIds = q('employment_id') || [];
    let updatedCompanyList = removeEmptyStrings(q('company') || []);
    let updatedRoleList = q('job_title') || [];
    let updatedLocationList = q('location') || [];
    let updateDutiesList = q('duty') || [];
    let updateStartDates = q('employment_start_date') || [];
    let updateEndedDates = q('employment_end_date') || [];

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


    return Employment.find({resume: resumeId}).then(function(employmentHistoryArr) {
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

    });
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

    return ReferenceContact.find({resume: resumeId}).then(function(referencesArr) {
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
    })
}


module.exports = {
	editView: function(req, res) {
        const userEmail = req.session.userEmail;
        const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;


       return Promise.all([
            CountryStateService.getCountries(),
            Honour.find(),
            CBTService.candidateGeneralTestResult(req.session.userId),
            Resume.findOne({ user: req.session.userId }).populate('user').populate('educations').populate('qualifications').populate('employments').populate('referencecontacts')
        ]).then(results => {
            let resp = results[0];
            let honours = results[1];
            let result = results[2];
            let resume = results[3];

            var me = {
                fname: resume.user.fullname.split(' ')[0],
                lname: resume.user.fullname.split(' ')[1]
            };

            var _result, test_title;
            if (result) {
                _result = result;
                test_title = 'General Aptitude Test';
            }
            let resumeEducation = resume.educations;

            let hasEducationName = resumeEducation && resumeEducation[0] && resumeEducation[0].institution ? true : false;
            let hasEducationProgram = resumeEducation && resumeEducation[0] && resumeEducation[0].programme ? true : false;

            let disablePhotoTabClass = !resume.profile_status ? 'disable-tab': '';
            let disableTestTabClass = !resume.profile_status || !resume.photo_status ? 'disable-tab': '';
            let disableVideoTabClass = !resume.profile_status || !resume.photo_status || !resume.test_status ? 'disable-tab': '';

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
                enableAmplitude: enableAmplitude,
                disablePhotoTabClass,
                disableTestTabClass,
                disableVideoTabClass
            });

        }).catch(err => {
            return res.serverError(err);
        })
    },

    save: function(req, res) {
        var q = req.param;  // trying to make life easier
        var sections = [], status; // for profile complete status
        let resumeId = q('resume_id');

        return Promise.all([
            updateResumeQualifications(req.param, resumeId),
            updateResumeEmploymentHistory(req.param, resumeId),
            updateReferences(req.param, resumeId),
            updateResumeEducation(req.param, resumeId)
        ])
        .then(() => {
            // lets handle associative data

            if ((q('video_status') == true) && (q('test_status') == true)) {
                status = 'Complete';
            } else {
                status = 'Incomplete';
            }

            var data = {
                fullname: q('fname') + ' ' + q('lname'),
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
                current_salary: q('current_salary') ? q('current_salary') : 0.0,
                expected_salary: q('expected_salary') ? q('expected_salary') : 0.0,
                profile_status: true,
                status: status
            };

            return Resume.update({ id: q('resume_id') }, data)
            .then(resume => {
                // just update fullname on user table
                User.update({ id: resume[0].user }, { fullname: data.fullname }).exec(function() {});

                return res.json(200, { status: 'success' });
            }).catch(err => {
                console.error(err);

                if (err.invalidAttributes && err.invalidAttributes.phone && err.invalidAttributes.phone[0] && err.invalidAttributes.phone[0].rule === 'unique') {
                    return res.json(200, {
                        status: 'error',
                        msg: 'You may already have an account on getQualified, Please try logging in to it.'
                    });
                } else {
                    return res.json(200, { status: 'error', msg: err });
                }
            });
        })
        .catch(err => {
            return res.serverError(err);
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

        return Resume.find({ user: req.param('user_id') })
            .then(resume => {
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
                        folder: folder,
                        showContactInfo: folder === 'admin' ? true : false
                    });
                }).catch(function(err) {
                    return res.serverError(err);
                });

            })
            .catch(err => {
                return res.serverError(err);
            })
    },


    viewSampleCV: function(req, res) {
        res.setHeader('Content-disposition', 'inline; filename=sampleCV.pdf');
        res.setHeader('Content-type', 'application/pdf');
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();
        fileAdapter.read(sails.config.appPath + '/assets/sampleCV.pdf').on('error', function (err) {
            return res.serverError(err);
        }).pipe(res);
    }
};
