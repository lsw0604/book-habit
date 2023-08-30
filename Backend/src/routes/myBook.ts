import express from 'express';

import myBookList from '../controllers/myBook.list';
import myBookHistory from '../controllers/myBook.history';
import myBookExist from '../controllers/myBook.exist';

import myBookRead from '../controllers/myBook.read';
import myBookReading from '../controllers/myBook.reading';
import myBookRegister from '../controllers/myBook.register';

import access from '../controllers/auth.access';

const myBookRouter = express.Router();

myBookRouter.get('/list', access, myBookList);
myBookRouter.get('/history/:users_books_id', access, myBookHistory);
myBookRouter.get('/exist/:isbn', access, myBookExist);

myBookRouter.post('/read', access, myBookRead);
myBookRouter.post('/reading', access, myBookReading);
myBookRouter.post('/register', access, myBookRegister);

export default myBookRouter;
