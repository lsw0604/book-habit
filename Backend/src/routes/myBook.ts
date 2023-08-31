import express from 'express';

import myBookList from '../controllers/myBook.list';
import myBookHistory from '../controllers/myBook.history';
import myBookExist from '../controllers/myBook.exist';
import myBookInfo from '../controllers/myBook.info';

import myBookRegister from '../controllers/myBook.register';

import access from '../controllers/auth.access';

const myBookRouter = express.Router();

myBookRouter.get('/list', access, myBookList);
myBookRouter.get('/history/:users_books_id', access, myBookHistory);
myBookRouter.get('/exist/:isbn', access, myBookExist);
myBookRouter.get('/info/:users_books_id', access, myBookInfo);

myBookRouter.post('/register', access, myBookRegister);

export default myBookRouter;
