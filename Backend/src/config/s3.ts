import { S3Client } from '@aws-sdk/client-s3';

const S3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRETE_KEY as string,
  },
});

export default S3;
