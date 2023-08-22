import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { IMyBooksCountResponse, IMyBooksResponse } from '../types';

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
      const status = decodeURI(req.query.status as string);

      await connection.beginTransaction();

      if (status === '전체보기') {
        const COUNT_SQL = 'SELECT DISTINCT books_id FROM users_books WHERE users_id = ?';
        const COUNT_VALUES = [id];
        const [COUNT_RESULT] = await connection.query<IMyBooksCountResponse[]>(
          COUNT_SQL,
          COUNT_VALUES
        );

        if (COUNT_RESULT.length === 0)
          return res.status(200).json({ nextPage: undefined, books: [] });

        logging.debug(NAMESPACE, '[COUNT]', COUNT_RESULT.length);

        const totalBookCount = COUNT_RESULT.length;
        const totalPage = Math.ceil(totalBookCount / 10);

        const SQL =
          'WITH CreatedAtTable AS ( ' +
          'SELECT bs.id AS books_id, bs.isbn, bs.image, ds.status, ds.start_date, ds.end_date, ds.rating, ds.page, ds.created_at, ROW_NUMBER() OVER (PARTITION BY ub.books_id ORDER BY ds.created_at DESC) AS rn ' +
          'FROM users_books ub ' +
          'LEFT JOIN books bs ON ub.books_id = bs.id ' +
          'RIGHT JOIN diary_status ds ON ub.id = ds.users_books_id ' +
          'WHERE ub.users_id = ? ' +
          ') ' +
          'SELECT books_id, isbn, image, status, start_date, end_date, rating, page, created_at ' +
          'FROM CreatedAtTable ' +
          'WHERE rn = 1 ' +
          'LIMIT 10 OFFSET ?';

        const VALUES = [id, startPage];
        const [RESULT] = await connection.query<IMyBooksResponse[]>(SQL, VALUES);

        logging.debug(NAMESPACE, '[RESULT]', RESULT);

        connection.release();
        return res.status(200).json({
          nextPage:
            parseInt(req.query.page as string) >= totalPage
              ? undefined
              : parseInt(req.query.page as string) + 1,
          books: RESULT,
        });
      }
      const COUNT_SQL =
        'WITH CreatedAtTableStatus AS ( ' +
        'SELECT bs.id AS books_id, bs.isbn, bs.image, ds.status, ds.start_date, ds.end_date, ds.rating, ds.page, ds.created_at, ROW_NUMBER() OVER (PARTITION BY ub.books_id ORDER BY ds.created_at DESC) AS rn ' +
        'FROM users_books ub ' +
        'LEFT JOIN books bs ON ub.books_id = bs.id ' +
        'RIGHT JOIN diary_status ds ON ub.id = ds.users_books_id ' +
        'WHERE ub.users_id = ? ' +
        ') ' +
        'SELECT books_id, isbn, image, status, start_date, end_date, rating, page, created_at ' +
        'FROM CreatedAtTableStatus ' +
        'WHERE rn = 1 AND status = ?';
      const COUNT_VALUES = [id, status];
      const [COUNT_RESULT] = await connection.query<IMyBooksResponse[]>(COUNT_SQL, COUNT_VALUES);

      const totalBookCount = COUNT_RESULT.length;
      const totalPage = Math.ceil(totalBookCount / 10);

      const SQL =
        'WITH CreatedAtTableStatus AS ( ' +
        'SELECT bs.id AS books_id, bs.isbn, bs.image, ds.status, ds.start_date, ds.end_date, ds.rating, ds.page, ds.created_at, ROW_NUMBER() OVER (PARTITION BY ub.books_id ORDER BY ds.created_at DESC) AS rn ' +
        'FROM users_books ub ' +
        'LEFT JOIN books bs ON ub.books_id = bs.id ' +
        'RIGHT JOIN diary_status ds ON ub.id = ds.users_books_id ' +
        'WHERE ub.users_id = ? ' +
        ') ' +
        'SELECT books_id, isbn, image, status, start_date, end_date, rating, page, created_at ' +
        'FROM CreatedAtTableStatus ' +
        'WHERE rn = 1 AND status = ? ' +
        'LIMIT 10 OFFSET ?';
      const VALUES = [id, status, startPage];
      const [RESULT] = await connection.query<IMyBooksResponse[]>(SQL, VALUES);

      connection.release();
      return res.status(200).json({
        nextPage:
          parseInt(req.query.page as string) >= totalPage
            ? undefined
            : parseInt(req.query.page as string) + 1,
        books: RESULT,
      });
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
