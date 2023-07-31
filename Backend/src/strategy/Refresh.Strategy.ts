import { StrategyOptions, VerifyCallback } from 'passport-jwt';

import { connectionPool } from '../config/database';
import logging from '../config/logging';
import { ISelectFromJWTPayload } from '../types';

const RefreshJWTStrategyOptions: StrategyOptions = {
  jwtFromRequest: (req) => {
    let token;
    if (req && req.cookies) {
      token = req.cookies['refresh'];
      return token;
    }
  },
  secretOrKey: process.env.REFRESH_TOKEN as string,
};

const NAMESPACE = 'REFRESH_STRATEGY';

const RefreshVerify: VerifyCallback = async (payload, done) => {
  logging.debug(NAMESPACE, ': [START]');
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL = 'SELECT id, email, name, age, gender FROM users WHERE id = ?';
      const VALUE = [payload.id];

      const [rows] = await connection.query<ISelectFromJWTPayload[]>(SQL, VALUE);

      if (rows[0] !== undefined) {
        const { id, age, gender, name, email } = rows[0];
        connection.release();
        logging.debug(NAMESPACE, ' : [FINISH]');
        return done(null, { id, age, name, email, gender });
      } else {
        connection.release();
        logging.error(NAMESPACE, 'SQL 문 실행 결과가 존재하지 않습니다.');
        return done(null, false, {
          name: 'error',
          message: 'SQL 문 실행 결과가 존재하지 않습나다.',
        });
      }
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, ' : ', error);
      return done(null, false, { name: 'error', message: 'SQL 문 실행에 실패 했습니다.' });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, ' : ', error);
    return done(null, false, { name: 'error', message: 'DB에 연결 실패 했습니다.' });
  }
};

export { RefreshJWTStrategyOptions, RefreshVerify };
