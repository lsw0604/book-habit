import { VerifyFunction as KakaoVerify, StrategyOption } from 'passport-kakao';

const { KAKAO_CALLBACK, KAKAO_CLIENT, KAKAO_SECRET } = process.env;

const KakaoStrategyOption: StrategyOption = {
  callbackURL: KAKAO_CALLBACK as string,
  // clientID: KAKAO_CLIENT as string,
  clientID: '030604c1c847c06c4d12f9c9be7dd139',
  clientSecret: KAKAO_SECRET as string,
};

const KakaoVerify: KakaoVerify = async (_, __, profile, done) => {
  console.log(_, __, profile);
  return done(null, profile);
};

export { KakaoStrategyOption, KakaoVerify };
