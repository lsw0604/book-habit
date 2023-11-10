import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface IRequest<T> extends Request {
  body: T;
}

interface IComment {
  rating: number;
  status: string;
  comment: string;
  comment_is_open: boolean;
  users_books_id: number;
}

interface IFindBookResult extends RowDataPacket {
  books_id: number;
}

const NAMESPACE = 'MY_BOOK_COMMENTS_REGISTER';

export default async function myBookCommentsRegister(
  req: IRequest<IComment>,
  res: Response,
  _: NextFunction
) {
  logging.debug(NAMESPACE, '[START]');
  const { comment, users_books_id, rating, status, comment_is_open } = req.body;
  logging.debug(NAMESPACE, '[REQ.BODY]', req.body);
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const FIND_BOOK_ID_SQL = 'SELECT books_id FROM users_books WHERE id = ?';
      const FIND_BOOK_ID_VALUE = [users_books_id];
      const [FIND_BOOK_ID_RESULT] = await connection.query<IFindBookResult[]>(
        FIND_BOOK_ID_SQL,
        FIND_BOOK_ID_VALUE
      );

      if (FIND_BOOK_ID_RESULT[0].books_id === undefined) {
        connection.release();
        return res.status(200).json({
          status: 'error',
          message: '한줄평 등록에 실패했습니다.',
        });
      }

      const MY_BOOK_COMMENT_REGISTER_SQL =
        'INSERT INTO users_books_comments (comment, users_books_id, rating, status, books_id, comment_is_open) VALUES(?, ?, ? ,?, ?, ?)';
      const MY_BOOK_COMMENT_REGISTER_VALUE = [
        comment,
        users_books_id,
        rating,
        status,
        FIND_BOOK_ID_RESULT[0].books_id,
        comment_is_open,
      ];
      const [MY_BOOK_COMMENT_REGISTER_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_COMMENT_REGISTER_SQL,
        MY_BOOK_COMMENT_REGISTER_VALUE
      );
      logging.debug(
        NAMESPACE,
        '[MY_BOOK_COMMENT_REGISTER_RESULT]',
        MY_BOOK_COMMENT_REGISTER_RESULT
      );

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: `한줄평 등록에 성공했습니다.` });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '한줄평 등록에 실패 하셨습니다.',
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
