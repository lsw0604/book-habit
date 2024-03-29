import { Response, Request, NextFunction } from 'express';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookTimeRangeType } from '../types';

const NAMESPACE = 'MY_BOOK_TIME_RANGE';

export default async function myBookTimeRange(req: Request, res: Response, _: NextFunction) {
  const { users_books_id } = req.params;

  logging.info(NAMESPACE, '[START]');
  try {
    logging.info(NAMESPACE, '[REQ.PARAMS]', users_books_id);
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT ' +
        "MAX(CASE WHEN status = '다읽음' THEN date ELSE NULL END) AS endDate, " +
        'CASE WHEN ' +
        "MAX(CASE WHEN status = '읽기시작함' THEN date ELSE NULL END) IS NULL AND " +
        "MAX(CASE WHEN status = '읽고싶음' THEN date ELSE NULL END) IS NOT NULL THEN " +
        "MAX(CASE WHEN status = '읽고싶음' THEN date ELSE NULL END) WHEN " +
        "MAX(CASE WHEN status = '읽기시작함' THEN date ELSE NULL END) IS NOT NULL AND " +
        "MAX(CASE WHEN status = '읽고싶음' THEN date ELSE NULL END) IS NULL THEN " +
        "MAX(CASE WHEN status = '읽기시작함' THEN date ELSE NULL END) ELSE " +
        'GREATEST( ' +
        "MAX(CASE WHEN status = '읽기시작함' THEN date ELSE NULL END), " +
        "MAX(CASE WHEN status = '읽고싶음' THEN date ELSE NULL END) " +
        ') ' +
        'END AS startDate ' +
        'FROM users_books_history ' +
        'WHERE users_books_id = ?';
      const VALUE = [parseInt(users_books_id)];
      const [RESULT] = await connection.query<MyBookTimeRangeType[]>(SQL, VALUE);
      logging.debug(NAMESPACE, '[RESULT]', RESULT);

      connection.release();
      res.status(200).json({
        startDate: RESULT[0].startDate,
        endDate: RESULT[0].endDate,
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
