import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookHistoryType } from '../types';

const NAMESPACE = 'BOOKS_MY_BOOK_INFO';

export default async function myBookRating(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  const { users_books_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      logging.debug(NAMESPACE, '[REQ.BODY]', req.body);
      logging.debug(NAMESPACE, '[REQ.BODY]', id);
      logging.debug(NAMESPACE, '[REQ.BODY]', users_books_id);

      connection.release();
      res.status(200).json({
        test: 'test',
      });
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
      connection.release();
      res.status(400).json({
        code: error?.code,
        errno: error?.errno,
        message: error?.sqlMessage,
        sql: error?.sql,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);

    return res.status(500).json({
      code: error?.code,
      errno: error?.errno,
      message: error?.sqlMessage,
      sql: error?.sql,
    });
  }
}
