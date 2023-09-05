import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

type MyBookExistType = {
  count: number;
} & RowDataPacket;

export default async function myBookExist(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'MY_BOOK_EXIST';
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  const { isbn } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT COUNT(*) AS count ' +
        'FROM users_books ub ' +
        'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
        'WHERE isbn = ? AND ub.users_id = ?';

      const VALUE = [isbn, id];
      const [RESULT] = await connection.query<MyBookExistType[]>(SQL, VALUE);
      logging.debug(NAMESPACE, '[RESULT]', RESULT);
      if (RESULT[0].count === 0) {
        connection.release();
        return res.status(200).json({ status: '미등록' });
      }
      connection.release();
      return res.status(200).json({ status: '등록' });
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
