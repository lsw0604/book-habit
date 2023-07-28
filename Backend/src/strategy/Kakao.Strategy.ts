import { VerifyFunction as KakaoVerify, StrategyOption } from 'passport-kakao';
import { connectionPool } from '../config/database';
import { IUserAllInfo } from '../types';

const KakaoOauthStrategyOptions: StrategyOption = {
  callbackURL: process.env.KAKAO_CALLBACK!,
  clientID: process.env.KAKAO_CLIENT!,
  clientSecret: process.env.KAKAO_SECRET!,
};

const kakaoVerify: KakaoVerify = async (access, refresh, profile, done) => {
  const { id, username, provider } = profile;
  console.log(profile);
  done(null, profile);
};

export { kakaoVerify, KakaoOauthStrategyOptions };
