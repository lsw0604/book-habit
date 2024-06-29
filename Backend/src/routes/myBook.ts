import express from 'express';

import myBookTimeRange from '../controllers/myBook.time.range';
import myBookList from '../controllers/myBook.list';
import myBookHistoryList from '../controllers/myBook.history.list';
import myBookCommentsList from '../controllers/myBook.comments.list';
import myBookInfo from '../controllers/myBook.info';
import myBookCalendar from '../controllers/myBook.calendar';

import myBookHistoryRegister from '../controllers/myBook.history.register';
import myBookCommentRegister from '../controllers/myBook.comments.register';

import myBookListDelete from '../controllers/myBook.list.delete';
import myBookCommentDelete from '../controllers/myBook.comments.delete';
import myBookHistoryDelete from '../controllers/myBook.history.delete';

import myBookCommentUpdate from '../controllers/myBook.comments.update';

import access from '../middleware/auth.access';

/**
 * * 내 서재에 등록된 책 목록을 불러오는 API /api/my_book/list?page=page&status=status
 * * 내 서재에 등록된 책의 독서기록을 불러오는 API /api/my_book/history/list/:users_books_id
 * * 내 서재에 등록된 책의 한줄평을 불러오는 API /api/my_book/comments/list/:users_books_id
 * * 내 서재에 등록된 책의 정보를 불러오는 API /api/my_book/info/:users_books_id
 * * 내 서재에 등록된 책의 시간 범위를 확인하는 API /api/my_book/time_range/:users_books_id
 * * 내 서재에 등록된 책에 독서기록을 등록하는 API /api/my_book/history/register
 * * 내 서제에 등록된 책에 한줄평을 등록하는 API /api/my_book/comments/register
 * * 내 서재에 등록된 책의 독서기록을 삭제하는 API /api/my_book/history/delete/:users_books_history_id
 * * 내 서재에 등록된 책의 한줄평을 삭제하는 API /api/my_book/comment/delete/:comment_id
 * * 내 서재에 등록된 책을 삭제하는 API /api/my_book/list/delete/:users_books_id
 * * 내 서재에 등록된 책의 한줄평을 수정하는 API /api/my_book/comment/update/:comment_id
 */
const myBookRouter = express.Router();

// READ
myBookRouter.get('/list', access, myBookList);
myBookRouter.get('/history/list/:users_books_id', access, myBookHistoryList);
myBookRouter.get('/comments/list/:users_books_id', access, myBookCommentsList);
myBookRouter.get('/info/:users_books_id', myBookInfo);
myBookRouter.get('/time_range/:users_books_id', access, myBookTimeRange);
myBookRouter.get('/calendar/:users_books_id', access, myBookCalendar);
// CREATE
myBookRouter.post('/history/register', access, myBookHistoryRegister);
myBookRouter.post('/comments/register', access, myBookCommentRegister);
// DELETE
myBookRouter.delete('/history/delete/:users_books_history_id', access, myBookHistoryDelete);
myBookRouter.delete('/comment/delete/:comment_id', access, myBookCommentDelete);
myBookRouter.delete(`/list/delete/:users_books_id`, access, myBookListDelete);
// UPDATE
myBookRouter.put('/comment/update/:comment_id', access, myBookCommentUpdate);

export default myBookRouter;
