import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface IAuthLikeList extends RowDataPacket {
  like_id: number;
  comment_status: '읽는중' | '다읽음' | '읽기전';
  comment_id: number;
  title: string;
  profile: string;
  name: string;
}

interface IAuthLikeListCount extends RowDataPacket {
  count: number;
}

export default async function authLikeList(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'AUTH_LIKE_LIST';
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;

  try {
    const connection = await connectionPool.getConnection();
    try {
      const page = parseInt(req.query.page as string) || 1;
      const startPage = (page - 1) * 5;

      const AUTH_LIKE_LIST_COUNT_SQL =
        'SELECT COUNT(*) AS count ' +
        'FROM comments_likes AS cl ' +
        'RIGHT JOIN users_books_comments AS ubc ON cl.users_books_comments_id = ubc.id ' +
        'RIGHT JOIN books AS bs ON ubc.books_id = bs.id ' +
        'RIGHT JOIN users_books AS ub ON ubc.users_books_id = ub.id ' +
        'RIGHT JOIN users AS us ON ub.users_id = us.id ' +
        'WHERE cl.users_id = ?';
      const AUTH_LIKE_LIST_COUNT_VALUE = [id];
      const [AUTH_LIKE_LIST_COUNT_RESULT] = await connection.query<IAuthLikeListCount[]>(
        AUTH_LIKE_LIST_COUNT_SQL,
        AUTH_LIKE_LIST_COUNT_VALUE
      );
      logging.debug(NAMESPACE, '[AUTH_LIKE_LIST_COUNT_RESULT]', AUTH_LIKE_LIST_COUNT_RESULT);

      if (AUTH_LIKE_LIST_COUNT_RESULT[0].count === 0)
        return res.status(200).json({ nextPage: undefined, totalPage: undefined, like_list: [] });

      const totalCount = AUTH_LIKE_LIST_COUNT_RESULT[0].count;
      const totalPage = Math.ceil(totalCount / 5);

      const AUTH_LIKE_LIST_SQL =
        'SELECT cl.id AS like_id, ubc.status,ubc.id AS comment_id, bs.title, us.profile, us.name ' +
        'FROM comments_likes AS cl ' +
        'RIGHT JOIN users_books_comments AS ubc ON cl.users_books_comments_id = ubc.id ' +
        'RIGHT JOIN books AS bs ON ubc.books_id = bs.id ' +
        'RIGHT JOIN users_books AS ub ON ubc.users_books_id = ub.id ' +
        'RIGHT JOIN users AS us ON ub.users_id = us.id ' +
        'WHERE cl.users_id = ? ' +
        'LIMIT 5 OFFSET ?';
      const AUTH_LIKE_LIST_VALUE = [id, startPage];
      const [AUTH_LIKE_LIST_RESULT] = await connection.query<IAuthLikeList[]>(
        AUTH_LIKE_LIST_SQL,
        AUTH_LIKE_LIST_VALUE
      );
      logging.debug(NAMESPACE, '[AUTH_LIKE_LIST_RESULT]', AUTH_LIKE_LIST_RESULT);

      connection.release();
      res.status(200).json({
        nextPage: page >= totalPage ? undefined : page + 1,
        prevPage: page <= 0 ? undefined : page - 1,
        like_list: AUTH_LIKE_LIST_RESULT,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '좋아요 목록을 불러오는데 실패했습니다.',
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
