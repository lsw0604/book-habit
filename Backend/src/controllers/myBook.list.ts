import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { MyBookListResponseType, MyBookListCountResponseType } from '../types';

const NAMESPACE = 'BOOKS_MY_BOOK';

export default async function myBookList(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined) return res.status(403);
  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const page = parseInt(req.query.page as string) || 1;
      const startPage = (page - 1) * 10;
      const status = decodeURI(req.query.status as string);

      if (status === '전체보기') {
        const COUNT_TOTAL_SQL =
          'WITH LatestStatus AS ( ' +
          'SELECT ubh.users_books_id AS users_books_id, ubh.status, ubh.date, ROW_NUMBER() OVER (PARTITION BY ubh.users_books_id ORDER BY ubh.date DESC) AS rn ' +
          'FROM users_books_history ubh ' +
          ') ' +
          'SELECT COUNT(*) AS count ' +
          'FROM users_books ub ' +
          'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
          'LEFT JOIN LatestStatus ls ON ub.id = ls.users_books_id AND ls.rn = 1 ' +
          'WHERE ub.users_id = ?';
        const COUNT_TOTAL_VALUES = [id];
        const [COUNT_TOTAL_RESULT] = await connection.query<MyBookListCountResponseType[]>(
          COUNT_TOTAL_SQL,
          COUNT_TOTAL_VALUES
        );
        logging.debug(NAMESPACE, '[COUNT_TOTAL_RESULT]', COUNT_TOTAL_RESULT[0].count);

        if (COUNT_TOTAL_RESULT.length === 0)
          return res.status(200).json({ nextPage: undefined, books: [] });

        const totalBookCount = COUNT_TOTAL_RESULT[0].count;
        const totalPage = Math.ceil(totalBookCount / 10);

        const TOTAL_LIST_SQL =
          'WITH LatestStatus AS ( ' +
          'SELECT ubh.users_books_id AS users_books_id, ubh.status, ubh.date, ROW_NUMBER() OVER (PARTITION BY ubh.users_books_id ORDER BY ubh.date DESC) AS rn ' +
          'FROM users_books_history ubh ' +
          ') ' +
          'SELECT ls.users_books_id AS id, bs.title, bs.image, bs.isbn, ls.date, ls.status ' +
          'FROM users_books ub ' +
          'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
          'LEFT JOIN LatestStatus ls ON ub.id = ls.users_books_id AND ls.rn = 1 ' +
          'WHERE ub.users_id = ? ' +
          'LIMIT 10 OFFSET ?';
        const TOTAL_LIST_VALUES = [id, startPage];
        const [TOTAL_LIST_RESULT] = await connection.query<MyBookListResponseType[]>(
          TOTAL_LIST_SQL,
          TOTAL_LIST_VALUES
        );

        logging.debug(NAMESPACE, '[TOTAL_LIST_RESULT]', TOTAL_LIST_RESULT);

        connection.release();
        return res.status(200).json({
          nextPage:
            parseInt(req.query.page as string) >= totalPage
              ? undefined
              : parseInt(req.query.page as string) + 1,
          books: TOTAL_LIST_RESULT,
        });
      }
      const COUNT_STATUS_SQL =
        'SELECT COUNT(*) as count ' +
        'FROM users_books ub ' +
        'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
        'RIGHT JOIN users_books_history ubh ON ubh.users_books_id = ub.id ' +
        'INNER JOIN ( ' +
        'SELECT MAX(date) AS max_date ' +
        'FROM users_books_history ubh ' +
        'GROUP BY users_books_id ' +
        ') latest_date ON ubh.date = latest_date.max_date ' +
        'WHERE ub.users_id = ? AND status = ?';
      const COUNT_STATUS_VALUES = [id, status];
      const [COUNT_STATUS_RESULT] = await connection.query<MyBookListCountResponseType[]>(
        COUNT_STATUS_SQL,
        COUNT_STATUS_VALUES
      );
      logging.debug(NAMESPACE, '[COUNT_STATUS_RESULT]', COUNT_STATUS_RESULT[0].count);

      if (COUNT_STATUS_RESULT.length === 0)
        return res.status(200).json({ nextPage: undefined, books: [] });

      const totalBookCount = COUNT_STATUS_RESULT[0].count;
      const totalPage = Math.ceil(totalBookCount / 10);

      const STATUS_LIST_SQL =
        'WITH LatestStatus AS ( ' +
        'SELECT ubh.users_books_id AS users_books_id, ubh.status, ubh.date, ROW_NUMBER() OVER (PARTITION BY ubh.users_books_id ORDER BY ubh.date DESC) AS rn ' +
        'FROM users_books_history ubh ' +
        ') ' +
        'SELECT ls.users_books_id AS id, bs.title, bs.image, bs.isbn, ls.date, ls.status ' +
        'FROM users_books ub ' +
        'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
        'LEFT JOIN LatestStatus ls ON ub.id = ls.users_books_id AND ls.rn = 1 ' +
        'WHERE ub.users_id = ? AND status = ? ' +
        'LIMIT 10 OFFSET ?';
      const STATUS_LIST_VALUES = [id, status, startPage];
      const [STATUS_LIST_RESULT] = await connection.query<MyBookListResponseType[]>(
        STATUS_LIST_SQL,
        STATUS_LIST_VALUES
      );
      logging.debug(NAMESPACE, '[STATUS_LIST_RESULT]', STATUS_LIST_RESULT);

      connection.release();
      return res.status(200).json({
        nextPage:
          parseInt(req.query.page as string) >= totalPage
            ? undefined
            : parseInt(req.query.page as string) + 1,
        books: STATUS_LIST_RESULT,
      });
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
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
