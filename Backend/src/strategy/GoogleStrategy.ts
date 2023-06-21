import {
  IOAuth2StrategyOption,
  Profile,
  VerifyFunction,
} from 'passport-google-oauth';

const googleOptions: IOAuth2StrategyOption = {
  clientID: process.env.GOOGLE_CLIENT as string,
  callbackURL: process.env.GOOGLE_CALLBACK as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
};

const googleVerify = async (
  _: string,
  __: string,
  profile: Profile,
  done: VerifyFunction
): Promise<void> => {
  console.log(_, __, profile);

  done(_, __);
};

export { googleOptions, googleVerify };
