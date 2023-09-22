import multer from 'multer';
import multerS3 from 'multer-s3';
import dayjs from 'dayjs';
import { S3Client } from '@aws-sdk/client-s3';

const storage = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRETE_KEY as string,
  },
});

const upload = multer({
  storage: multerS3({
    s3: storage,
    bucket: process.env.S3_BUCKET_NAME as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const date = dayjs().format('YYYY_MM_DD_HH_mm_SS');
      const fileName = `${date}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

export default upload;
