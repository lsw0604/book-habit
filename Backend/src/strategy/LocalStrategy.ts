import { pool } from '../DB';
import { VerifyFunction as LocalVerify } from 'passport-local';
import bcrypt from 'bcrypt';
import { IUserAllInfo } from '../types/index';

const LocalStrategyOption = {
  usernameField: 'email',
  passwordField: 'password',
};

const LocalVerify: LocalVerify = async (email, password, done) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const sql = `SELECT * FROM users WHERE email = ?`;
    const value = [email];

    const [rows] = await connection.query<IUserAllInfo[]>(sql, value);

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

export { LocalVerify, LocalStrategyOption };
