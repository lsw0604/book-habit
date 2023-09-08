import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';

export default async function myBookList(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'BOOK_LIST_DELETE';
  const { users_books_id } = req.params;
  logging.info(NAMESPACE, '[REQ.PARAMS]', users_books_id);
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const MY_BOOK_HISTORY_DELETE_SQL = 'DELETE FROM users_books_history WHERE users_books_id = ?';
      const MY_BOOK_HISTORY_DELETE_VALUE = [parseInt(users_books_id)];
      const [MY_BOOK_HISTORY_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_HISTORY_DELETE_SQL,
        MY_BOOK_HISTORY_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_STATUS_DELETE_RESULT]', MY_BOOK_HISTORY_DELETE_RESULT);

      const MY_BOOK_RATING_DELETE_SQL = 'DELETE FROM users_books_rating WHERE users_books_id = ?';
      const MY_BOOK_RATING_DELETE_VALUE = [parseInt(users_books_id)];
      const [MY_BOOK_RATING_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_RATING_DELETE_SQL,
        MY_BOOK_RATING_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_INFO_DELETE_RESULT]', MY_BOOK_RATING_DELETE_RESULT);

      const MY_BOOK_DELETE_SQL = 'DELETE FROM users_books WHERE id = ?';
      const MY_BOOK_DELETE_VALUE = [parseInt(users_books_id)];
      const [MY_BOOK_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_DELETE_SQL,
        MY_BOOK_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_DELETE_RESULT]', MY_BOOK_DELETE_RESULT);

      await connection.commit();
      connection.release();
      return res.status(200).json({ status: 'success', message: '삭제 완료했습니다.' });
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
