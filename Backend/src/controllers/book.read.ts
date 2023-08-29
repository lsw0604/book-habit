import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import addHours from 'date-fns/addHours';

interface IRequest<T> extends Request {
  body: T;
}

interface IReadRequest {
  author: string;
  company: string;
  image: string;
  isbn: string;
  price: number;
  status: string;
  title: string;
  startDate: string;
  endDate: string;
  rating: number;
}

interface IBookExistResult extends RowDataPacket {
  isbn: string;
  id: number;
}

export default async function readBook(
  req: IRequest<IReadRequest>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'READ_BOOK_REGISTER';
  logging.info(NAMESPACE, '[START]');

  const { isbn, title, author, company, price, image, status, startDate, endDate, rating } =
    req.body;
  if (req.user === undefined) return res.status(403);

  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const BOOK_EXIST_SQL = 'SELECT isbn, id FROM books WHERE isbn = ?';
      const BOOK_EXIST_VALUES = [isbn];
      const [BOOK_EXIST_RESULT] = await connection.query<IBookExistResult[]>(
        BOOK_EXIST_SQL,
        BOOK_EXIST_VALUES
      );
      logging.debug(NAMESPACE, '[BOOK_EXIST_RESULT]', BOOK_EXIST_RESULT[0]);

      if (BOOK_EXIST_RESULT[0] === undefined) {
        const BOOK_REGISTER_SQL =
          'INSERT INTO books (isbn, title, author, company, price, image) VALUES(?, ?, ?, ?, ?, ?)';
        const BOOK_REGISTER_VALUES = [isbn, title, author, company, price, image];
        const [BOOK_REGISTER_RESULT] = await connection.query<ResultSetHeader>(
          BOOK_REGISTER_SQL,
          BOOK_REGISTER_VALUES
        );
        logging.debug(NAMESPACE, '[BOOK_REGISTER_RESULT]', BOOK_REGISTER_RESULT);

        const USER_BOOKS_SQL = 'INSERT INTO users_books (users_id, books_id) VALUES(?, ?)';
        const USER_BOOKS_VALUES = [id, BOOK_REGISTER_RESULT.insertId];
        const [USER_BOOKS_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_SQL,
          USER_BOOKS_VALUES
        );
        logging.debug(NAMESPACE, '[USER_BOOKS_RESULT]', USER_BOOKS_RESULT);

        const USER_BOOKS_INFO_SQL =
          'INSERT INTO users_books_info (rating, status, users_books_id) VALUES (?, ?, ?)';
        const USER_BOOKS_INFO_VALUES = [rating, status, USER_BOOKS_RESULT.insertId];
        const [USER_BOOKS_INFO_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_INFO_SQL,
          USER_BOOKS_INFO_VALUES
        );
        logging.debug(NAMESPACE, '[USER_BOOKS_INFO_RESULT]', USER_BOOKS_INFO_RESULT);

        const USER_BOOKS_STATUS_START_SQL =
          'INSERT INTO users_books_status (status, users_books_id, date) VALUES (?, ?, ?)';
        const USER_BOOKS_STATUS_START_VALUES = [
          '읽기시작함',
          USER_BOOKS_RESULT.insertId,
          new Date(addHours(new Date(startDate), 9).toISOString().split('T')[0]),
        ];
        const [USER_BOOKS_STATUS_START_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_STATUS_START_SQL,
          USER_BOOKS_STATUS_START_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[USER_BOOKS_STATUS_START_RESULT]',
          USER_BOOKS_STATUS_START_RESULT
        );

        const USER_BOOKS_STATUS_END_SQL =
          'INSERT INTO users_books_status (status, users_books_id, date) VALUES (?, ?, ?)';
        const USER_BOOKS_STATUS_END_VALUES = [
          '다읽음',
          USER_BOOKS_RESULT.insertId,
          new Date(addHours(new Date(endDate), 9).toISOString().split('T')[0]),
        ];
        const [USER_BOOKS_STATUS_END_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_STATUS_END_SQL,
          USER_BOOKS_STATUS_END_VALUES
        );
        logging.debug(NAMESPACE, '[USER_BOOKS_STATUS_END_RESULT]', USER_BOOKS_STATUS_END_RESULT);

        await connection.commit();
        connection.release();
        res.status(200).json({ status: 'success', message: '읽은책 등록에 성공했습니다.' });
      } else {
        const USER_BOOKS_SQL = 'INSERT INTO users_books (users_id, books_id) VALUES(?, ?)';
        const USER_BOOKS_VALUES = [id, BOOK_EXIST_RESULT[0].id];
        const [USER_BOOKS_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_SQL,
          USER_BOOKS_VALUES
        );
        logging.debug(NAMESPACE, '[USER_BOOKS_RESULT]', USER_BOOKS_RESULT);

        const USER_BOOKS_INFO_SQL =
          'INSERT INTO users_books_info (rating, status, users_books_id) VALUES (?, ?, ?)';
        const USER_BOOKS_INFO_VALUES = [rating, status, USER_BOOKS_RESULT.insertId];
        const [USER_BOOKS_INFO_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_INFO_SQL,
          USER_BOOKS_INFO_VALUES
        );
        logging.debug(NAMESPACE, '[USER_BOOKS_INFO_RESULT]', USER_BOOKS_INFO_RESULT);

        const USER_BOOKS_STATUS_START_SQL =
          'INSERT INTO users_books_status (status, users_books_id, date) VALUES (?, ?, ?)';
        const USER_BOOKS_STATUS_START_VALUES = [
          '읽기시작함',
          USER_BOOKS_RESULT.insertId,
          new Date(addHours(new Date(startDate), 9).toISOString().split('T')[0]),
        ];
        const [USER_BOOKS_STATUS_START_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_STATUS_START_SQL,
          USER_BOOKS_STATUS_START_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[USER_BOOKS_STATUS_START_RESULT]',
          USER_BOOKS_STATUS_START_RESULT
        );

        const USER_BOOKS_STATUS_END_SQL =
          'INSERT INTO users_books_status (status, users_books_id, date) VALUES (?, ?, ?)';
        const USER_BOOKS_STATUS_END_VALUES = [
          '다읽음',
          USER_BOOKS_RESULT.insertId,
          new Date(addHours(new Date(endDate), 9).toDateString().split('T')[0]),
        ];
        const [USER_BOOKS_STATUS_END_RESULT] = await connection.query<ResultSetHeader>(
          USER_BOOKS_STATUS_END_SQL,
          USER_BOOKS_STATUS_END_VALUES
        );

        logging.debug(NAMESPACE, '[USER_BOOKS_STATUS_END_RESULT]', USER_BOOKS_STATUS_END_RESULT);
        await connection.commit();
        connection.release();
        res.status(200).json({ status: 'success', message: '읽은책 등록에 성공했습니다.' });
      }
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
