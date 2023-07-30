import { VerifyFunction as LocalVerify } from 'passport-local';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

import logging from '../config/logging';
import { connectionPool } from '../config/database';

interface IQuery extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  password: string;
  gender: 'male' | 'female';
  age: number;
}

const NAMESPACE = 'LOCAL_STRATEGY';

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const LocalVerify: LocalVerify = async (email, password, done) => {
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const SQL = 'SELECT id, email, name, password, gender, age FROM users WHERE email = ?';
      const VALUE = [email];

      const [rows] = await connection.query<IQuery[]>(SQL, VALUE);

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
      });
    } catch (error: any) {
      connection.release();
      logging.error(NAMESPACE, 'Error', error);
      return done(null, false, { message: '로그인에 실패 하셨습니다.' });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, 'Error', error);
    return done(null, false, { message: 'DB에 연결 실패 했습니다.' });
  }
};

export { localOptions, LocalVerify };
