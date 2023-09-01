import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookExistResponseType } from '../types';

const NAMESPACE = 'MY_BOOK_EXIST';

export default async function myBookExist(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  const { isbn } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT status ' +
        'FROM users_books ub ' +
        'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
        'RIGHT JOIN users_books_info ubi ON ubi.users_books_id = ub.id ' +
        'WHERE users_id = ? AND isbn = ? ' +
        'ORDER BY ubi.created_at DESC ' +
        'LIMIT 1';
      const VALUE = [id, isbn];
      const [RESULT] = await connection.query<MyBookExistResponseType[]>(SQL, VALUE);
      logging.debug(NAMESPACE, '[RESULT]', RESULT);
      if (RESULT[0] === undefined) {
        connection.release();
        return res.status(200).json({ status: '미등록' });
      }
      connection.release();
      return res.status(200).json({ status: RESULT[0].status });
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
