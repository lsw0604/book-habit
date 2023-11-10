import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface ICommentsReplyList extends RowDataPacket {
  reply_id: number;
  reply: string;
  created_at: Date;
  users_id: number;
  name: string;
  profile: string;
}

const NAMESPACE = 'COMMENTS_REPLY_LIST';

export default async function commentsReplyList(req: Request, res: Response, _: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  try {
    const connection = await connectionPool.getConnection();
    try {
      const { comment_id } = req.params;
      const COMMENTS_REPLY_LIST_SQL =
        'SELECT pcr.id AS reply_id, reply, created_at, pcr.users_id, users.name, users.profile ' +
        'FROM public_comments_reply AS pcr ' +
        'LEFT JOIN users ON pcr.users_id = users.id ' +
        'WHERE pcr.users_books_comments_id = ?';
      const COMMENTS_REPLY_LIST_VALUE = [comment_id];
      const [COMMENTS_REPLY_LIST_RESULT] = await connection.query<ICommentsReplyList[]>(
        COMMENTS_REPLY_LIST_SQL,
        COMMENTS_REPLY_LIST_VALUE
      );

      logging.debug(NAMESPACE, '[COMMENTS_REPLY_LIST_RESULT]', COMMENTS_REPLY_LIST_RESULT);

      connection.release();
      res.status(200).json({
        reply: COMMENTS_REPLY_LIST_RESULT,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: 'reply를 불러오는데 실패했습니다.',
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
