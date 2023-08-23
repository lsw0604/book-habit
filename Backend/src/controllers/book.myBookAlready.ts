import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

const NAMESPACE = 'BOOKS_ALREADY';

interface IProps extends RowDataPacket {
  status: '다읽음' | '읽는중' | '읽고싶음';
  start_date: Date | null;
  end_date: Date | null;
  page: number | null;
  rating: number | null;
}

export default async function myBookAlready(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined) return res.status(403);
  const { id } = req.user;
  const { isbn } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL =
        'SELECT status, start_date, end_date, page, rating ' +
        'FROM diary_status ds ' +
        'LEFT JOIN users_books ub ON ds.users_books_id = ub.id ' +
        'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
        'WHERE ? = 20 AND isbn = ? ' +
        'ORDER BY created_at DESC ' +
        'LIMIT 1';
      const VALUE = [id, isbn];
      const [RESULT] = await connection.query<IProps[]>(SQL, VALUE);
      if (RESULT[0] === undefined) {
        connection.release();
        return res.status(200).json({ message: '아직 서재에 등록되지않은 소중한 책이에요.' });
      }
      const { end_date, page, rating, start_date, status } = RESULT[0];
      connection.release();
      return res.status(200).json({ status, end_date, page, start_date, rating });
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
      connection.release();
      res.status(403).json({
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
