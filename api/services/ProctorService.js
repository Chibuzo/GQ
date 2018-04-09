module.exports = {
    deleteProctorFiles: function(proctorSessionId) {
        const fs = require('fs');
        const path = require('path');
        const assetPath = path.resolve(sails.config.appPath + '/assets/proctorFiles');

        return ProctorRecord.find({proctor: proctorSessionId}).then(function(proctorRecords) {
            proctorRecords.forEach(record => {
                let path = `${assetPath}${record.filename}`;
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                }
            });
            return Promise.resolve();
        })
        .catch(function(err) {
            console.error(err);
            return Promise.reject(err);
        });
    }
}