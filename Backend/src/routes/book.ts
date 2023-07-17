import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.get('/list/:date', controller.getBestSellerDay);

export = router;
