import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';
import addHours from 'date-fns/addHours';

interface IRequest<T> extends Request {
  body: T;
}

interface IReadRequest {
  users_books_id: number;
  status: '읽는중';
  startDate: Date;
  page: number;
}

export default async function myBookReading(
  req: IRequest<IReadRequest>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'READ_BOOK_MY_BOOK_REGISTER';
  logging.info(NAMESPACE, '[START]');

  const { status, startDate, page, users_books_id } = req.body;
  logging.info(NAMESPACE, '[START]', req.body);
  if (req.user === undefined) return res.status(403);
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const SQL =
        'INSERT INTO diary_status (status, start_date, page, users_books_id) VALUES(?, ?, ?, ?)';
      const VALUES = [
        status,
        new Date(addHours(new Date(startDate), 9).toISOString().split('T')[0]),
        page,
        users_books_id,
      ];
      const [RESULT] = await connection.query<ResultSetHeader>(SQL, VALUES);

      logging.debug(NAMESPACE, '[FINISH]', RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: '읽고있는 책 등록에 성공했습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
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
