import express from 'express';
import ranking from '../controllers/book.ranking';
import read from '../controllers/book.read';
import reading from '../controllers/book.reading';
import readTo from '../controllers/book.readTo';

import access from '../controllers/auth.access';

const router = express.Router();

router.get('/ranking', ranking);

router.post('/read', access, read);
router.post('/reading', access, reading);
router.post('/read_to', access, readTo);

export = router;
