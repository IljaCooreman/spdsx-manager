const AWS = require('aws-sdk');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const BUCKET_NAME = process.env.BUCKET_NAME;

const copyFile = async (localPath, destFolder) => {
    // Set the region
    AWS.config.update({ region: 'eu-west-3' }); // = EU paris

    // Create S3 service object
    s3 = new AWS.S3({
        apiVersion: '2006-03-01'
    });

    // Configure the file stream and obtain the upload parameters
    const fileStream = fs.createReadStream(localPath);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });
    // call S3 to retrieve upload file to specified bucket
    console.log('start uploading file', localPath);
    return new Promise((resolve, reject) => {
        // call S3 to retrieve upload file to specified bucket
        s3.upload(
            {
                Bucket: BUCKET_NAME,
                ACL: 'public-read',
                Key: path.join(destFolder, path.basename(localPath)),
                Body: fileStream
            },
            function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log('file uploaded', data);
                resolve(data);
            }
        );
    });
};

module.exports = {
    copyFile
};
