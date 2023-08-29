import express from 'express';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';
import access from '../controllers/auth.access';
import refresh from '../controllers/auth.refresh';
import logout from '../controllers/auth.logout';
import kakao from '../controllers/auth.kakao.login';
import KakaoCallback from '../controllers/auth.kakao.callback';
import KakaoRegister from '../controllers/auth.kakao.register';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', local);
authRouter.get('/logout', logout);
authRouter.get('/access', access, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'ACCESS_TOKEN_VERIFIED' });
});
authRouter.get('/refresh', refresh, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'REFRESH_TOKEN_VERIFIED' });
});

authRouter.get('/kakao', kakao);
authRouter.get('/kakao/callback', KakaoCallback);
authRouter.post('/kakao/register', access, KakaoRegister);

export default authRouter;
