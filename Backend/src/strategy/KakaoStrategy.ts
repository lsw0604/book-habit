import { VerifyFunction as KakaoVerify, StrategyOption } from 'passport-kakao';
import { connectionPool } from '../DB';
import { IUserAllInfo } from '../types';

const kakaoOptions: StrategyOption = {
  callbackURL: process.env.KAKAO_CALLBACK!,
  clientID: process.env.KAKAO_CLIENT!,
  clientSecret: process.env.KAKAO_SECRET!,
};

const kakaoVerify: KakaoVerify = async (_, __, profile, done) => {
  const { id, username, provider } = profile;
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const sql = `SELECT * FROM users WHERE email = ? AND provider = ?`;
      const value = [profile.id, profile.provider];
      const [rows] = await connection.query<IUserAllInfo[]>(sql, value);
      console.log('rows[0]', rows[0]);
      if (rows[0] === undefined) {
        const sql =
          'INSERT INTO users (email, name, provider, password) VALUES(?, ?, ?, ?)';
        const value = [id, username, provider, id];
        await connection.query(sql, value);
        await connection.commit();
        connection.release();

        return done(profile, true);
      }

      connection.release();
      return done(rows[0], true);
    } catch (error: any) {
      console.log(error);
      await connection.rollback();
      connection.release();
    }
  } catch (error: any) {
    return done(null, false, { message: 'DB에 연결 실패 했습니다.' });
  }
};

export { kakaoVerify, kakaoOptions };
