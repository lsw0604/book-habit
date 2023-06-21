import { VerifyFunction as KakaoVerify, StrategyOption } from 'passport-kakao';

const kakaoOptions: StrategyOption = {
  callbackURL: process.env.KAKAO_CALLBACK as string,
  clientID: process.env.KAKAO_CLIENT as string,
  clientSecret: process.env.KAKAO_SECRET as string,
};

// const kakaoOptions: StrategyOption = {
//   callbackURL: 'http://localhost:3001/api/auth/kakao/callback',
//   clientID: process.env.KAKAO_CLIENT as string,
//   clientSecret: process.env.KAKAO_SECRET as string,
// };

const kakaoVerify: KakaoVerify = async (_, __, profile, done) => {
  console.log('sss');
  console.log(profile);
  done(null, profile._json);
};

export { kakaoVerify, kakaoOptions };
