import express from 'express';

import bookRegister from '../controllers/book.register';

import access from '../controllers/auth.access';

/**
 * * 책 등록하는 API /api/books/register
 */
const bookRouter = express.Router();

bookRouter.post('/register', access, bookRegister);

export default bookRouter;
