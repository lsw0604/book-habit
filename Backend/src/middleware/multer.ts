import multer from 'multer';
import dayjs from 'dayjs';
import { v4 } from 'uuid';

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const date = dayjs().format('YYYYMMDD_HHmmSS');
      const splitFilename = file.originalname.split('.');
      const fileName = `${date}_${v4()}.${splitFilename[1]}`;
      cb(null, fileName);
    },
  }),
});

export default upload;
