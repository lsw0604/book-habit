import express from 'express';

import existBook from '../controllers//book.exist';

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

bookRouter.post('/read', access, existBook, read);
bookRouter.post('/reading', access, existBook, reading);
bookRouter.post('/read_to', access, existBook, readTo);

export default bookRouter;
