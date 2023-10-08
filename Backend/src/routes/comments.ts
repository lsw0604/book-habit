import express from 'express';

import commentsReplyList from '../controllers/comments.reply.list';
import commentsList from '../controllers/comments.list';
import commentsDetail from '../controllers/comments.detail';
import commentsLikeList from '../controllers/comments.like.list';

import commentsLikeRegister from '../controllers/comments.like.register';
import commentsLikeDelete from '../controllers/comments.like.delete';
import commentsReplyRegister from '../controllers/comments.reply.register';

import access from '../controllers/auth.access';

/**
 * * Comment 리스트를 불러오는 API /api/comments/list
 * * Comment에 좋아요를 등록한 유저의 리스트를 불러오는 API /api/comments/like/list/:comment_id
 * * Comment에 좋아요를 등록하는 API /api/comments/like/register
 * * Comment에 등록된 좋아요를 삭제하는 API /api/comments/like/delete/:comment_id
 */
const commentsRouter = express.Router();

// READ
commentsRouter.get('/list', commentsList);
commentsRouter.get('/detail/:comment_id', commentsDetail);
commentsRouter.get('/like/list/:comment_id', commentsLikeList);
commentsRouter.get('/reply/list/:comment_id', commentsReplyList);

// CREATE
commentsRouter.post('/like/register/:comment_id', access, commentsLikeRegister);
commentsRouter.post('/reply/register/:comment_id', access, commentsReplyRegister);

// DELETE
commentsRouter.delete('/like/delete/:comment_id', access, commentsLikeDelete);

export default commentsRouter;
