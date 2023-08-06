import express, { Request, Response } from 'express';

import { authChecker } from '../middleware/jwt';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';
import access from '../controllers/auth.access';
import refresh from '../controllers/auth.refresh';
import logout from '../controllers/auth.logout';
import kakao from '../controllers/auth.kakao.login';
import passport from 'passport';

const Router = express.Router();

Router.post('/register', register);
Router.post('/login', local);

Router.get('/logout', logout);
Router.get('/me', access, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'ME_API_SUCCESS' });
});
Router.get('/access', access, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'ACCESS_TOKEN_VERIFIED' });
});
Router.get('/refresh', refresh, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'REFRESH_TOKEN_VERIFIED' });
});

Router.get('/kakao', passport.authenticate('kakao'));

Router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    console.log(req.user);
    res.status(200);
  }
);

Router.post('/test', access, (req, res) => {
  console.log(req.body);
  console.log(req.user);
  res.status(200).json({ ...req.body, s: 'ss', ...req.user });
});

export default Router;
