import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { IMyBooksResponse } from '../types';

const NAMESPACE = 'BOOKS_MY_BOOK_INFO';

export default async function myBookInfo(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined) return res.status(403);
  const { id } = req.user;
  const { isbn } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT status, start_date, end_date, created_at, updated_at, page, rating, isbn, title ' +
        'FROM diary_status ds ' +
        'LEFT JOIN users_books ub ON ds.users_books_id = ub.id ' +
        'LEFT JOIN books bs ON ub.books_id = bs.id ' +
        'WHERE users_id = ? AND isbn = ? ' +
        'ORDER BY created_at DESC';
      const VALUE = [id, isbn];
      const [RESULT] = await connection.query<IMyBooksResponse[]>(SQL, VALUE);

      res.status(200).json({
        books: RESULT,
      });
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
      connection.release();
      res.status(403).json({
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
