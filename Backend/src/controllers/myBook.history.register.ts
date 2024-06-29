import { Response, NextFunction } from 'express';
import { ResultSetHeader } from 'mysql2';
import dayjs from 'dayjs';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import {
  IRequest,
  MyBookHistoryRegisterHistoryExistType,
  MyBookHistoryRegisterRequestType,
  MyBookHistoryRegisterStatusExistType,
} from '../types';

const NAMESPACE = 'MY_BOOK_HISTORY_REGISTER';

export default async function myBookHistoryRegister(
  req: IRequest<MyBookHistoryRegisterRequestType>,
  res: Response,
  _: NextFunction
) {
  const { status, date, users_books_id, page } = req.body;
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      if (status !== '읽는중') {
        const EXIST_MY_BOOK_HISTORY_STATUS_SQL =
          'SELECT COUNT(*) AS count ' +
          'FROM users_books ub ' +
          'RIGHT JOIN users_books_history ubh ON ubh.users_books_id = ub.id ' +
          'WHERE users_books_id = ? AND status = ? AND users_id = ?';
        const EXIST_MY_BOOK_HISTORY_STATUS_VALUE = [users_books_id, status, id];
        const [EXIST_MY_BOOK_HISTORY_STATUS_RESULT] = await connection.query<
          MyBookHistoryRegisterStatusExistType[]
        >(EXIST_MY_BOOK_HISTORY_STATUS_SQL, EXIST_MY_BOOK_HISTORY_STATUS_VALUE);

        if (EXIST_MY_BOOK_HISTORY_STATUS_RESULT[0].count !== 0) {
          connection.release();
          return res
            .status(200)
            .json({ status: 'info', message: `이미 ${status}상태가 존재합니다.` });
        }

        const MY_BOOK_HISTORY_REGISTER_SQL =
          'INSERT INTO users_books_history (date, status, users_books_id) VALUES (?, ?, ?)';
        const MY_BOOK_HISTORY_REGISTER_VALUES = [
          dayjs(date).add(9, 'hour').format('YYYY-MM-DD'),
          status,
          users_books_id,
        ];
        await connection.query<ResultSetHeader>(
          MY_BOOK_HISTORY_REGISTER_SQL,
          MY_BOOK_HISTORY_REGISTER_VALUES
        );
        await connection.commit();
        connection.release();
        return res
          .status(200)
          .json({ status: 'success', message: `${status} 상태 등록에 성공했습니다.` });
      }

      const EXIST_MY_BOOK_HISTORY_STATUS_SQL =
        'SELECT COUNT(*) AS count FROM users_books_history WHERE status =? AND date = ? AND users_books_id = ?';
      const EXIST_MY_BOOK_HISTORY_STATUS_VALUE = [
        status,
        dayjs(date).format('YYYY-MM-DD'),
        users_books_id,
      ];
      const [EXIST_MY_BOOK_HISTORY_STATUS_RESULT] = await connection.query<
        MyBookHistoryRegisterHistoryExistType[]
      >(EXIST_MY_BOOK_HISTORY_STATUS_SQL, EXIST_MY_BOOK_HISTORY_STATUS_VALUE);

      if (EXIST_MY_BOOK_HISTORY_STATUS_RESULT[0].count !== 0) {
        return res
          .status(200)
          .json({ status: 'info', message: `해당 날짜에 ${status}상태가 존재합니다.` });
      }

      const MY_BOOK_HISTORY_REGISTER_SQL =
        'INSERT INTO users_books_history (date, status, users_books_id, page) VALUES (?, ?, ?, ?)';
      const MY_BOOK_HISTORY_REGISTER_VALUES = [
        dayjs(date).add(9, 'hour').format('YYYY-MM-DD'),
        status,
        users_books_id,
        page,
      ];
      await connection.query<ResultSetHeader>(
        MY_BOOK_HISTORY_REGISTER_SQL,
        MY_BOOK_HISTORY_REGISTER_VALUES
      );

      await connection.commit();
      connection.release();
      return res
        .status(200)
        .json({ status: 'success', message: `${status} 상태 등록에 성공했습니다.` });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '책 등록에 실패 하셨습니다.',
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
