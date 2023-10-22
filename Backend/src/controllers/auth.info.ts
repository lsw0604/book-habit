import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface IRegisteredCommentsCount extends RowDataPacket {
  comments_count: number;
}

interface IRegisteredBooksCount extends RowDataPacket {
  books_count: number;
}

interface IRegisteredLikesCount extends RowDataPacket {
  likes_count: number;
}

export default async function authInfo(req: Request, res: Response, _: NextFunction) {
  const NAMESPACE = 'AUTH_INFO';
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const REGISTERED_COMMENTS_COUNT_SQL =
        'SELECT COUNT(*) AS comments_count ' +
        'FROM users_books_comments AS ubc ' +
        'LEFT JOIN users_books AS ub ON ub.id = ubc.users_books_id ' +
        'WHERE users_id = ?';
      const REGISTERED_COMMENTS_COUNT_VALUE = [id];
      const [REGISTERED_COMMENTS_COUNT_RESULT] = await connection.query<IRegisteredCommentsCount[]>(
        REGISTERED_COMMENTS_COUNT_SQL,
        REGISTERED_COMMENTS_COUNT_VALUE
      );
      logging.debug(
        NAMESPACE,
        '[REGISTERED_COMMENTS_COUNT_RESULT]',
        REGISTERED_COMMENTS_COUNT_RESULT
      );

      const REGISTERED_BOOKS_COUNT_SQL =
        'SELECT COUNT(*) AS books_count FROM users_books AS ub WHERE users_id = ?';
      const REGISTERED_BOOKS_COUNT_VALUE = [id];
      const [REGISTERED_BOOKS_COUNT_RESULT] = await connection.query<IRegisteredBooksCount[]>(
        REGISTERED_BOOKS_COUNT_SQL,
        REGISTERED_BOOKS_COUNT_VALUE
      );
      logging.debug(NAMESPACE, '[REGISTERED_BOOKS_COUNT_RESULT]', REGISTERED_BOOKS_COUNT_RESULT);

      const REGISTERED_LIKES_COUNT_SQL =
        'SELECT COUNT(*) AS likes_count FROM comments_likes WHERE users_id = ?';
      const REGISTERED_LIKES_COUNT_VALUE = [id];
      const [REGISTERED_LIKES_COUNT_RESULT] = await connection.query<IRegisteredLikesCount[]>(
        REGISTERED_LIKES_COUNT_SQL,
        REGISTERED_LIKES_COUNT_VALUE
      );
      logging.debug(NAMESPACE, '[REGISTERED_LIKES_COUNT_RESULT]', REGISTERED_LIKES_COUNT_RESULT);

      res.status(200).json({
        comments_count: REGISTERED_COMMENTS_COUNT_RESULT[0].comments_count,
        books_count: REGISTERED_BOOKS_COUNT_RESULT[0].books_count,
        likes_count: REGISTERED_LIKES_COUNT_RESULT[0].likes_count,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '유저 정보를 불러오는데 실패했습니다.',
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
