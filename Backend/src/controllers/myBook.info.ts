import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { IMyBookInfoProps } from '../types';

const NAMESPACE = 'BOOKS_MY_BOOK_INFO';

export default async function myBookInfo(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  const { users_books_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT status, start_date, end_date, created_at, updated_at, page, rating ' +
        'FROM diary_status ds ' +
        'LEFT JOIN users_books ub ON ds.users_books_id = ub.id ' +
        'LEFT JOIN books bs ON ub.books_id = bs.id ' +
        'WHERE users_id = ? AND ub.id = ? AND title = ? ' +
        'ORDER BY created_at DESC';
      const VALUE = [id, users_books_id];
      const [RESULT] = await connection.query<IMyBookInfoProps[]>(SQL, VALUE);

      logging.debug(NAMESPACE, '[RESULT]', RESULT);

      connection.release();
      res.status(200).json({
        books: RESULT,
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
