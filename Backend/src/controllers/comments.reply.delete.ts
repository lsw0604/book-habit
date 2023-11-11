import { Request, Response, NextFunction } from 'express';
import { ResultSetHeader } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';

const NAMESPACE = 'COMMENTS_REPLY_DELETE';

export default async function commentsReplyDelete(req: Request, res: Response, _: NextFunction) {
  logging.debug(NAMESPACE, '[START]');

  if (req.user === undefined) {
    logging.error(NAMESPACE, '[로그인이 필요합니다.]');
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });
  }

  const { reply_id } = req.params;
  const { id } = req.user;

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const COMMENTS_REPLY_DELETE_SQL =
        'DELETE FROM public_comments_reply WHERE users_id = ? AND id = ?';
      const COMMENTS_REPLY_DELETE_VALUE = [id, reply_id];
      const COMMENTS_REPLY_DELETE_RESULT = await connection.query<ResultSetHeader>(
        COMMENTS_REPLY_DELETE_SQL,
        COMMENTS_REPLY_DELETE_VALUE
      );
      logging.debug(NAMESPACE, '[COMMENTS_REPLY_DELETE_RESULT]', COMMENTS_REPLY_DELETE_RESULT);

      await connection.commit();
      connection.release();
      res.status(200).json({ status: 'success', message: '댓글 삭제에 성공하셨습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '댓글 삭제에 실패하셨습니다.',
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
