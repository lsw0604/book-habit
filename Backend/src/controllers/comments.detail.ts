import { Response, Request, NextFunction } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface ICommentDetail extends RowDataPacket {
  comment_id: number;
  comment: string;
  created_at: Date;
  rating: number;
  title: string;
  name: string;
  profile: string;
}

export default async function commentsDetail(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'COMMENT_DETAIL';
  logging.info(NAMESPACE, '[START]');
  const { comment_id } = req.params;
  if (!comment_id) return res.status(400).json({ message: '잘못된 접근입니다.', status: 'error' });
  try {
    const connection = await connectionPool.getConnection();
    try {
      const COMMENT_DETAIL_SQL =
        'SELECT ubc.id AS comment_id, ubc.comment, ubc.created_at, ubc.rating, bs.title, us.name, us.profile ' +
        'FROM users_books_comments AS ubc ' +
        'LEFT JOIN books AS bs ON bs.id = ubc.books_id ' +
        'LEFT JOIN users_books AS ub ON ub.id = ubc.users_books_id ' +
        'LEFT JOIN users AS us ON us.id = ub.users_id ' +
        'WHERE ubc.id = ?';
      const COMMENT_DETAIL_VALUE = [comment_id];
      const [COMMENT_DETAIL_RESULT] = await connection.query<ICommentDetail[]>(
        COMMENT_DETAIL_SQL,
        COMMENT_DETAIL_VALUE
      );
      logging.debug(NAMESPACE, '[COMMENT_DETAIL_RESULT]', COMMENT_DETAIL_RESULT);
      connection.release();
      res.status(200).json({
        ...COMMENT_DETAIL_RESULT[0],
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: 'CommentDetail을 불러오는데 실패했습니다.',
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
