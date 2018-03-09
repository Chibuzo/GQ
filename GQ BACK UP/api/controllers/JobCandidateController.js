/**
 * JobCandidateController
 *
 * @description :: Server-side logic for managing Jobcandidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // this function shows only those that took the test for the job

    getJobCandidates: function(req, res) {
        var job_id = req.param('job_id');
        Job.find({ id: job_id }).populate('applications').populate('category').exec(function(err, job) {
            var applicants = [];
            job[0].applications.forEach(function(application) {
                applicants.push(application.applicant);
            });
            // find the test for this job

            JobTest.find({ job_category: job[0].category.category, job_level: job[0].job_level }).populate('test').exec(function(err, jobtest) {
                if (jobtest.length < 1) {
                    return res.view('company/applicants-view', { results: {} });
                }
                TestResult.find({ test_id: jobtest[0].test.test_id, applicant: applicants }).populate('applicant') .exec(function(err, testresult) {
                    if (err) console.log(err);
                    return res.view('company/applicants-view', { results: testresult });
                });
            });
        });
    }

};

