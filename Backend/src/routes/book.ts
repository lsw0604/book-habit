import express from 'express';

import existBook from '../controllers//book.exist';

import read from '../controllers/book.read';
import reading from '../controllers/book.reading';
import readTo from '../controllers/book.readTo';

import access from '../controllers/auth.access';

const bookRouter = express.Router();

bookRouter.post('/read', access, existBook, read);
bookRouter.post('/reading', access, existBook, reading);
bookRouter.post('/read_to', access, existBook, readTo);

export default bookRouter;
