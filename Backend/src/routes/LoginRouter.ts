import express from 'express';
import LocalLogin from '../controller/localLogin';
import KakaoLogin from '../controller/kakaoLogin';
import passport from 'passport';

const Router = express.Router();

Router.post(
  '/local',
  passport.authenticate('local', { session: false }),
  LocalLogin
);

Router.get('/kakao', passport.authenticate('kakao', KakaoLogin));
Router.get('/kakao/callback', passport.authenticate('kakao', KakaoLogin));

export default Router;
