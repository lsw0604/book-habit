import { Response, Request, NextFunction } from 'express';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { CommentDetailType, GroupedCommentDetailType } from '../types';

const NAMESPACE = 'COMMENT_DETAIL';

export default async function commentsDetail(req: Request, res: Response, _: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  const { comment_id } = req.params;
  if (!comment_id) return res.status(400).json({ message: '잘못된 접근입니다.', status: 'error' });
  try {
    const connection = await connectionPool.getConnection();
    try {
      const COMMENT_DETAIL_SQL =
        'SELECT ubc.id AS comment_id, ubc.comment, ubc.created_at, ubc.rating, bs.title, us.name, us.profile, ubc.status, pcr.id AS reply_id, cl.users_id AS like_user_id ' +
        'FROM users_books_comments AS ubc ' +
        'LEFT JOIN books AS bs ON bs.id = ubc.books_id ' +
        'LEFT JOIN users_books AS ub ON ub.id = ubc.users_books_id ' +
        'LEFT JOIN users AS us ON us.id = ub.users_id ' +
        'LEFT JOIN public_comments_reply AS pcr ON pcr.users_books_comments_id = ubc.id ' +
        'LEFT JOIN comments_likes AS cl ON cl.users_books_comments_id = ubc.id ' +
        'WHERE ubc.id = ?';
      const COMMENT_DETAIL_VALUE = [comment_id];
      const [COMMENT_DETAIL_RESULT] = await connection.query<CommentDetailType[]>(
        COMMENT_DETAIL_SQL,
        COMMENT_DETAIL_VALUE
      );
      logging.debug(NAMESPACE, '[COMMENT_DETAIL_RESULT]', COMMENT_DETAIL_RESULT);

      const GroupedCommentDetail = COMMENT_DETAIL_RESULT.reduce(
        (grouped: GroupedCommentDetailType[], comment: CommentDetailType) => {
          const { comment_id, reply_id, like_user_id, ...rest } = comment;
          const existingComment = grouped.find((comment) => comment.comment_id === comment_id);

          if (existingComment) {
            if (
              reply_id !== null &&
              !existingComment.reply_ids.some((user) => user.reply_id === reply_id)
            ) {
              existingComment.reply_ids.push({ reply_id });
            }

            if (
              like_user_id !== null &&
              !existingComment.like_user_ids.some((user) => user.user_id === like_user_id)
            ) {
              existingComment.like_user_ids.push({ user_id: like_user_id });
            }
          } else {
            const newComment = {
              comment_id,
              reply_ids: reply_id !== null ? [{ reply_id }] : [],
              like_user_ids: like_user_id !== null ? [{ user_id: like_user_id }] : [],
              ...rest,
            };
            grouped.push(newComment);
          }

          return grouped;
        },
        []
      );

      logging.debug(NAMESPACE, '[GROUPED_COMMENT_DETAIL]', GroupedCommentDetail);

      connection.release();
      res.status(200).json({
        ...GroupedCommentDetail[0],
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
