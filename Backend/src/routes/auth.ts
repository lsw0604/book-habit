import express from 'express';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';
import access from '../controllers/auth.access';
import refresh from '../controllers/auth.refresh';

const Router = express.Router();

Router.post('/register', register);
Router.post('/login', local);

Router.get('/access', access);
Router.get('/refresh', refresh);

export default Router;
