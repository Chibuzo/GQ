 // Load the AWS SDK for Node.js
 var AWS = require('aws-sdk');
 // Set the region 
 AWS.config.update({region: 'us-east-2'});

 // Create an SQS service object
 var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports = {
    sendJob: function(message) {
        var params = {
            //DelaySeconds: 10,
            MessageAttributes: {
             
            },
            MessageBody: message,
            QueueUrl: "https://sqs.us-east-2.amazonaws.com/013357655760/gq-cv-extractor-jobs"
        };
           
        sqs.sendMessage(params, function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            //console.log("Success", data.MessageId);
            }
        });
    },

    viewDeleteMsg: function() {
        var queueURL = "https://sqs.us-east-2.amazonaws.com/013357655760/gq-cv-extractor-jobs";

        var params = {
        AttributeNames: [
            "SentTimestamp"
        ],
        MaxNumberOfMessages: 1,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: queueURL,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0
        };

        sqs.receiveMessage(params, function(err, data) {
            if (err) {
                console.log("Receive Error", err);
            } else if (data.Messages) {
                console.log(data)
                var deleteParams = {
                    QueueUrl: queueURL,
                    ReceiptHandle: data.Messages[0].ReceiptHandle
                };
                sqs.deleteMessage(deleteParams, function(err, data) {
                    if (err) {
                        console.log("Delete Error", err);
                    } else {
                        console.log("Message Deleted", data);
                    }
                });
            }
        });
    }
}