import { Response, Request, NextFunction } from 'express';
import { connectionPool } from '../config/database';
import logging from '../config/logging';
import { MyBookRatingType } from '../types';

export default async function myBookRatingList(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'BOOKS_MY_BOOK_RATING_LIST';
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { users_books_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT status, created_at, rating, id ' +
        'FROM users_books_rating ' +
        'WHERE users_books_id = ?';
      const VALUE = [parseInt(users_books_id)];
      const [RESULT] = await connection.query<MyBookRatingType[]>(SQL, VALUE);

      logging.debug(NAMESPACE, '[RESULT]', RESULT);

      connection.release();
      res.status(200).json({
        result: RESULT,
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
