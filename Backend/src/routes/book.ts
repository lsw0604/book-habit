import express from 'express';
import ranking from '../controllers/book.ranking';
import read from '../controllers/book.read';
import reading from '../controllers/book.reading';
import readTo from '../controllers/book.readTo';
import myBooks from '../controllers/book.myBook';
import myBooksInfo from '../controllers/book.myBookInfo';
import myBookAlready from '../controllers/book.myBookAlready';
import myBookRead from '../controllers/book.myBook.read';
import myBookReading from '../controllers/book.myBook.reading';

import access from '../controllers/auth.access';

const router = express.Router();

router.get('/ranking', ranking);
router.get('/my_books', access, myBooks);
router.get('/my_books/:title/:users_books_id', access, myBooksInfo);
router.get('/my_books_info/:isbn', access, myBookAlready);

router.post('/read', access, read);
router.post('/reading', access, reading);
router.post('/read_to', access, readTo);

router.post('/read_add', access, myBookRead);
router.post('/reading_add', access, myBookReading);

export = router;
