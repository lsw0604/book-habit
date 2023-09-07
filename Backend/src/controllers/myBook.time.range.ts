import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface IProps extends RowDataPacket {
  startDate: Date;
  endDate: Date;
}

export default async function myBookTimeRange(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'MY_BOOK_TIME_RANGE';
  const { users_books_id } = req.params;

  logging.info(NAMESPACE, '[START]');
  try {
    logging.info(NAMESPACE, '[REQ.PARAMS]', users_books_id);
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT ' +
        'MAX(CASE WHEN status = ? THEN date ELSE NULL END) AS endDate, ' +
        'GREATEST( ' +
        'MAX(CASE WHEN status = ? THEN date ELSE NULL END), ' +
        'MAX(CASE WHEN status = ? THEN date ELSE NULL END) ' +
        ') AS startDate ' +
        'FROM users_books_status ' +
        'WHERE users_books_id = ?';
      const VALUE = ['다읽음', '읽고싶음', '읽기시작함', users_books_id];
      const [RESULT] = await connection.query<IProps[]>(SQL, VALUE);
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
