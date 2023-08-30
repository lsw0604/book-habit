import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import addHours from 'date-fns/addHours';

interface IProps extends RowDataPacket {
  status: '다읽음' | '읽기시작함' | '다읽음';
}

interface IRequest<T> extends Request {
  body: T;
}

interface IReadRequest {
  users_books_id: number;
  status: '다읽음' | '읽기시작함' | '다읽음';
  date: Date;
  page?: number;
}

export default async function myBookRegister(
  req: IRequest<IReadRequest>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'READ_BOOK_MY_BOOK_REGISTER';
  logging.info(NAMESPACE, '[START]');

  const { status, date, page, users_books_id } = req.body;
  logging.info(NAMESPACE, '[REQ.BODY]', req.body);
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      const EXIST_READ_STATUS_SQL =
        'SELECT status ' + 'FROM users_books_status ' + 'WHERE users_books_id = ? AND status = ?';
      const EXIST_READ_STATUS_VALUES = [users_books_id, id];
      const [EXIST_READ_STATUS_RESULT] = await connection.query<IProps[]>(
        EXIST_READ_STATUS_SQL,
        EXIST_READ_STATUS_VALUES
      );

      logging.debug(NAMESPACE, '[EXIST_READ_STATUS_RESULT]', EXIST_READ_STATUS_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ test: EXIST_READ_STATUS_RESULT });
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
