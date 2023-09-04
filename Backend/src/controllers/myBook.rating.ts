import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';

interface IRequest<T> extends Request {
  body: T;
}

interface IRequestBody {
  status: '읽는중' | '다읽음' | '읽기전';
  rating: string;
  users_books_id: string;
}

export default async function myBookRating(
  req: IRequest<IRequestBody>,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'MY_BOOK_RATING';
  logging.info(NAMESPACE, '[START]');

  const { status, rating, users_books_id } = req.body;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const MY_BOOK_RATING_SQL =
        'INSERT INTO users_books_info (status, rating, users_books_id) VALUES (?, ?, ?)';
      const MY_BOOK_RATING_VALUE = [status, parseInt(rating), parseInt(users_books_id)];
      const [MY_BOOK_RATING_RESULT] = await connection.query<ResultSetHeader>(
        MY_BOOK_RATING_SQL,
        MY_BOOK_RATING_VALUE
      );
      logging.debug(NAMESPACE, '[MY_BOOK_RATING_RESULT]', MY_BOOK_RATING_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({
        status: 'success',
        message: '평점 등록에 성공하셨습니다.',
      });
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
