import { Response, Request, NextFunction } from 'express';
import dayjs from 'dayjs';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { CommentListType } from '../types';

const NAMESPACE = 'COMMENT_LIST';

export default async function commentList(_: Request, res: Response, __: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  try {
    const connection = await connectionPool.getConnection();
    try {
      const currentDate = dayjs();
      const firstDateCurrentMonth = currentDate.startOf('month');
      const lastDateCurrentMonth = currentDate.endOf('month');

      const COMMENT_LIST_SQL =
        'SELECT ubc.id AS comment_id, ubc.comment, ubc.created_at, ubc.rating, bs.title, us.name, us.profile, ubc.status ' +
        'FROM users_books_comments AS ubc ' +
        'LEFT JOIN books AS bs ON bs.id = ubc.books_id ' +
        'LEFT JOIN users_books AS ub ON ub.id = ubc.users_books_id ' +
        'LEFT JOIN users AS us ON us.id = ub.users_id ' +
        'WHERE comment_is_open = true AND ubc.created_at BETWEEN ? AND ? ' +
        'ORDER BY created_at DESC';
      const COMMENT_LIST_VALUE = [
        firstDateCurrentMonth.format('YYYY-MM-DD'),
        lastDateCurrentMonth.add(1, 'day').format('YYYY-MM-DD'),
      ];
      const [COMMENT_LIST_RESULT] = await connection.query<CommentListType[]>(
        COMMENT_LIST_SQL,
        COMMENT_LIST_VALUE
      );

      logging.debug(NAMESPACE, '[COMMENT_LIST_RESULT]', COMMENT_LIST_RESULT);

      connection.release();
      res.status(200).json({
        comments: COMMENT_LIST_RESULT,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '한줄평을 불러오는데 실패했습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, '[DB CONNECTION]', error);
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
