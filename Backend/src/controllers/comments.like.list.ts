import { Response, Request, NextFunction } from 'express';
import logging from '@config/logging';
import { connectionPool } from '@config/database';
import { RowDataPacket } from 'mysql2';

interface ICommentLikeList extends RowDataPacket {
  users_id: number;
}

const NAMESPACE = 'COMMENT_LIKE_LIST';

export default async function commentsLikeList(req: Request, res: Response, _: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  const { comment_id } = req.params;
  try {
    const connection = await connectionPool.getConnection();
    try {
      const COMMENT_LIKE_LIST_SQL =
        'SELECT users_id FROM comments_likes WHERE users_books_comments_id = ?';
      const COMMENT_LIKE_LIST_VALUE = [comment_id];
      const [COMMENT_LIKE_LIST_RESULT] = await connection.query<ICommentLikeList[]>(
        COMMENT_LIKE_LIST_SQL,
        COMMENT_LIKE_LIST_VALUE
      );
      logging.debug(NAMESPACE, '[COMMENT_LIKE_LIST_RESULT]', COMMENT_LIKE_LIST_RESULT);
      connection.release();
      res.status(200).json({
        comment_likes: COMMENT_LIKE_LIST_RESULT,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '좋아요를 누른 유저 목록을 불러오는데 실패했습니다.',
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
