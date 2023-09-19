import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import dayjs from 'dayjs';

interface IRequest<T> extends Request {
  body: T;
}

interface IReadRequest {
  authors: string;
  publisher: string;
  thumbnail: string;
  isbn: string;
  price: number;
  status: string;
  title: string;
  startDate: string;
  endDate: string;
  url: string;
  contents: string;
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

  const {
    isbn,
    title,
    authors,
    publisher,
    price,
    thumbnail,
    status,
    startDate,
    endDate,
    contents,
    url,
  } = req.body;
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });

  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      logging.info(NAMESPACE, '[REQ.BODY]', req.body);

      const BOOK_EXIST_SQL = 'SELECT isbn, id FROM books WHERE isbn = ?';
      const BOOK_EXIST_VALUES = [isbn];
      const [BOOK_EXIST_RESULT] = await connection.query<IBookExistResult[]>(
        BOOK_EXIST_SQL,
        BOOK_EXIST_VALUES
      );
      logging.debug(NAMESPACE, '[BOOK_EXIST_RESULT]', BOOK_EXIST_RESULT[0]);

      if (BOOK_EXIST_RESULT[0] === undefined) {
        const BOOK_REGISTER_SQL =
          'INSERT INTO books (isbn, title, authors, publisher, price, thumbnail, url, contents, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const BOOK_REGISTER_VALUES = [
          isbn,
          title,
          authors,
          publisher,
          price,
          thumbnail,
          url,
          contents,
          status,
        ];
        const [BOOK_REGISTER_RESULT] = await connection.query<ResultSetHeader>(
          BOOK_REGISTER_SQL,
          BOOK_REGISTER_VALUES
        );
        logging.debug(NAMESPACE, '[BOOK_REGISTER_RESULT]', BOOK_REGISTER_RESULT);

        const USERS_BOOKS_SQL = 'INSERT INTO users_books (users_id, books_id) VALUES(?, ?)';
        const USERS_BOOKS_VALUES = [id, BOOK_REGISTER_RESULT.insertId];
        const [USERS_BOOKS_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_SQL,
          USERS_BOOKS_VALUES
        );
        logging.debug(NAMESPACE, '[USER_BOOKS_RESULT]', USERS_BOOKS_RESULT);

        const USERS_BOOKS_HISTORY_START_SQL =
          'INSERT INTO users_books_history (status, users_books_id, date) VALUES (?, ?, ?)';
        const USERS_BOOKS_HISTORY_START_VALUES = [
          '읽기시작함',
          USERS_BOOKS_RESULT.insertId,
          dayjs(startDate).add(9, 'hour').toISOString().split('T')[0],
        ];
        const [USERS_BOOKS_HISTORY_START_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_HISTORY_START_SQL,
          USERS_BOOKS_HISTORY_START_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[USER_BOOKS_HISTORY_START_RESULT]',
          USERS_BOOKS_HISTORY_START_RESULT
        );

        const USERS_BOOKS_HISTORY_END_SQL =
          'INSERT INTO users_books_history (status, users_books_id, date) VALUES (?, ?, ?)';
        const USERS_BOOKS_HISTORY_END_VALUES = [
          '다읽음',
          USERS_BOOKS_RESULT.insertId,
          dayjs(endDate).add(9, 'hour').toISOString().split('T')[0],
        ];
        const [USERS_BOOKS_HISTORY_END_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_HISTORY_END_SQL,
          USERS_BOOKS_HISTORY_END_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[USERS_BOOKS_HISTORY_END_RESULT]',
          USERS_BOOKS_HISTORY_END_RESULT
        );

        await connection.commit();
        connection.release();
        res.status(200).json({ status: 'success', message: '읽은책 등록에 성공했습니다.' });
      } else {
        const USERS_BOOKS_SQL = 'INSERT INTO users_books (users_id, books_id) VALUES(?, ?)';
        const USERS_BOOKS_VALUES = [id, BOOK_EXIST_RESULT[0].id];
        const [USERS_BOOKS_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_SQL,
          USERS_BOOKS_VALUES
        );
        logging.debug(NAMESPACE, '[USERS_BOOKS_RESULT]', USERS_BOOKS_RESULT);

        const USERS_BOOKS_HISTORY_START_SQL =
          'INSERT INTO users_books_history (status, users_books_id, date) VALUES (?, ?, ?)';
        const USERS_BOOKS_HISTORY_START_VALUES = [
          '읽기시작함',
          USERS_BOOKS_RESULT.insertId,
          dayjs(startDate).add(9, 'hour').toISOString().split('T')[0],
        ];
        const [USERS_BOOKS_HISTORY_START_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_HISTORY_START_SQL,
          USERS_BOOKS_HISTORY_START_VALUES
        );
        logging.debug(
          NAMESPACE,
          '[USERS_BOOKS_HISTORY_START_RESULT]',
          USERS_BOOKS_HISTORY_START_RESULT
        );

        const USERS_BOOKS_HISTORY_END_SQL =
          'INSERT INTO users_books_history (status, users_books_id, date) VALUES (?, ?, ?)';
        const USERS_BOOKS_HISTORY_END_VALUES = [
          '다읽음',
          USERS_BOOKS_RESULT.insertId,
          dayjs(endDate).add(9, 'hour').toISOString().split('T')[0],
        ];
        const [USERS_BOOKS_HISTORY_END_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_HISTORY_END_SQL,
          USERS_BOOKS_HISTORY_END_VALUES
        );

        logging.debug(
          NAMESPACE,
          '[USERS_BOOKS_HISTORY_END_RESULT]',
          USERS_BOOKS_HISTORY_END_RESULT
        );
        await connection.commit();
        connection.release();
        res.status(200).json({ status: 'success', message: '읽은책 등록에 성공했습니다.' });
      }
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
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
