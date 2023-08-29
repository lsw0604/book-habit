import express from 'express';
import read from '../controllers/book.read';
import reading from '../controllers/book.reading';
import readTo from '../controllers/book.readTo';

import access from '../controllers/auth.access';

const bookRouter = express.Router();

bookRouter.post('/read', access, read);
bookRouter.post('/reading', access, reading);
bookRouter.post('/read_to', access, readTo);

export default bookRouter;
