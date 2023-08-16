import express from 'express';
import ranking from '../controllers/book.ranking';
import read from '../controllers/book.read';
import access from '../controllers/auth.access';
import reading from '../controllers/book.reading';

const router = express.Router();

router.get('/ranking', ranking);

router.post('/read', access, read);
router.post('/reading', access, reading);
router.post('/read_to');

export = router;
