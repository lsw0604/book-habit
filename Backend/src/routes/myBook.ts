import express from 'express';

import myBookList from '../controllers/myBook.list';
import myBookInfo from '../controllers/myBook.info';
import myBookExist from '../controllers/myBook.exist';

import myBookRead from '../controllers/myBook.read';
import myBookReading from '../controllers/myBook.reading';

import access from '../controllers/auth.access';

const myBookRouter = express.Router();

myBookRouter.get('/list', access, myBookList);
myBookRouter.get('/info/:users_books_id', access, myBookInfo);
myBookRouter.get('/exist/:isbn', access, myBookExist);

myBookRouter.post('/read', access, myBookRead);
myBookRouter.post('/reading', access, myBookReading);

export default myBookRouter;
