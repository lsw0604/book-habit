import express from 'express';

import myBookTimeRange from '../controllers/myBook.time.range';
import myBookList from '../controllers/myBook.list';
import myBookHistoryList from '../controllers/myBook.history.list';
import myBookRatingList from '../controllers/myBook.rating.list';
import myBookCommentsList from '../controllers/myBook.comments.list';
import myBookExist from '../controllers/myBook.exist';
import myBookInfo from '../controllers/myBook.info';

import myBookHistoryRegister from '../controllers/myBook.history.register';
import myBookRatingRegister from '../controllers/myBook.rating.register';
import myBookCommentRegister from '../controllers/myBook.comments.register';

import myBookListDelete from '../controllers/myBook.list.delete';
import myBookRatingDelete from '../controllers/myBook.rating.delete';
import myBookCommentDelete from '../controllers/myBook.comments.delete';
import myBookHistoryDelete from '../controllers/myBook.history.delete';

import access from '../controllers/auth.access';

/**
 * * 내 서재에 등록된 책 목록을 불러오는 API /api/my_book/list?page=page&status=status
 * * 내 서재에 등록된 책의 독서기록을 불러오는 API /api/my_book/history/list/:users_books_id
 * * 내 서재에 등록된 책의 평점을 불러오는 API /api/my_book/rating/list/:users_books_id
 * * 내 서재에 등록된 책의 한줄평을 불러오는 API /api/my_book/comments/list/:users_books_id
 * * 내 서재에 등록된 책의 정보를 불러오는 API /api/my_book/info/:users_books_id
 * * 내 서재에 등록된 책인지 확인하는 API /api/my_book/exist/:isbn
 * * 내 서재에 등록된 책의 시간 범위를 확인하는 API /api/my_book/time_range/:users_books_id
 * * 내 서재에 등록된 책에 독서기록을 등록하는 API /api/my_book/history/register
 * * 내 서재에 등록된 책에 평점을 등록하는 API /api/my_book/rating/register
 * * 내 서제에 등록된 책에 한줄평을 등록하는 API /api/my_book/comments/register
 * * 내 서재에 등록된 책의 평점을 삭제하는 API /api/my_book/rating/delete/:users_books_rating_id
 * * 내 서재에 등록된 책의 독서기록을 삭제하는 API /api/my_book/history/delete/:users_books_history_id
 * * 내 서재에 등록된 책의 한줄평을 삭제하는 API /api/my_book/comment/delete/:comment_id
 * * 내 서재에 등록된 책을 삭제하는 API /api/my_book/list/delete/:users_books_id
 */
const myBookRouter = express.Router();

// READ
myBookRouter.get('/list', access, myBookList);
myBookRouter.get('/history/list/:users_books_id', access, myBookHistoryList);
myBookRouter.get('/rating/list/:users_books_id', access, myBookRatingList);
myBookRouter.get('/comments/list/:users_books_id', access, myBookCommentsList);
myBookRouter.get('/info/:users_books_id', access, myBookInfo);
myBookRouter.get('/exist/:isbn', access, myBookExist);
myBookRouter.get('/time_range/:users_books_id', access, myBookTimeRange);
// CREATE
myBookRouter.post('/history/register', access, myBookHistoryRegister);
myBookRouter.post('/rating/register', access, myBookRatingRegister);
myBookRouter.post('/comments/register', access, myBookCommentRegister);
// DELETE
myBookRouter.delete('/history/delete/:users_books_history_id', access, myBookHistoryDelete);
myBookRouter.delete('/rating/delete/:users_books_rating_id', access, myBookRatingDelete);
myBookRouter.delete('/comment/delete/:comment_id', access, myBookCommentDelete);
myBookRouter.delete(`/list/delete/:users_books_id`, access, myBookListDelete);
// UPDATE
myBookRouter.put('/update/rating/:users_books_info_id', access);

export default myBookRouter;
