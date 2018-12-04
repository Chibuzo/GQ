module.exports = {
    signupRequest: function(data) {
        return new Promise(function(resolve, reject) {
            CompanyRequest.findOrCreate(data).exec(function(err, coy) {
                if (err) return reject(err);
                //sendMail.companySignUpRequest(coy);
                return resolve(true);
            });
        });
    },

    saveCompany: function(data) {
        return new Promise(function(resolve, reject) {
            Company.findOrCreate({ contact_email: data.contact_email }, data).exec(function(err, company) {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                return resolve({ status: 'success', company: company})
            });
        });
    }
}