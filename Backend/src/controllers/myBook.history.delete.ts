import { Response, Request, NextFunction } from 'express';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';

export default async function myBookHistoryDelete(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'MY_BOOK_HISTORY_DELETE';
  const { users_books_history_id } = req.params;
  logging.info(NAMESPACE, '[START]', users_books_history_id);
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const MY_BOOK_HISTORY_DELETE_SQL = 'DELETE FROM users_books_history ' + 'WHERE id = ?';
      const MY_BOOK_HISTORY_DELETE_VALUE = [users_books_history_id];
      const [MY_BOOK_HISTORY_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_HISTORY_DELETE_SQL,
        MY_BOOK_HISTORY_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_HISTORY_DELETE_RESULT]', MY_BOOK_HISTORY_DELETE_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: '삭제에 성공했습니다.' });
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
      await connection.rollback();
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
