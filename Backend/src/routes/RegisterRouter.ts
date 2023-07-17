import express from 'express';
import Register from '../controllers/register';
const Router = express.Router();

Router.post('/', Register);

export default Router;
