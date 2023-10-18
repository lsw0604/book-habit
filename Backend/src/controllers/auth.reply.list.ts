import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface IAuthReplyList extends RowDataPacket {
  like_id: number;
  status: '읽는중' | '다읽음' | '읽기전';
  comment_id: number;
  title: string;
  profile: string;
  name: string;
}

interface IAuthReplyListCount extends RowDataPacket {
  count: number;
}

export default async function authReplyList(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'AUTH_Reply_LIST';
  logging.info(NAMESPACE, '[START]');
  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  const { id } = req.user;

  try {
    const connection = await connectionPool.getConnection();
    try {
      const page = parseInt(req.query.page as string) || 1;
      const startPage = (page - 1) * 5;

      const AUTH_REPLY_LIST_COUNT_SQL =
        'SELECT COUNT(*) AS count ' +
        'FROM public_comments_reply AS pcr ' +
        'LEFT JOIN users_books_comments AS ubc ON ubc.id = pcr.users_books_comments_id ' +
        'LEFT JOIN users_books AS ub ON ub.id = ubc.users_books_id ' +
        'LEFT JOIN books AS bs ON bs.id = ub.books_id ' +
        'LEFT JOIN users AS us ON us.id = ub.users_id ' +
        'WHERE pcr.users_id = ?';
      const AUTH_REPLY_LIST_COUNT_VALUE = [id];
      const [AUTH_REPLY_LIST_COUNT_RESULT] = await connection.query<IAuthReplyListCount[]>(
        AUTH_REPLY_LIST_COUNT_SQL,
        AUTH_REPLY_LIST_COUNT_VALUE
      );
      logging.debug(NAMESPACE, '[AUTH_REPLY_LIST_COUNT_RESULT]', AUTH_REPLY_LIST_COUNT_RESULT);

      if (AUTH_REPLY_LIST_COUNT_RESULT[0].count === 0)
        return res.status(200).json({
          page: 0,
          totalPage: 0,
          totalItem: 0,
          nextPage: undefined,
          prevPage: undefined,
          items: [],
        });

      const totalItem = AUTH_REPLY_LIST_COUNT_RESULT[0].count;
      const totalPage = Math.ceil(totalItem / 5);

      const AUTH_REPLY_LIST_SQL =
        'SELECT pcr.id AS reply_id, pcr.users_books_comments_id AS comment_id, ubc.status, title, us.profile, us.name ' +
        'FROM public_comments_reply AS pcr ' +
        'LEFT JOIN users_books_comments AS ubc ON ubc.id = pcr.users_books_comments_id ' +
        'LEFT JOIN users_books AS ub ON ub.id = ubc.users_books_id ' +
        'LEFT JOIN books AS bs ON bs.id = ub.books_id ' +
        'LEFT JOIN users AS us ON us.id = ub.users_id ' +
        'WHERE pcr.users_id = ? ' +
        'LIMIT 5 OFFSET ?';
      const AUTH_REPLY_LIST_VALUE = [id, startPage];
      const [AUTH_REPLY_LIST_RESULT] = await connection.query<IAuthReplyList[]>(
        AUTH_REPLY_LIST_SQL,
        AUTH_REPLY_LIST_VALUE
      );
      logging.debug(NAMESPACE, '[AUTH_REPLY_LIST_RESULT]', AUTH_REPLY_LIST_RESULT);

      connection.release();
      res.status(200).json({
        page,
        totalPage,
        totalItem,
        nextPage: page >= totalPage ? undefined : page + 1,
        prevPage: page <= 0 ? undefined : page - 1,
        items: AUTH_REPLY_LIST_RESULT,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '댓글 목록을 불러오는데 실패했습니다.',
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
