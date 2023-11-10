import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';

const NAMESPACE = 'MY_BOOK_COMMENTS_DELETE';

export default async function myBookCommentsDelete(req: Request, res: Response, _: NextFunction) {
  logging.info(NAMESPACE, '[START]');

  const { comment_id } = req.params;

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const MY_BOOK_COMMENTS_LIKE_DELETE_SQL =
        'DELETE FROM comments_likes WHERE users_books_comments_id = ?';
      const MY_BOOK_COMMENTS_LIKE_DELETE_VALUE = [comment_id];
      const MY_BOOK_COMMENTS_LIKE_DELETE_RESULT = await connection.query<ResultSetHeader>(
        MY_BOOK_COMMENTS_LIKE_DELETE_SQL,
        MY_BOOK_COMMENTS_LIKE_DELETE_VALUE
      );
      logging.debug(
        NAMESPACE,
        '[MY_BOOK_COMMENTS_LIKE_DELETE_VALUE]',
        MY_BOOK_COMMENTS_LIKE_DELETE_RESULT
      );

      const MY_BOOK_COMMENTS_REPLY_DELETE_SQL =
        'DELETE FROM public_comments_reply WHERE users_books_comments_id = ?';
      const MY_BOOK_COMMENTS_REPLY_DELETE_VALUE = [comment_id];
      const [MY_BOOK_COMMENTS_REPLY_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_COMMENTS_REPLY_DELETE_SQL,
        MY_BOOK_COMMENTS_REPLY_DELETE_VALUE
      );
      logging.debug(
        NAMESPACE,
        '[MY_BOOK_COMMENTS_REPLY_DELETE_RESULT]',
        MY_BOOK_COMMENTS_REPLY_DELETE_RESULT
      );

      const MY_BOOK_COMMENTS_DELETE_SQL = 'DELETE FROM users_books_comments WHERE id = ?';
      const MY_BOOK_COMMENTS_DELETE_VALUE = [comment_id];
      const [MY_BOOK_COMMENTS_DELETE_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_COMMENTS_DELETE_SQL,
        MY_BOOK_COMMENTS_DELETE_VALUE
      );

      logging.debug(NAMESPACE, '[MY_BOOK_COMMENTS_DELETE_RESULT]', MY_BOOK_COMMENTS_DELETE_RESULT);
      await connection.commit();
      connection.release();
      res.status(200).json({
        message: '한줄평 삭제에 성공했습니다.',
        status: 'success',
      });
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
      connection.release();
      res.status(400).json({
        status: 'error',
        code: error?.code,
        errno: error?.errno,
        message: error?.sqlMessage,
        sql: error?.sql,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      status: 'error',
      code: error?.code,
      errno: error?.errno,
      message: error?.sqlMessage,
      sql: error?.sql,
    });
  }
}
