import { VerifyFunction as LocalVerify } from 'passport-local';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { GenderType, ISelectAllFromUsersWhereEmail, ProviderType } from '../types';

interface IQueryResult extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  password: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
  profile: string;
}

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const LocalVerify: LocalVerify = async (email, password, done) => {
  const NAMESPACE = 'LOCAL_STRATEGY';

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const SQL =
        'SELECT id, email, name, password, gender, age, provider, profile FROM users WHERE email = ?';
      const VALUE = [email];

      const [rows] = await connection.query<IQueryResult[]>(SQL, VALUE);

      if (rows[0] === undefined) {
        logging.info(NAMESPACE, '존재하지 않는 사용자입니다.');
        connection.release();
        return done(null, false, { message: '존재하지 않는 사용자입니다.' });
      }

      const comparedPassword = await bcrypt.compare(password, rows[0].password);

      if (!comparedPassword) {
        logging.info(NAMESPACE, '비밀번호가 다릅니다.');
        connection.release();
        return done(null, false, { message: '비밀번호가 다릅니다.' });
      }

      connection.release();

      logging.info(NAMESPACE, '로그인에 성공했습니다.');

      return done(null, {
        id: rows[0].id,
        email: rows[0].email,
        name: rows[0].name,
        gender: rows[0].gender,
        age: rows[0].age,
        profile: rows[0].profile,
        provider: rows[0].provider,
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, ' : ', error);
      return done(null, false, { message: '로그인에 실패 하셨습니다.' });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, ' : ', error);
    return done(null, false, { message: 'DB에 연결 실패 했습니다.' });
  }
};

export { localOptions, LocalVerify };
