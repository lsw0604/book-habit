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
  logging.debug(NAMESPACE, '[START]');

  const { status, date, users_books_id } = req.body;

  logging.debug(NAMESPACE, '[REQ.BODY]', req.body);

  if (req.user === undefined) {
    logging.error(NAMESPACE, '[로그인이 필요합니다.]');
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  }

  const { id } = req.user;

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      if (status === '읽는중') {
        logging.debug(NAMESPACE, '[dayjs]', dayjs(date).format('YYYY-MM-DD'));
        const MY_BOOK_HISTORY_EXIST_SQL =
          'SELECT COUNT(*) AS count FROM users_books_history WHERE status = ? AND date = ? AND users_books_id = ?';
        const MY_BOOK_HISTORY_EXIST_VALUE = [
          '읽는중',
          dayjs(date).format('YYYY-MM-DD'),
          users_books_id,
        ];
        const [MY_BOOK_HISTORY_EXIST_RESULT] = await connection.query<
          MyBookHistoryRegisterHistoryExistType[]
        >(MY_BOOK_HISTORY_EXIST_SQL, MY_BOOK_HISTORY_EXIST_VALUE);
        logging.debug(NAMESPACE, '[MY_BOOK_HISTORY_EXIST_RESULT]', MY_BOOK_HISTORY_EXIST_RESULT);

        if (MY_BOOK_HISTORY_EXIST_RESULT[0].count !== 0) {
          return res
            .status(200)
            .json({ status: 'info', message: `이미 ${status}상태가 존재합니다.` });
        }

        const MY_BOOK_HISTORY_REGISTER_SQL =
          'INSERT INTO users_books_history (date, status, users_books_id) VALUES (?, ?, ?)';
        const MY_BOOK_HISTORY_REGISTER_VALUES = [
          dayjs(date).add(9, 'hour').toISOString().split('T')[0],
          status,
          users_books_id,
        ];
        const [MY_BOOK_HISTORY_REGISTER_RESULT] = await connection.query<ResultSetHeader>(
          MY_BOOK_HISTORY_REGISTER_SQL,
          MY_BOOK_HISTORY_REGISTER_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[MY_BOOK_HISTORY_REGISTER_RESULT]',
          MY_BOOK_HISTORY_REGISTER_RESULT
        );

        await connection.commit();
        connection.release();
        return res
          .status(200)
          .json({ status: 'success', message: '읽는중인 책 등록에 성공했습니다.' });
      } else {
        const EXIST_MY_BOOK_HISTORY_SQL =
          'SELECT status ' +
          'FROM users_books ub ' +
          'RIGHT JOIN users_books_history ubh ON ubh.users_books_id = ub.id ' +
          'WHERE users_books_id = ? AND status = ? AND users_id = ?';
        const EXIST_MY_BOOK_HISTORY_VALUES = [users_books_id, status, id];
        const [EXIST_MY_BOOK_HISTORY_RESULT] = await connection.query<
          MyBookHistoryRegisterStatusExistType[]
        >(EXIST_MY_BOOK_HISTORY_SQL, EXIST_MY_BOOK_HISTORY_VALUES);

        logging.debug(NAMESPACE, '[EXIST_READ_STATUS_RESULT]', EXIST_MY_BOOK_HISTORY_RESULT);

        if (EXIST_MY_BOOK_HISTORY_RESULT.length !== 0) {
          connection.release();
          return res
            .status(200)
            .json({ status: 'info', message: `이미 ${status}상태가 존재합니다.` });
        }

        const MY_BOOK_HISTORY_REGISTER_SQL =
          'INSERT INTO users_books_history (status, date, users_books_id) VALUES (?, ? , ?)';
        const MY_BOOK_HISTORY_REGISTER_VALUES = [
          status,
          dayjs(date).add(9, 'hour').toISOString().split('T')[0],
          users_books_id,
        ];
        const [MY_BOOK_HISTORY_REGISTER_RESULT] = await connection.query<ResultSetHeader>(
          MY_BOOK_HISTORY_REGISTER_SQL,
          MY_BOOK_HISTORY_REGISTER_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[MY_BOOK_HISTORY_REGISTER_RESULT]',
          MY_BOOK_HISTORY_REGISTER_RESULT
        );

        await connection.commit();
        connection.release();
        res
          .status(200)
          .json({ status: 'success', message: `${status}상태 책 등록에 성공했습니다.` });
      }
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
