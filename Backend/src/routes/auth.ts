import express from 'express';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';
import access from '../controllers/auth.access';
import refresh from '../controllers/auth.refresh';
import logout from '../controllers/auth.logout';

const Router = express.Router();

Router.post('/register', register);
Router.post('/login', local);

Router.get('/logout', logout);
Router.get('/access', access);
Router.get('/refresh', refresh);

export default Router;
