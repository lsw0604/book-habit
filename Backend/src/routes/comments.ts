import express from 'express';
import commentList from '../controllers/comments.list';

/**
 * * 공개로 등록한 Comment의 리스트를 불러오는 API /api/comments/list
 */
const commentsRouter = express.Router();

// READ
commentsRouter.get('/list', commentList);

export default commentsRouter;
