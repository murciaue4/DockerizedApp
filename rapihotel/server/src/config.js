require ('dotenv').config();

module.exports = {

    db: {
      host: process.env.DB_HOST, 
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    jwt: {
      secret: process.env.JET_SECRET || 'nota secreta' 
    },
    urlStatic: {
      urlstatic: process.env.URL_STATIC  || 'http://localhost:3333/'
    },
    s3: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_DEFAULT_REGION,
      bucket: process.env.AWS_BUCKET_NAME
    }
  }; 