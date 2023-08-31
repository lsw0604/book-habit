import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import addHours from 'date-fns/addHours';

interface IProps extends RowDataPacket {
  status: '다읽음' | '읽기시작함' | '읽는중';
}

interface IRequest<T> extends Request {
  body: T;
}

interface IReadRequest {
  users_books_id: number;
  status: '다읽음' | '읽기시작함' | '읽는중';
  date: Date;
  page?: number;
}

export default async function myBookRegister(
  req: IRequest<IReadRequest>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'READ_BOOK_MY_BOOK_REGISTER';
  logging.debug(NAMESPACE, '[START]');

  const { status, date, page, users_books_id } = req.body;
  logging.debug(NAMESPACE, '[REQ.BODY]', req.body);
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      if (status === '읽는중') {
        const MY_BOOK_HISTORY_REGISTER_SQL =
          'INSERT INTO users_books_status (date, status, users_books_id) VALUES (?, ?, ?)';
        const MY_BOOK_HISTORY_REGISTER_VALUES = [
          new Date(addHours(new Date(date), 9).toISOString().split('T')[0]),
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

        const MY_BOOK_HISTORY_REGISTER_PAGE_SQL =
          'INSERT INTO users_books_status_page (users_books_status_id, page) VALUES (?, ?)';
        const MY_BOOK_HISTORY_REGISTER_PAGE_VALUES = [
          MY_BOOK_HISTORY_REGISTER_RESULT.insertId,
          page,
        ];
        const [MY_BOOK_HISTORY_REGISTER_PAGE_RESULT] = await connection.query<ResultSetHeader>(
          MY_BOOK_HISTORY_REGISTER_PAGE_SQL,
          MY_BOOK_HISTORY_REGISTER_PAGE_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[MY_BOOK_HISTORY_REGISTER_PAGE_RESULT]',
          MY_BOOK_HISTORY_REGISTER_PAGE_RESULT
        );

        await connection.commit();
        connection.release();
        return res
          .status(200)
          .json({ status: 'success', message: '읽는중인 책 등록에 성공했습니다.' });
      }
      const EXIST_MY_BOOK_HISTORY_SQL =
        'SELECT status ' +
        'FROM users_books ub ' +
        'RIGHT JOIN users_books_status ubs ON ubs.users_books_id = ub.id ' +
        'WHERE users_books_id = ? AND status = ? AND users_id = ?';
      const EXIST_MY_BOOK_HISTORY_VALUES = [users_books_id, status, id];
      const [EXIST_MY_BOOK_HISTORY_RESULT] = await connection.query<IProps[]>(
        EXIST_MY_BOOK_HISTORY_SQL,
        EXIST_MY_BOOK_HISTORY_VALUES
      );

      logging.debug(NAMESPACE, '[EXIST_READ_STATUS_RESULT]', EXIST_MY_BOOK_HISTORY_RESULT);

      if (EXIST_MY_BOOK_HISTORY_RESULT.length !== 0) {
        connection.release();
        return res
          .status(200)
          .json({ status: 'info', message: `이미 ${status}상태가 존재합니다.` });
      }

      const MY_BOOK_HISTORY_REGISTER_SQL =
        'INSERT INTO users_books_status (status, date, users_books_id) VALUES (?, ? , ?)';
      const MY_BOOK_HISTORY_REGISTER_VALUES = [
        status,
        new Date(addHours(new Date(date), 9).toISOString().split('T')[0]),
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
      res.status(200).json({ status: 'success', message: `${status}상태 책 등록에 성공했습니다.` });
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
