import express from 'express';

import register from '../controllers/auth.register';
import local from '../controllers/auth.local';
import logout from '../controllers/auth.logout';
import kakao from '../controllers/auth.kakao.login';
import KakaoCallback from '../controllers/auth.kakao.callback';
import kakaoUpdate from '../controllers/auth.kakao.update';
import profileUpdate from '../controllers/auth.profile.update';
import profileInfoUpdate from '../controllers/auth.profile.info.update';
import authLikeList from '../controllers/auth.like.list';
import authReplyList from '../controllers/auth.reply.list';

import upload from '../middleware/multer';
import access from '../middleware/auth.access';
import refresh from '../middleware/auth.refresh';

/**
 * * 로그아웃하는 API /api/auth/logout
 * * access jwt를 verify하는 API /api/auth/access
 * * refresh jwt를 verify하는 API /api/auth/refresh
 * * kakao redirect URL을 요청하는 API /api/auth/kakao
 * * kakao OAuth 로직을 수행하는 API /api/auth/callback?code={카카오로 인가 받은 code}
 * * user의 좋아요 리스트를 불러오는 API /api/auth/like
 * * user의 댓글 리스트를 불러오는 API /api/auth/reply
 * * local 회원가입 API /api/auth/register
 * * login API /api/auth/login
 * * kakao 회원정보를 수정하는 API /api/auth/kakao/register
 * * 유저 프로필 사진을 수정하는 API /api/auth/profile
 * * 유저 프로필 정보를 수정하는 API /api/auth/info
 */
const authRouter = express.Router();

// READ
authRouter.get('/logout', logout);
authRouter.get('/access', access, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'ACCESS_TOKEN_VERIFIED' });
});
authRouter.get('/refresh', refresh, (req, res) => {
  res.status(200).json({ ...req.user, status: 'success', message: 'REFRESH_TOKEN_VERIFIED' });
});
authRouter.get('/kakao', kakao);
authRouter.get('/kakao/callback', KakaoCallback);
authRouter.get('/like', access, authLikeList);
authRouter.get('/reply', access, authReplyList);
// CREATE
authRouter.post('/register', register);
authRouter.post('/login', local);
// UPDATE
authRouter.put('/kakao/register', access, kakaoUpdate);
authRouter.put('/profile', access, upload.single('profile'), profileUpdate);
authRouter.put('/info', access, profileInfoUpdate);

export default authRouter;
