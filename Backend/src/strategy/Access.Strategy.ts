import { ExtractJwt, StrategyOptions, VerifyCallback } from 'passport-jwt';
import { RowDataPacket } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { GenderType, ProviderType } from '../types';

interface IProps extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
}

const AccessJWTStrategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN as string,
};

const NAMESPACE = 'ACCESS_STRATEGY';

const AccessVerify: VerifyCallback = async (payload, done) => {
  logging.debug(NAMESPACE, '[START]', payload.id);
  try {
    const connection = await connectionPool.getConnection();
    try {
      const SQL = 'SELECT id, email, name, gender, age, provider FROM users WHERE id = ?';
      const VALUES = [payload.id];

      const [rows] = await connection.query<IProps[]>(SQL, VALUES);

      console.log(rows);

      if (rows[0] !== undefined) {
        const { id, name, email, gender, age, provider } = rows[0];
        connection.release();
        logging.debug(NAMESPACE, '[FINISH]');
        return done(null, { id, name, email, age, gender, provider });
      } else {
        connection.release();
        logging.error(NAMESPACE, 'SQL 문 실행 결과가 존재하지 않습니다.');
        return done(null, false, {
          name: 'error',
          message: 'SQL 문 실행 결과가 존재하지 않습니다.',
        });
      }
    } catch (error) {
      connection.release();
      logging.error(NAMESPACE, ' : ', error);
      return done(null, false, { name: 'error', message: 'SQL 문 실행에 실패 했습니다.' });
    }
  } catch (error) {
    logging.error(NAMESPACE, ' : ', error);
    return done(null, false, { name: 'error', message: 'DB에 연결 실패 했습니다.' });
  }
};

export { AccessJWTStrategyOptions, AccessVerify };
