import express from 'express';
import Register from '../controller/register';
const Router = express.Router();

Router.post('/', Register);

export default Router;
