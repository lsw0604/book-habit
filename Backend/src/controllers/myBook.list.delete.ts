import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';

const NAMESPACE = 'BOOK_LIST_DELETE';

export default async function myBookList(req: Request, res: Response, _: NextFunction) {
  const { users_books_id } = req.params;
  logging.info(NAMESPACE, '[REQ.PARAMS]', users_books_id);
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const MY_BOOK_HISTORY_DELETE_SQL = 'DELETE FROM users_books_history WHERE users_books_id = ?';
      const MY_BOOK_HISTORY_DELETE_VALUE = [parseInt(users_books_id)];
      const [MY_BOOK_HISTORY_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_HISTORY_DELETE_SQL,
        MY_BOOK_HISTORY_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_HISTORY_DELETE_RESULT]', MY_BOOK_HISTORY_DELETE_RESULT);

      const COMMENT_LIKE_DELETE_SQL =
        'DELETE FROM comments_likes WHERE users_books_comments_id IN (SELECT id FROM users_books_comments WHERE users_books_id = ?)';
      const COMMENT_LIKE_DELETE_VALUE = [parseInt(users_books_id)];
      const [COMMENT_LIKE_DELETE_RESULT] = await connection.query(
        COMMENT_LIKE_DELETE_SQL,
        COMMENT_LIKE_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[COMMENT_LIKE_DELETE_RESULT]', COMMENT_LIKE_DELETE_RESULT);

      const PUBLIC_COMMENT_REPLY_DELETE_SQL =
        'DELETE FROM public_comments_reply WHERE users_books_comments_id IN (SELECT id FROM users_books_comments WHERE users_books_id = ?)';
      const PUBLIC_COMMENT_REPLY_DELETE_VALUE = [parseInt(users_books_id)];
      const [PUBLIC_COMMENT_REPLY_DELETE_RESULT] = await connection.query(
        PUBLIC_COMMENT_REPLY_DELETE_SQL,
        PUBLIC_COMMENT_REPLY_DELETE_VALUE
      );
      logging.debug(
        NAMESPACE,
        '[PUBLIC_COMMENT_REPLY_DELETE_RESULT]',
        PUBLIC_COMMENT_REPLY_DELETE_RESULT
      );

      const MY_BOOK_COMMENTS_DELETE_SQL =
        'DELETE FROM users_books_comments WHERE users_books_id = ?';
      const MY_BOOK_COMMENTS_DELETE_VALUE = [parseInt(users_books_id)];
      const [MY_BOOK_COMMENTS_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_COMMENTS_DELETE_SQL,
        MY_BOOK_COMMENTS_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_COMMENTS_DELETE_RESULT]', MY_BOOK_COMMENTS_DELETE_RESULT);

      const MY_BOOK_DELETE_SQL = 'DELETE FROM users_books WHERE id = ?';
      const MY_BOOK_DELETE_VALUE = [parseInt(users_books_id)];
      const [MY_BOOK_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_DELETE_SQL,
        MY_BOOK_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_DELETE_RESULT]', MY_BOOK_DELETE_RESULT);

      await connection.commit();
      connection.release();
      return res
        .status(200)
        .json({ status: 'success', message: '내 서재에 등록된 책을 삭제 완료했습니다.' });
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
      await connection.rollback();
      connection.release();
      res.status(400).json({
        code: error?.code,
        errno: error?.errno,
        message: error?.sqlMessage,
        sql: error?.sql,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);

    return res.status(500).json({
      code: error?.code,
      errno: error?.errno,
      message: error?.sqlMessage,
      sql: error?.sql,
    });
  }
}
