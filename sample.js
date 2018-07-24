// Load the SDK and UUID
var AWS = require('aws-sdk');
//var uuid = require('uuid');

// // Create unique bucket name
// var bucketName = 'node-sdk-sample-' + uuid.v4();
// // Create name for uploaded object key
// var keyName = 'hello_world.txt';

// // Create a promise on S3 service object
// var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

// // Handle promise fulfilled/rejected states
// bucketPromise.then(
//   function(data) {
//     // Create params for putObject call
//     var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//     // Create object upload promise
//     var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
//     uploadPromise.then(
//       function(data) {
//         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//       });
// }).catch(
//   function(err) {
//     console.error(err, err.stack);
// });

// Set the region 
//AWS.config.update({region: 'LONDON'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});
                    
// Call S3 to list current buckets
s3.listBuckets(function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Bucket List", data.Buckets);
   }
});