import express from 'express';
import passport from 'passport';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';

const Router = express.Router();

Router.post('/register', register);
Router.post('/login', passport.authenticate('local', { session: false }), local);

export default Router;
