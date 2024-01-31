import { Response, Request, NextFunction } from 'express';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { HistoryType, MyBookHistoryListType, MyBookTimeRangeType, StatusType } from '../types';
import dayjs from 'dayjs';

const NAMESPACE = 'MY_BOOK_CALENDAR';

export default async function myBookCalendar(req: Request, res: Response, _: NextFunction) {
  const { users_books_id } = req.params;

  if (req.user === undefined) {
    logging.error(NAMESPACE, '[로그인이 필요합니다.]');
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  }

  const { id } = req.user;

  try {
    const connection = await connectionPool.getConnection();
    try {
      const TIME_RANGE_SQL =
        'SELECT MAX(CASE WHEN status = "다읽음" THEN date ELSE NULL END) AS endDate, MAX(CASE WHEN status = "읽기시작함" then date ELSE NULL END) AS startDate ' +
        'FROM users_books_history AS ubh ' +
        'RIGHT JOIN users_books AS ub ON ub.id = ubh.users_books_id ' +
        'WHERE users_books_id = ? AND ub.users_id = ?';
      const TIME_RANGE_VALUE = [parseInt(users_books_id), id];
      const [TIME_RANGE_RESULT] = await connection.query<MyBookTimeRangeType[]>(
        TIME_RANGE_SQL,
        TIME_RANGE_VALUE
      );
      logging.debug(NAMESPACE, '[TIME_RANGE_RESULT]', TIME_RANGE_RESULT);

      const HISTORY_SQL =
        'SELECT ubh.id, status, date, page, ubh.created_at, ubh.updated_at ' +
        'FROM users_books ub ' +
        'RIGHT JOIN users_books_history ubh ON ubh.users_books_id = ub.id ' +
        'WHERE ub.users_id = ? AND ub.id = ? ' +
        'ORDER BY date DESC';
      const HISTORY_VALUE = [parseInt(users_books_id), id];
      const [HISTORY_RESULT] = await connection.query<MyBookHistoryListType[]>(
        HISTORY_SQL,
        HISTORY_VALUE
      );
      logging.debug(NAMESPACE, '[HISTORY_RESULT]', HISTORY_RESULT);

      const data: { [date: string]: StatusType[] } = {};

      HISTORY_RESULT.forEach((item) => {
        const date_string = dayjs(item.date).add(9, 'hour').format('YYYY-MM-DD');
        data[date_string] = data[date_string] || [];
        data[date_string].push(item.status);
      });

      connection.release();
      res.status(200).json({
        startDate: TIME_RANGE_RESULT[0].startDate,
        endDate: TIME_RANGE_RESULT[0].endDate,
        historyList: data,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '책 읽은 기간 불러오는데 실패했습니다.',
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
