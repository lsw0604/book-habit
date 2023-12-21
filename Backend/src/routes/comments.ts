import express from 'express';

import commentsReplyList from '../controllers/comments.reply.list';
import commentsList from '../controllers/comments.list';
import commentsDetail from '../controllers/comments.detail';

import commentsLikeRegister from '../controllers/comments.like.register';
import commentsReplyRegister from '../controllers/comments.reply.register';

import commentsLikeDelete from '../controllers/comments.like.delete';
import commentsReplyDelete from '../controllers/comments.reply.delete';

import access from '../controllers/auth.access';

/**
 * * Comment 리스트를 불러오는 API /api/comments/list
 * * Comment의 detail info 불러오는 API /api/comments/detail/:comment_id
 * * Comment에 등록된 댓글 리스트를 불러오는 API /api/comments/reply/list/:comment_id
 * * Comment에 좋아요를 등록하는 API /api/comments/like/register
 * * Comment에 댓글을 등록하는 API /api/comments/reply/register
 * * Comment에 등록된 좋아요를 삭제하는 API /api/comments/like/delete/:comment_id
 * * Comment에 등록된 댓글을 삭제하는 API /api/comments/reply/delete/:reply_id
 *
 */
const commentsRouter = express.Router();

// READ
commentsRouter.get('/list', commentsList);
commentsRouter.get('/detail/:comment_id', commentsDetail);
commentsRouter.get('/reply/list/:comment_id', commentsReplyList);

// CREATE
commentsRouter.post('/like/register/:comment_id', access, commentsLikeRegister);
commentsRouter.post('/reply/register/:comment_id', access, commentsReplyRegister);

// DELETE
commentsRouter.delete('/like/delete/:comment_id', access, commentsLikeDelete);
commentsRouter.delete(`/reply/delete/:reply_id`, access, commentsReplyDelete);

export default commentsRouter;
