import { Response, Request, NextFunction } from 'express';
import dayjs from 'dayjs';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookHistoryListType } from '../types';

const NAMESPACE = 'BOOKS_MY_BOOK_HISTORY_LIST';

export default async function myBookHistoryList(req: Request, res: Response, _: NextFunction) {
  logging.info(NAMESPACE, '[START]');

  if (req.user === undefined) {
    logging.error(NAMESPACE, '[로그인이 필요합니다.]');
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  }

  const { id } = req.user;
  const { users_books_id } = req.params;

  try {
    const connection = await connectionPool.getConnection();
    try {
      const BOOKS_MY_BOOK_HISTORY_LIST_SQL =
        'SELECT ubh.id, status, date, page, ubh.created_at, ubh.updated_at ' +
        'FROM users_books ub ' +
        'RIGHT JOIN users_books_history ubh ON ubh.users_books_id = ub.id ' +
        'WHERE ub.users_id = ? AND ub.id = ? ' +
        'ORDER BY date DESC';
      const BOOKS_MY_BOOK_HISTORY_LIST_VALUE = [id, users_books_id];
      const [BOOKS_MY_BOOK_HISTORY_LIST_RESULT] = await connection.query<MyBookHistoryListType[]>(
        BOOKS_MY_BOOK_HISTORY_LIST_SQL,
        BOOKS_MY_BOOK_HISTORY_LIST_VALUE
      );

      const history = BOOKS_MY_BOOK_HISTORY_LIST_RESULT.reduce(
        (acc: Record<string, MyBookHistoryListType[]>, cur) => {
          const dateStr = dayjs(cur.date).add(9, 'hour').format('YYYY-MM-DD');

          if (!acc[dateStr]) {
            acc[dateStr] = [];
          }
          acc[dateStr].push({ ...cur });

          return acc;
        },
        {}
      );

      logging.debug(NAMESPACE, '[BOOKS_MY_BOOK_HISTORY_LIST_RESULT]', history);

      const lastIdx = BOOKS_MY_BOOK_HISTORY_LIST_RESULT.length - 1;

      connection.release();
      res.status(200).json({
        start_date:
          BOOKS_MY_BOOK_HISTORY_LIST_RESULT[lastIdx] &&
          BOOKS_MY_BOOK_HISTORY_LIST_RESULT[lastIdx].status === '읽기시작함'
            ? BOOKS_MY_BOOK_HISTORY_LIST_RESULT[lastIdx].date
            : undefined,
        end_date:
          BOOKS_MY_BOOK_HISTORY_LIST_RESULT[0] &&
          BOOKS_MY_BOOK_HISTORY_LIST_RESULT[0].status === '다읽음'
            ? BOOKS_MY_BOOK_HISTORY_LIST_RESULT[0].date
            : undefined,
        history,
      });
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
