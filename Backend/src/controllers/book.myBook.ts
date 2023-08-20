import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface IProps extends RowDataPacket {
  total: number;
  book_id: number;
  title: string;
  isbn: string;
  author: string;
  company: string;
  image: string;
  users_books_id: number;
  status: string;
  start_date: Date;
  end_date: Date;
  rating: number;
  page: number;
  created_at: Date;
}

const NAMESPACE = 'BOOKS_MY_BOOK';

export default async function myBook(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined) return res.status(403);
  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const page = parseInt(req.query.page as string) || 1;
      const startPage = (page - 1) * 10;

      await connection.beginTransaction();

      const SQL =
        'SELECT	bs.id AS book_id, bs.title, bs.isbn, bs.author, bs.company, bs.image, ub.id AS users_books_id, ds.status, ds.start_date, ds.end_date, ds.rating, ds.page, ds.created_at, COUNT(*) OVER() AS total ' +
        'FROM users_books ub ' +
        'LEFT JOIN books bs ON ub.books_id = bs.id ' +
        'RIGHT JOIN diary_status ds ON ub.id = ds.users_books_id ' +
        'WHERE ub.users_id = ? ' +
        'LIMIT 10 OFFSET ? ' +
        'ORDER BY ds.created_at ASC';
      const VALUES = [id, startPage];
      const [RESULT] = await connection.query<IProps[]>(SQL, VALUES);

      const totalBookCount = RESULT[0].total;
      const totalPage = Math.ceil(totalBookCount / 10);
      res
        .status(200)
        .json({ nextPage: page >= totalPage ? undefined : page + 1, result: [...RESULT] });
      connection.release();
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
