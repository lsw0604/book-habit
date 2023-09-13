import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookCommentsListType } from '../types';

export default async function myBookCommentsList(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'MY_BOOK_COMMENTS_LIST';
  logging.info(NAMESPACE, '[START]');
  const { users_books_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const MY_BOOK_COMMENTS_LIST_SQL =
        'SELECT id as comment_id, comment, created_at, rating, status, updated_at FROM users_books_comments WHERE users_books_id = ? ';
      const MY_BOOK_COMMENTS_LIST_VALUE = [users_books_id];
      const [MY_BOOK_COMMENTS_LIST_RESULT] = await connection.query<MyBookCommentsListType[]>(
        MY_BOOK_COMMENTS_LIST_SQL,
        MY_BOOK_COMMENTS_LIST_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_COMMENTS_LIST_RESULT]', MY_BOOK_COMMENTS_LIST_RESULT);

      connection.release();
      res.status(200).json({
        comments: MY_BOOK_COMMENTS_LIST_RESULT,
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
