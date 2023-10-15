import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';
import dayjs from 'dayjs';
import { MyBookReadRegisterRequest } from '../types';

interface IRequest<T> extends Request {
  body: T;
}

export default async function readBook(
  req: IRequest<MyBookReadRegisterRequest>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'READ_BOOK_REGISTER';
  logging.info(NAMESPACE, '[START]');

  const { users_books_id, startDate, endDate } = req.body;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      const USERS_BOOKS_HISTORY_START_SQL =
        'INSERT INTO users_books_history (status, users_books_id, date) VALUES (?, ?, ?)';
      const USERS_BOOKS_HISTORY_START_VALUES = [
        '읽기시작함',
        users_books_id,
        dayjs(startDate).add(9, 'hour').toISOString().split('T')[0],
      ];
      const [USERS_BOOKS_HISTORY_START_RESULT] = await connection.query<ResultSetHeader>(
        USERS_BOOKS_HISTORY_START_SQL,
        USERS_BOOKS_HISTORY_START_VALUES
      );
      logging.debug(
        NAMESPACE,
        '[USER_BOOKS_HISTORY_START_RESULT]',
        USERS_BOOKS_HISTORY_START_RESULT
      );

      const USERS_BOOKS_HISTORY_END_SQL =
        'INSERT INTO users_books_history (status, users_books_id, date) VALUES (?, ?, ?)';
      const USERS_BOOKS_HISTORY_END_VALUES = [
        '다읽음',
        users_books_id,
        dayjs(endDate).add(9, 'hour').toISOString().split('T')[0],
      ];
      const [USERS_BOOKS_HISTORY_END_RESULT] = await connection.query<ResultSetHeader>(
        USERS_BOOKS_HISTORY_END_SQL,
        USERS_BOOKS_HISTORY_END_VALUES
      );
      logging.debug(NAMESPACE, '[USERS_BOOKS_HISTORY_END_RESULT]', USERS_BOOKS_HISTORY_END_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: '읽은책 등록에 성공했습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '읽은 책 등록에 실패 하셨습니다.',
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
