import express from 'express';
import ranking from '../controllers/book.ranking';

const router = express.Router();

router.get('/ranking', ranking);

export = router;
