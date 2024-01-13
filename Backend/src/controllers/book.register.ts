import { Response, NextFunction } from 'express';
import { ResultSetHeader } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { SearchBookRegisterRequest, IRequest, MyBookExistCountType, BookExistType } from '../types';

const NAMESPACE = 'BOOK_REGISTER';

export default async function bookRegister(
  req: IRequest<SearchBookRegisterRequest>,
  res: Response,
  next: NextFunction
) {
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인 필요합니다.' });
  const { id } = req.user;
  const { authors, contents, isbn, price, publisher, status, thumbnail, title, url } = req.body;

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      logging.info(NAMESPACE, '[REQ.BODY]', req.body);

      const BOOK_EXIST_SQL = 'SELECT isbn, id FROM books WHERE isbn = ?';
      const BOOK_EXIST_VALUE = [isbn];
      const [BOOK_EXIST_RESULT] = await connection.query<BookExistType[]>(
        BOOK_EXIST_SQL,
        BOOK_EXIST_VALUE
      );
      logging.debug(NAMESPACE, '[BOOK_EXIST_RESULT]', BOOK_EXIST_RESULT);

      if (BOOK_EXIST_RESULT[0] === undefined) {
        const BOOK_REGISTER_SQL =
          'INSERT INTO books (isbn, title, authors, publisher, price, thumbnail, url, contents, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const BOOK_REGISTER_VALUE = [
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
          BOOK_REGISTER_VALUE
        );
        logging.debug(NAMESPACE, '[BOOK_REGISTER_RESULT]', BOOK_REGISTER_RESULT);

        const USERS_BOOKS_SQL = 'INSERT INTO users_books (users_id, books_id) VALUES(?, ?)';
        const USERS_BOOKS_VALUE = [id, BOOK_REGISTER_RESULT.insertId];
        const [USERS_BOOKS_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_SQL,
          USERS_BOOKS_VALUE
        );
        logging.debug(NAMESPACE, '[USERS_BOOKS_RESULT]', USERS_BOOKS_RESULT);

        await connection.commit();
        connection.release();
        return res.status(200).json({ status: 'success', message: '책 등록에 성공하셨습니다.' });
      } else {
        const MY_BOOK_EXIST_SQL =
          'SELECT COUNT(*) AS count ' +
          'FROM users_books AS ub ' +
          'RIGHT JOIN books AS bs ON ub.books_id = bs.id ' +
          'WHERE isbn = ? AND ub.users_id = ?';
        const MY_BOOK_EXIST_VALUE = [isbn, id];
        const [MY_BOOK_EXIST_RESULT] = await connection.query<MyBookExistCountType[]>(
          MY_BOOK_EXIST_SQL,
          MY_BOOK_EXIST_VALUE
        );
        logging.debug(NAMESPACE, '[MY_BOOK_EXIST_RESULT]', MY_BOOK_EXIST_RESULT);

        if (MY_BOOK_EXIST_RESULT[0].count !== 0) {
          connection.release();
          return res.status(200).json({ status: 'info', message: '이미 등록된 책입니다.' });
        }

        const USERS_BOOKS_SQL = 'INSERT INTO users_books (users_id, books_id) VALUES(?, ?)';
        const USERS_BOOKS_VALUE = [id, BOOK_EXIST_RESULT[0].id];
        const [USERS_BOOKS_RESULT] = await connection.query<ResultSetHeader>(
          USERS_BOOKS_SQL,
          USERS_BOOKS_VALUE
        );
        logging.debug(NAMESPACE, '[USERS_BOOKS_RESULT]', USERS_BOOKS_RESULT);

        await connection.commit();
        connection.release();
        return res.status(200).json({ status: 'success', message: '책 등록에 성공하셨습니다.' });
      }
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
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
