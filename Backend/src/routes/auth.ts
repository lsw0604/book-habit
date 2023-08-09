import express from 'express';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';
import access from '../controllers/auth.access';
import refresh from '../controllers/auth.refresh';
import logout from '../controllers/auth.logout';
import kakao from '../controllers/auth.kakao.login';
import KakaoCallback from '../controllers/auth.kakao.callback';
import KakaoRegister from '../controllers/auth.kakao.register';

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

Router.get('/kakao', kakao);
Router.get('/kakao/callback', KakaoCallback);
Router.post('/kakao/register', access, KakaoRegister);

export default Router;
