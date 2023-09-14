import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';
import dayjs from 'dayjs';

interface IRequest<T> extends Request {
  body: T;
}

interface IComment {
  comment: string;
  rating: number;
}

export default async function myBookCommentUpdate(
  req: IRequest<IComment>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'MY_BOOK_COMMENTS_UPDATE';
  logging.debug(NAMESPACE, '[START]');

  const { comment, rating } = req.body;
  const { comment_id } = req.params;
  logging.debug(NAMESPACE, '[REQ.BODY]', req.body);
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const UPDATE_COMMENT_SQL =
        'UPDATE users_books_comments SET comment = ?, rating = ?, updated_at = ? WHERE id = ?';
      const UPDATE_COMMENT_VALUE = [comment, rating, new Date(), comment_id];
      const [UPDATE_COMMENT_RESULT] = await connection.query<ResultSetHeader>(
        UPDATE_COMMENT_SQL,
        UPDATE_COMMENT_VALUE
      );
      logging.debug(NAMESPACE, '[UPDATE_COMMENT_RESULT]', UPDATE_COMMENT_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: `수정에 성공했습니다.` });
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
