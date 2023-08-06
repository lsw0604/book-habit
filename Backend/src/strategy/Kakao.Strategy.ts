import { VerifyFunction as KakaoVerify, StrategyOption } from 'passport-kakao';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { IUserAllInfo } from '../types';
import { RowDataPacket } from 'mysql2';

const NAMESPACE = 'KAKAO_STRATEGY';

const KakaoOauthStrategyOptions: StrategyOption = {
  callbackURL: process.env.KAKAO_CALLBACK!,
  clientID: process.env.KAKAO_CLIENT!,
  clientSecret: process.env.KAKAO_SECRET!,
};

interface ISelectEmailFromUsersWhereId extends RowDataPacket {
  email?: string;
}

const kakaoVerify: KakaoVerify = async (access, refresh, profile, done) => {
  try {
    logging.debug(NAMESPACE, '[START]');
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const EMAIL_CHECK_SQL = 'SELECT email FROM users WHERE email = ? AND provider = ?';
      const EMAIL_CHECK_VALUE = [profile.id, profile.provider];

      const [exist_id] = await connection.query<ISelectEmailFromUsersWhereId[]>(
        EMAIL_CHECK_SQL,
        EMAIL_CHECK_VALUE
      );

      if (exist_id[0] !== undefined) return done(null, exist_id[0]);

      const REGISTER_SQL = 'INSERT INTO users (email, provider) VALUES (?, ?)';
      const REGISTER_VALUE = [profile.id, profile.provider];

      // await connection.query(REGISTER_SQL, REGISTER_VALUE);

      connection.release();

      return done(null, profile._json);
      // return done(null, false, { message: 'KAKAO로그인에 실패 하셨습니다.' });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, ' : ', error);
      return done(null, false, { message: 'KAKAO로그인에 실패 하셨습니다.' });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, ' : ', error);
    return done(null, false, { message: 'DB에 연결 실패 했습니다.' });
  }
};

export { kakaoVerify, KakaoOauthStrategyOptions };
