import express from 'express';

import bookExist from '../controllers/book.exist';

import read from '../controllers/book.read';
import reading from '../controllers/book.reading';
import readTo from '../controllers/book.readTo';

import access from '../controllers/auth.access';

/**
 * * 읽은책 등록하는 API /api/books/read
 * * 읽는중인 책 등록하는 API /api/books/reading
 * * 읽고싶은 책 등록하는 API /api/books/reading
 */
const bookRouter = express.Router();

bookRouter.post('/read', access, bookExist, read);
bookRouter.post('/reading', access, bookExist, reading);
bookRouter.post('/read_to', access, bookExist, readTo);

export default bookRouter;
