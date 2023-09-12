import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookInfoType } from '../types';

export default async function myBookInfo(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'MY_BOOK_INFO';
  logging.info(NAMESPACE, '[START]');
  const { users_books_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const MY_BOOK_INFO_SQL =
        'SELECT bs.image, bs.title, bs.url, bs.contents, bs.publisher, bs.authors FROM users_books ub RIGHT JOIN books bs ON ub.books_id = bs.id WHERE ub.id = ? LIMIT 1';
      const MY_BOOK_INFO_VALUES = [users_books_id];
      const [MY_BOOK_INFO_RESULT] = await connection.query<MyBookInfoType[]>(
        MY_BOOK_INFO_SQL,
        MY_BOOK_INFO_VALUES
      );
      logging.debug(NAMESPACE, '[MY_BOOK_INFO_RESULT]', MY_BOOK_INFO_RESULT);

      connection.release();
      res.status(200).json({ result: MY_BOOK_INFO_RESULT[0] });
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
