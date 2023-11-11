import { Response, NextFunction } from 'express';
import { ResultSetHeader } from 'mysql2';
import dayjs from 'dayjs';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookReadingRegisterRequest, IRequest } from '../types';

const NAMESPACE = 'READING_BOOK_REGISTER';

export default async function readingBook(
  req: IRequest<MyBookReadingRegisterRequest>,
  res: Response,
  _: NextFunction
) {
  logging.info(NAMESPACE, '[START]');

  const { startDate, users_books_id } = req.body;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      logging.info(NAMESPACE, '[REQ.BODY]', req.body);

      const USERS_BOOKS_HISTORY_SQL =
        'INSERT INTO users_books_history (status, users_books_id, date) VALUES (?, ?, ?)';
      const USERS_BOOKS_HISTORY_VALUES = [
        '읽기시작함',
        users_books_id,
        dayjs(startDate).add(9, 'hour').toISOString().split('T')[0],
      ];
      const [USERS_BOOKS_HISTORY_RESULT] = await connection.query<ResultSetHeader>(
        USERS_BOOKS_HISTORY_SQL,
        USERS_BOOKS_HISTORY_VALUES
      );
      logging.debug(NAMESPACE, '[USERS_BOOKS_HISTORY_RESULT]', USERS_BOOKS_HISTORY_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: '읽는중인 책 등록에 성공했습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '읽는중인 책 등록에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, '[DB CONNECTION]', error);
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
