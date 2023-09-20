import dotenv from 'dotenv';

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '8000';

const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRETE_KEY = process.env.S3_SECRETE_KEY;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

const S3 = {
  access_key: S3_ACCESS_KEY,
  secrete_key: S3_SECRETE_KEY,
  bucket_name: S3_BUCKET_NAME,
};

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mysql: MYSQL,
  server: SERVER,
  s3: S3,
};

export default config;
