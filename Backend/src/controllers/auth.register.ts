import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';

interface IRequest<T> extends Request {
  body: T;
}

interface IQueryIdCheck extends RowDataPacket {
  email?: string;
}

const NAMESPACE = 'REGISTER';

const register = async (
  req: IRequest<{ email: string; name: string; password: string }>,
  res: Response
) => {
  const { email, name, password } = req.body;
  logging.debug(NAMESPACE, ': START');
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const ID_CHECK_SQL = 'SELECT email FROM user WHERE email = ?';
      const ID_CHECK_VALUE = [email];

      const [IdCheckResult] = await connection.query<IQueryIdCheck[]>(ID_CHECK_SQL, ID_CHECK_VALUE);

      if (!!IdCheckResult[0]) {
        connection.release();
        return res.status(200).json({ status: false, message: '이미 존재하는 email입니다.' });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = bcrypt.hashSync(password, salt);

      const ID_REGISTER_SQL = 'INSERT INTO user (email, name, password) VALUES(?, ?, ?)';
      const ID_REGISTER_VALUE = [email, name, encryptedPassword];

      await connection.query(ID_REGISTER_SQL, ID_REGISTER_VALUE);
      await connection.commit();
      connection.release();

      logging.debug(NAMESPACE, ': FINISH');

      res.status(200).json({
        status: true,
        message: '회원가입에 성공 하셨습니다.',
      });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, 'ERROR :', error);
      res.status(400).json({
        status: false,
        message: '회원가입에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, 'ERROR :', error);
    res.status(500).json({
      status: false,
      message: 'DB연결에 실패했습니다.',
      code: error?.code,
      errno: error?.errno,
      sql: error?.sql,
      sqlMessage: error?.sqlMessage,
    });
  }
};

export default register;
