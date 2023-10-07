import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { ResultSetHeader } from 'mysql2';

interface IRequest extends Request {
  body: {
    reply: string;
  };
}

export default async function commentsReplyRegister(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const NAMESPACE = 'COMMENTS_REPLY_REGISTER';
  logging.debug(NAMESPACE, '[START]');

  if (req.user === undefined)
    return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });

  const { comment_id } = req.params;
  const { reply } = req.body;
  const { id } = req.user;

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const COMMENT_REPLY_REGISTER_SQL =
        'INSERT INTO public_comments_reply (reply, users_books_comments_id, users_id) VALUE(?, ?, ?)';
      const COMMENT_REPLY_REGISTER_VALUE = [reply, comment_id, id];
      const [COMMENT_REPLY_REGISTER_RESULT] = await connection.query<ResultSetHeader>(
        COMMENT_REPLY_REGISTER_SQL,
        COMMENT_REPLY_REGISTER_VALUE
      );

      logging.debug(NAMESPACE, '[COMMENT_REPLY_REGISTER_RESULT]', COMMENT_REPLY_REGISTER_RESULT);
      connection.release();
      res.status(200).json({ status: 'success', message: '댓글 등록에 성공하셨습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '댓글 등록에 실패하셨습니다.',
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
