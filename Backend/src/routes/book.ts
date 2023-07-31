import express from 'express';
import ranking from '../controllers/book.ranking';
import search from '../controllers/book.search';

const router = express.Router();

router.get('/ranking', ranking);
router.get('/search', search);

export = router;
