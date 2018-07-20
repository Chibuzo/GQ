var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/s3_keys.json');

// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = {
    uploadProfileVideo: function(video) {
        // call S3 to retrieve upload file to specified bucket
        var uploadParams = {Bucket: 'getqualified', Key: '', Body: ''};
        var file = video;

        var fs = require('fs');
        return new Promise(function(resolve, reject) {
            var fileStream = fs.createReadStream(file);
            fileStream.on('error', function(err) {
                console.log('File Error', err);
                return reject(err);
            });
            uploadParams.Body = fileStream;

            var path = require('path');
            uploadParams.Key = path.basename(file);

            // call S3 to retrieve upload file to specified bucket
            s3.upload (uploadParams, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    return reject(err);
                } if (data) {
                    //console.log("Upload Success", data.Location);
                    return resolve({ status: 'success', url: data.Location });
                }
            });
        });
    },

    deleteProfileVideo: function(video) {
        var params = {
            Bucket: 'getqualified', 
            Key: video
        };

        s3.deleteObject(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else     console.log(data);
        });
    }
}