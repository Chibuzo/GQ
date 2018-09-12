module.exports = {
    signupRequest: function(data) {
        return new Promise(function(resolve, reject) {
            CompanyRequest.findOrCreate(data).exec(function(err, coy) {
                if (err) return reject(err);
                //sendMail.companySignUpRequest(coy);
                return resolve(true);
            });
        });
    }
}