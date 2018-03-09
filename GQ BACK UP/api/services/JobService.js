module.exports = {
	apply: function(job_id, applicant_id) {
        return new Promise(function(resolve, reject)
        {
            // let's make sure no one applies more than once
            Application.find({ job: job_id, applicant: applicant_id }).exec(function (err, result) {
                if (err) return reject(err);
                if (result.length > 0) return resolve(true);

                // let's proceed
                Job.findOne({id: job_id}).exec(function (err, job) {
                    if (err) return reject(err);
                    var data = {
                        job: job_id,
                        company: job.company,
                        applicant: applicant_id
                    };
                    Application.create(data).exec(function (err) {
                        if (err) return reject(err);
                        return resolve(true);
                    });
                });
            });
        });
	}
}