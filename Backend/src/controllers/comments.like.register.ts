import { Response, Request, NextFunction } from 'express';
import { ResultSetHeader } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';

const NAMESPACE = 'COMMENT_LIKE_REGISTER';

export default async function commentLikeRegister(req: Request, res: Response, _: NextFunction) {
  logging.debug(NAMESPACE, '[START]');

  if (req.user === undefined) {
    logging.error(NAMESPACE, '[로그인이 필요합니다.]');
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  }

  const { id } = req.user;
  const { comment_id } = req.params;

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const COMMENT_LIKE_REGISTER_SQL =
        'INSERT INTO comments_likes (users_id, users_books_comments_id) VALUES(?, ?)';
      const COMMENT_LIKE_REGISTER_VALUE = [id, parseInt(comment_id)];
      const [COMMENT_LIKE_REGISTER_RESULT] = await connection.query<ResultSetHeader>(
        COMMENT_LIKE_REGISTER_SQL,
        COMMENT_LIKE_REGISTER_VALUE
      );

      logging.debug(NAMESPACE, '[COMMENT_LIKE_REGISTER_RESULT]', COMMENT_LIKE_REGISTER_RESULT);

      await connection.commit();
      connection.release();

      res
        .status(200)
        .json({ status: 'success', message: `좋아요 등록에 성공하셨습니다.`, user_id: id });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '좋아요 등록에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, '[ERROR]', error);
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
