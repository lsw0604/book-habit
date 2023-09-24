import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import sharp from 'sharp';
import S3 from '../config/s3';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';

export default async function profileUpdate(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'PROFILE_UPDATE';
  if (!req.file) return res.status(500).json({ message: '잘못된 접근입니다.', status: 'error' });
  if (!req.user) return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  logging.debug(NAMESPACE, '[START]', req.file);
  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const resizedImage = await sharp(req.file.path).resize(220, 220).toBuffer();

      const uploadParams: PutObjectCommandInput = {
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: req.file.filename,
        Body: resizedImage,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
      };
      const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${req.file.filename}`;
      const s3UploadCommand = new PutObjectCommand(uploadParams);

      await S3.send(s3UploadCommand);

      const PROFILE_UPDATE_SQL = 'UPDATE users SET profile = ? WHERE id = ?';
      const PROFILE_UPDATE_VALUE = [s3Url, id];
      const [PROFILE_UPDATE_RESULT] = await connection.query<ResultSetHeader>(
        PROFILE_UPDATE_SQL,
        PROFILE_UPDATE_VALUE
      );
      logging.debug(NAMESPACE, '[PROFILE_UPDATE_RESULT]', PROFILE_UPDATE_RESULT);

      await connection.commit();
      connection.release();
      res
        .status(200)
        .json({ message: '프로필 등록에 성공 하셨습니다.', status: 'success', profile: s3Url });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '프로필 등록에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, '[ERROR]', error);
    res.status(500).json({
      status: 'error',
      message: 'DB연결에 실패했습니다.',
      code: error?.code,
      errno: error?.errno,
      sql: error?.sql,
      sqlMessage: error?.sqlMessage,
    });
  }
}
