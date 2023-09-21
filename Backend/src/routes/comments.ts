import express from 'express';
import commentsList from '../controllers/comments.list';
import commentsLikeList from '../controllers/comments.like.list';

import commentsLikeRegister from '../controllers/comments.like.register';
import access from '../controllers/auth.access';

/**
 * * 공개로 등록한 Comment의 리스트를 불러오는 API /api/comments/list
 * * Comment에 좋아요를 등록한 유저의 리스트를 불러오는 API /api/comments/like/list/:comment_id
 * * Comment에 좋아요를 등록하는 API /api/comments/like/register
 */
const commentsRouter = express.Router();

// READ
commentsRouter.get('/list', commentsList);
commentsRouter.get('/like/list/:comment_id', commentsLikeList);

// CREATE
commentsRouter.post('/like/register/:comment_id', access, commentsLikeRegister);

export default commentsRouter;
