import { Response, Request, NextFunction } from 'express';
import dayjs from 'dayjs';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { CommentListType, GroupedCommentType } from '../types';

const NAMESPACE = 'COMMENT_LIST';
const CURRENT_DATE = dayjs();
const FIRST_DATE_CURRENT_MONTH = CURRENT_DATE.startOf('month');
const LAST_DATE_CURRENT_MONTH = CURRENT_DATE.endOf('month');

export default async function commentList(_: Request, res: Response, __: NextFunction) {
  logging.info(NAMESPACE, '[START]');
  try {
    const connection = await connectionPool.getConnection();
    try {
      const COMMENT_LIST_SQL =
        'SELECT ubc.id AS comment_id, ubc.comment, ubc.created_at, ubc.rating, bs.title, us.name, us.profile, ubc.status, us.gender, cl.users_id AS like_user_id, pcr.id AS reply_user_id, ' +
        'CASE ' +
        "WHEN us.age BETWEEN 0 AND 9 THEN '어린이' " +
        "WHEN us.age BETWEEN 10 AND 19 THEN '10대' " +
        "WHEN us.age BETWEEN 20 AND 29 THEN '20대' " +
        "WHEN us.age BETWEEN 30 AND 39 THEN '30대' " +
        "WHEN us.age BETWEEN 40 AND 49 THEN '40대' " +
        "WHEN us.age BETWEEN 50 AND 59 THEN '50대' " +
        "ELSE '60대 이상'" +
        'END AS age_category ' +
        'FROM users_books_comments AS ubc ' +
        'LEFT JOIN books AS bs ON bs.id = ubc.books_id ' +
        'LEFT JOIN users_books AS ub ON ub.id = ubc.users_books_id ' +
        'LEFT JOIN users AS us ON us.id = ub.users_id ' +
        'LEFT JOIN comments_likes AS cl ON cl.users_books_comments_id = ubc.id ' +
        'LEFT JOIN public_comments_reply AS pcr ON pcr.users_books_comments_id = ubc.id ' +
        'WHERE comment_is_open = true AND ubc.created_at BETWEEN ? AND ? ' +
        'ORDER BY created_at DESC';
      const COMMENT_LIST_VALUE = [
        FIRST_DATE_CURRENT_MONTH.format('YYYY-MM-DD'),
        LAST_DATE_CURRENT_MONTH.add(1, 'day').format('YYYY-MM-DD'),
      ];
      const [COMMENT_LIST_RESULT] = await connection.query<CommentListType[]>(
        COMMENT_LIST_SQL,
        COMMENT_LIST_VALUE
      );

      const GroupedComments = COMMENT_LIST_RESULT.reduce(
        (grouped: GroupedCommentType[], comment: CommentListType) => {
          const { comment_id, like_user_id, reply_user_id, ...rest } = comment;
          const existingComment = grouped.find((comment) => comment.comment_id === comment_id);

          if (existingComment) {
            if (
              like_user_id !== null &&
              !existingComment.like_user_id.some((user) => user.user_id === like_user_id)
            ) {
              existingComment.like_user_id.push({ user_id: like_user_id });
            }

            if (
              reply_user_id !== null &&
              !existingComment.reply_user_id.some((user) => user.user_id === reply_user_id)
            ) {
              existingComment.reply_user_id.push({ user_id: reply_user_id });
            }
          } else {
            const newComment = {
              comment_id,
              like_user_id: like_user_id !== null ? [{ user_id: like_user_id }] : [],
              reply_user_id: reply_user_id !== null ? [{ user_id: reply_user_id }] : [],
              ...rest,
            };
            grouped.push(newComment);
          }

          return grouped;
        },
        []
      );

      logging.debug(NAMESPACE, '[GROUPED_COMMENTS]', GroupedComments);

      connection.release();
      res.status(200).json({
        comments: GroupedComments,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, '[SQL]', error);
      res.status(400).json({
        status: 'error',
        message: '한줄평을 불러오는데 실패했습니다.',
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
