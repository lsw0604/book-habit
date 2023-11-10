import { Response, Request, NextFunction } from 'express';
import { RowDataPacket } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { StatusType } from '../types';

interface IMyBookListCount extends RowDataPacket {
  count: number;
}

interface IMyBookList extends RowDataPacket {
  id: number;
  isbn: string;
  title: string;
  thumbnail?: string;
  status: '다읽음' | '읽는중' | '읽고싶음';
  created_at: Date;
}

const NAMESPACE = 'BOOKS_MY_BOOK';

export default async function myBookList(req: Request, res: Response, _: NextFunction) {
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
          'SELECT ubh.users_books_id AS users_books_id, COALESCE(ubh.status, ?) AS status, ubh.date, ' +
          'ROW_NUMBER() OVER ( ' +
          'PARTITION BY ubh.users_books_id ' +
          'ORDER BY ' +
          'ubh.date DESC, ' +
          'CASE ' +
          'WHEN ubh.status = ? THEN 1 ' +
          'WHEN ubh.status = ? THEN 2 ' +
          'WHEN ubh.status = ? THEN 3 ' +
          'ELSE 4 ' +
          'END' +
          ') AS rn ' +
          'FROM users_books_history ubh ' +
          ') ' +
          'SELECT COUNT(*) AS count ' +
          'FROM users_books ub ' +
          'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
          'LEFT JOIN LatestStatus ls ON ub.id = ls.users_books_id AND ls.rn = 1 ' +
          'WHERE ub.users_id = ?';

        const COUNT_TOTAL_VALUES = ['없음', '다읽음', '읽는중', '읽기시작함', id];
        const [COUNT_TOTAL_RESULT] = await connection.query<IMyBookListCount[]>(
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
          'SELECT ubh.users_books_id AS users_books_id, COALESCE(ubh.status, ?) AS status, ubh.date, ' +
          'ROW_NUMBER() OVER ( ' +
          'PARTITION BY ubh.users_books_id ' +
          'ORDER BY ' +
          'ubh.date DESC, ' +
          'CASE ' +
          'WHEN ubh.status = ? THEN 1 ' +
          'WHEN ubh.status = ? THEN 2 ' +
          'WHEN ubh.status = ? THEN 3 ' +
          'ELSE 4 ' +
          'END' +
          ') AS rn ' +
          'FROM users_books_history ubh ' +
          ') ' +
          'SELECT ub.id AS id, bs.title, bs.thumbnail, bs.isbn, ls.date, ls.status ' +
          'FROM users_books ub ' +
          'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
          'LEFT JOIN LatestStatus ls ON ub.id = ls.users_books_id AND ls.rn = 1 ' +
          'WHERE ub.users_id = ? ' +
          'LIMIT 10 OFFSET ?';
        const TOTAL_LIST_VALUES = ['없음', '다읽음', '읽는중', '읽기시작함', id, startPage];
        const [TOTAL_LIST_RESULT] = await connection.query<IMyBookList[]>(
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
        'WITH LatestStatus AS ( ' +
        'SELECT ubh.users_books_id AS users_books_id, COALESCE(ubh.status, ?) AS status, ubh.date, ' +
        'ROW_NUMBER() OVER ( ' +
        'PARTITION BY ubh.users_books_id ' +
        'ORDER BY ' +
        'ubh.date DESC, ' +
        'CASE ' +
        'WHEN ubh.status = ? THEN 1 ' +
        'WHEN ubh.status = ? THEN 2 ' +
        'WHEN ubh.status = ? THEN 3 ' +
        'ELSE 4 ' +
        'END' +
        ') AS rn ' +
        'FROM users_books_history ubh ' +
        ') ' +
        'SELECT COUNT(*) AS count ' +
        'FROM users_books ub ' +
        'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
        'LEFT JOIN LatestStatus ls ON ub.id = ls.users_books_id AND ls.rn = 1 ' +
        'WHERE ub.users_id = ? AND ls.status = ?';
      const COUNT_STATUS_VALUES = ['없음', '다읽음', '읽는중', '읽기시작함', id, status];
      const [COUNT_STATUS_RESULT] = await connection.query<IMyBookListCount[]>(
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
        'SELECT ubh.users_books_id AS users_books_id, COALESCE(ubh.status, ?) AS status, ubh.date, ' +
        'ROW_NUMBER() OVER ( ' +
        'PARTITION BY ubh.users_books_id ' +
        'ORDER BY ' +
        'ubh.date DESC, ' +
        'CASE ' +
        'WHEN ubh.status = ? THEN 1 ' +
        'WHEN ubh.status = ? THEN 2 ' +
        'WHEN ubh.status = ? THEN 3 ' +
        'ELSE 4 ' +
        'END' +
        ') AS rn ' +
        'FROM users_books_history ubh ' +
        ') ' +
        'SELECT ub.id AS id, bs.title, bs.thumbnail, bs.isbn, ls.date, ls.status ' +
        'FROM users_books ub ' +
        'RIGHT JOIN books bs ON ub.books_id = bs.id ' +
        'LEFT JOIN LatestStatus ls ON ub.id = ls.users_books_id AND ls.rn = 1 ' +
        'WHERE ub.users_id = ? AND ls.status = ?' +
        'LIMIT 10 OFFSET ?';
      const STATUS_LIST_VALUES = ['없음', '다읽음', '읽는중', '읽기시작함', id, status, startPage];
      const [STATUS_LIST_RESULT] = await connection.query<IMyBookList[]>(
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
