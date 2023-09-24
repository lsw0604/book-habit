import express from 'express';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';
import access from '../controllers/auth.access';
import refresh from '../controllers/auth.refresh';
import logout from '../controllers/auth.logout';
import kakao from '../controllers/auth.kakao.login';
import KakaoCallback from '../controllers/auth.kakao.callback';
import kakaoUpdate from '../controllers/auth.kakao.update';
import profileUpdate from '../controllers/auth.profile.update';
import authInfo from '../controllers/auth.info';

import upload from '../middleware/multer';

/**
 * * 로그아웃하는 API /api/auth/logout
 * * access jwt를 verify하는 API /api/auth/access
 * * refresh jwt를 verify하는 API /api/auth/refresh
 * * kakao redirect URL을 요청하는 API /api/auth/kakao
 * * kakao OAuth를 로직을 수행하는 API /api/auth/callback?code={카카오로 인가 받은 code}
 * * user의 정보를 불러오는 API /api/auth/info
 * * local 회원가입 API /api/auth/register
 * * login API /api/auth/login
 * * kakao 회원정보를 수정하는 API /api/auth/kakao/register
 * * 유저 프로필 사진을 수정하는 API /api/auth/profile
 */
const authRouter = express.Router();

authRouter.get('/logout', logout);
authRouter.get('/access', access, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'ACCESS_TOKEN_VERIFIED' });
});
authRouter.get('/refresh', refresh, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'REFRESH_TOKEN_VERIFIED' });
});
authRouter.get('/kakao', kakao);
authRouter.get('/kakao/callback', KakaoCallback);
authRouter.get('/info', access, authInfo);

authRouter.post('/register', register);
authRouter.post('/login', local);

authRouter.put('/kakao/register', access, kakaoUpdate);
authRouter.put('/profile', access, upload.single('profile'), profileUpdate);

export default authRouter;
