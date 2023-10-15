import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';
import dayjs from 'dayjs';
import { MyBOokReadToRegisterRequest } from '../types';

interface IRequest<T> extends Request {
  body: T;
}

export default async function readToBook(
  req: IRequest<MyBOokReadToRegisterRequest>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'READ_TO_BOOK_REGISTER';
  logging.info(NAMESPACE, '[START]');

  const { users_books_id } = req.body;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const USER_BOOKS_HISTORY_SQL = `INSERT INTO users_books_history (status, users_books_id, date) VALUES(?, ?, ?)`;
      const USER_BOOKS_HISTORY_VALUES = [
        '읽고싶음',
        users_books_id,
        dayjs().add(9, 'hour').toISOString().split('T')[0],
      ];
      const [USER_BOOKS_HISTORY_RESULT] = await connection.query<ResultSetHeader>(
        USER_BOOKS_HISTORY_SQL,
        USER_BOOKS_HISTORY_VALUES
      );
      logging.debug(NAMESPACE, '[USER_BOOKS_STATUS_RESULT]', USER_BOOKS_HISTORY_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: '읽고 싶은 책 등록에 성공했습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, 'SQL', error);
      res.status(400).json({
        status: 'error',
        message: '읽고 싶은 책 등록에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, '[ERROR]', error);
    res.status(500).json({
      status: 'error',
      message: 'DB연결에 실패했습니다.',
      code: error?.code,
      errno: error?.errno,
      sql: error?.sql,
      sqlMessage: error?.sqlMessage,
    });
  }
}
