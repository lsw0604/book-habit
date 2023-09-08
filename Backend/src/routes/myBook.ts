import express from 'express';

import myBookTimeRange from '../controllers/myBook.time.range';
import myBookList from '../controllers/myBook.list';
import myBookListDelete from '../controllers/myBook.list.delete';

import myBookHistoryList from '../controllers/myBook.history.list';
import myBookRatingList from '../controllers/myBook.rating.list';
import myBookExist from '../controllers/myBook.exist';
import myBookInfo from '../controllers/myBook.info';

import myBookRegister from '../controllers/myBook.history.register';
import myBookRating from '../controllers/myBook.rating.register';
import myBookRatingDelete from '../controllers/myBook.rating.delete';
import myBookHistoryDelete from '../controllers/myBook.history.delete';

import myBookCommentRegister from '../controllers/myBook.comments.register';

import access from '../controllers/auth.access';

const myBookRouter = express.Router();

myBookRouter.get('/list', access, myBookList);
myBookRouter.get('/history/:users_books_id', access, myBookHistoryList);
myBookRouter.get('/rating/:users_books_id', access, myBookRatingList);
myBookRouter.get('/exist/:isbn', access, myBookExist);
myBookRouter.get('/info/:users_books_id', access, myBookInfo);
myBookRouter.get('/time_range/:users_books_id', access, myBookTimeRange);

myBookRouter.post('/register', access, myBookRegister);
myBookRouter.post('/rating', access, myBookRating);
myBookRouter.post('/comments', access, myBookCommentRegister);

myBookRouter.delete('/delete/history/:users_books_history_id', access, myBookHistoryDelete);
myBookRouter.delete('/delete/rating/:users_books_rating_id', access, myBookRatingDelete);
myBookRouter.delete(`/list/delete/:users_books_id`, access, myBookListDelete);

myBookRouter.put('/update/rating/:users_books_info_id', access);

export default myBookRouter;
