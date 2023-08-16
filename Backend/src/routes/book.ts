import express from 'express';
import ranking from '../controllers/book.ranking';
import read from '../controllers/book.read';
import access from '../controllers/auth.access';

const router = express.Router();

router.get('/ranking', ranking);

router.post('/read', access, read);
router.post('/reading');
router.post('/read_to');

export = router;
