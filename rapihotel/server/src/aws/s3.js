const awsConfig = require('../config');
const { S3Client, GetObjectCommand, ListObjectsCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

// Configura AWS S3
const s3 = new S3Client({
  region: awsConfig.s3.region,
  credentials: {
    accessKeyId: awsConfig.s3.accessKeyId,
    secretAccessKey: awsConfig.s3.secretAccessKey,
  },
});

const putObjectsS3 = async (bucket, key, body) => {
  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: bucket,
        Key: key,
        Body: body,
      },
    });

    upload.on("httpUploadProgress" , (progress) => {
      console.log(progress);
    });

    const data = await upload.done();
    const imageUrl = `https://d3n2qe9d3gjl02.cloudfront.net/${key}`;
    const contentType = data.ContentType;
    const Originalname = data.originalname;
    const name = data.Key; // Key es el nombre del archivo en S3

    return { name, imageUrl, contentType, Originalname };
  } catch (err) {
    throw err;
  }
};

const listObjectsS3 = async (bucket) => {
  try {
    const data = await s3.send(
      new ListObjectsCommand({
        Bucket: bucket,
      })
    );
    console.log('list Object Command> ', data);
  } catch (err) {
    console.log('error en listObjectsS3', err);
  }
};

const getObjectsS3 = async (bucket, key) => {
  try {
    const data = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
    console.log('get Object Command> ', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteObjectsS3 = async (bucket, key) => {
  try {
    const data = await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
    console.log('deleted Object Command> ', data);
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  putObjectsS3,
  listObjectsS3,
  getObjectsS3,
  deleteObjectsS3,
};