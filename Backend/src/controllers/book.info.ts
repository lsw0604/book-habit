import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';

export default async function bookInfo(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'BOOK_INFO';
  logging.info(NAMESPACE, '[START]');

  try {
    const connection = await connectionPool.getConnection();
    try {
      const { title } = req.query;
      logging.debug(NAMESPACE, 'title', title);
      res.status(200).json({ status: 'success', message: '읽은책 등록에 성공했습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '읽은 책 등록에 실패 하셨습니다.',
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
