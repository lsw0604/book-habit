import express from 'express';
import commentList from '../controllers/comments.list';
import commentLikeList from '../controllers/comments.like.list';

/**
 * * 공개로 등록한 Comment의 리스트를 불러오는 API /api/comments/list
 * * Comment에 좋아요를 등록한 유저의 리스트를 불러오는 API /api/comments/like?
 */
const commentsRouter = express.Router();

// READ
commentsRouter.get('/list', commentList);
commentsRouter.get('/like/:comment_id', commentLikeList);

export default commentsRouter;
