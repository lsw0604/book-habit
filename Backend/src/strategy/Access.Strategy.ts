import { StrategyOptions, VerifyCallback } from 'passport-jwt';

import logging from '../config/logging';

const AccessJWTStrategyOptions: StrategyOptions = {
  jwtFromRequest: (req) => {
    let token;
    if (req && req.cookies) {
      token = req.cookies['access'];
      return token;
    }
  },
  secretOrKey: process.env.ACCESS_TOKEN as string,
};

const NAMESPACE = 'ACCESS_STRATEGY';

const AccessVerify: VerifyCallback = (payload, done) => {
  logging.debug(NAMESPACE, ' : START');
  logging.debug(NAMESPACE, ' : [INFO]', payload);
  logging.debug(NAMESPACE, ' : FINISH');
  return done(null, { id: payload.id, name: payload.name, email: payload.email });
};

export { AccessJWTStrategyOptions, AccessVerify };
