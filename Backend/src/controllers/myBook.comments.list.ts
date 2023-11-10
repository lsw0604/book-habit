import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface IMyBookCommentList extends RowDataPacket {
  comment_id: number;
  comment: string;
  rating: number;
  status: '읽기전' | '다읽음' | '읽는중';
  comment_is_open: boolean;
  created_at: Date;
  updated_at: Date | null;
}

const NAMESPACE = 'MY_BOOK_COMMENTS_LIST';

export default async function myBookCommentsList(req: Request, res: Response, _: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  const { users_books_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const MY_BOOK_COMMENTS_LIST_SQL =
        'SELECT id as comment_id, comment, created_at, rating, status, updated_at, comment_is_open FROM users_books_comments WHERE users_books_id = ? ';
      const MY_BOOK_COMMENTS_LIST_VALUE = [users_books_id];
      const [MY_BOOK_COMMENTS_LIST_RESULT] = await connection.query<IMyBookCommentList[]>(
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
