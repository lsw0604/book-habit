import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookHistoryType } from '../types';

export default async function myBookHistoryList(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'BOOKS_MY_BOOK_HISTORY_LIST';
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  const { users_books_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT status, date, page, ubs.created_at, ubs.updated_at ' +
        'FROM users_books ub ' +
        'RIGHT JOIN users_books_status ubs ON ubs.users_books_id = ub.id ' +
        'LEFT JOIN users_books_status_page ubsp ON ubsp.users_books_status_id = ubs.id ' +
        'WHERE ub.users_id = ? AND ub.id = ? ' +
        'ORDER BY date DESC';
      const VALUE = [id, users_books_id];
      const [RESULT] = await connection.query<MyBookHistoryType[]>(SQL, VALUE);

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
