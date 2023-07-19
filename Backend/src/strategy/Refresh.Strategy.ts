import { StrategyOptions, VerifyCallback } from 'passport-jwt';

import { connectionPool } from '../config/database';
import logging from '../config/logging';
import { RowDataPacket } from 'mysql2';

interface IQuery extends RowDataPacket {
  id: string;
  email: string;
  name: string;
}

const RefreshJWTStrategyOptions: StrategyOptions = {
  jwtFromRequest: (req) => {
    let token;
    if (req && req.cookies) {
      token = req.cookies['refresh'];
      return token;
    }
  },
  secretOrKey: process.env.ACCESS_TOKEN as string,
};

const NAMESPACE = 'REFRESH_STRATEGY';

const RefreshVerify: VerifyCallback = async (payload, done) => {
  logging.debug(NAMESPACE, ': START');
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const SQL = 'SELECT id, email, name FROM user WHERE id = ?';
      const VALUE = [payload.id];

      const [rows] = await connection.query<IQuery[]>(SQL, VALUE);

      logging.debug(NAMESPACE, ': FINISH');

      connection.release();

      return done(null, { id: rows[0].id, name: rows[0].name, email: rows[0].email });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, 'ERROR : ', error);
      return done(null, false, { message: 'SQL 문 실행에 실패 했습니다.' });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, 'ERROR : ', error);
    return done(null, false, { message: 'DB에 연결 실패 했습니다.' });
  }
};

export { RefreshJWTStrategyOptions, RefreshVerify };
