import { pool } from '../DB';
import { VerifyFunction as LocalVerify } from 'passport-local';
import bcrypt from 'bcrypt';
import { IUserAllInfo } from '../types/index';

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const localVerify: LocalVerify = async (email, password, done) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const sql = `SELECT id, email, name, gender, birthday, password FROM users WHERE email = ?`;
    const value = [email];

    const [rows] = await connection.query<
      Omit<IUserAllInfo[], 'provider' | 'refresh_token' | 'created_at'>
    >(sql, value);

    if (rows[0] === undefined)
      return done(null, false, { message: '존재하지 않는 사용자 입니다.' });

    const comparedPassword = await bcrypt.compare(password, rows[0].password);

    if (!comparedPassword)
      return done(null, false, { message: '비밀번호가 다릅니다.' });

    connection.release();
    return done(null, rows[0]);
  } catch (error) {
    console.log('error', error);
    return done(null, false, { message: 'DB에 연결 실패 했습니다.' });
  }
};

export { localOptions, localVerify };
