import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';

import logging from '@/config/logging';
import { connectionPool } from '@/config/database';
import { AuthLocalRegisterEmailCheckType, IAuthLocalRegisterRequest, IRequest } from '@/types';

const NAMESPACE = 'AUTH_LOCAL_REGISTER';

const register = async (
  req: IRequest<IAuthLocalRegisterRequest>,
  res: Response,
  _: NextFunction
) => {
  const { email, name, password, gender, age } = req.body;
  logging.debug(NAMESPACE, '[START]');
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const ID_CHECK_SQL = 'SELECT email FROM users WHERE email = ?';
      const ID_CHECK_VALUE = [email];

      const [IdCheckResult] = await connection.query<AuthLocalRegisterEmailCheckType[]>(
        ID_CHECK_SQL,
        ID_CHECK_VALUE
      );

      if (!!IdCheckResult[0]) {
        logging.debug(NAMESPACE, '[이미 존재하는 email입니다.]');
        connection.release();
        return res.status(200).json({ status: 'error', message: '이미 존재하는 email입니다.' });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = bcrypt.hashSync(password, salt);

      const ID_REGISTER_SQL =
        'INSERT INTO users (email, name, password, gender, age, provider) VALUES(?, ?, ?, ?, ?, ?)';
      const ID_REGISTER_VALUE = [email, name, encryptedPassword, gender, age, 'local'];

      const [ID_REGISTER_RESULT] = await connection.query(ID_REGISTER_SQL, ID_REGISTER_VALUE);
      await connection.commit();
      connection.release();

      logging.debug(NAMESPACE, '[ID_REGISTER_RESULT]', ID_REGISTER_RESULT);

      res.status(200).json({
        status: 'success',
        message: '회원가입에 성공 하셨습니다.',
      });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, ' : ', error);
      res.status(400).json({
        status: 'error',
        message: '회원가입에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, ' : ', error);
    res.status(500).json({
      status: 'error',
      message: 'DB연결에 실패했습니다.',
      code: error?.code,
      errno: error?.errno,
      sql: error?.sql,
      sqlMessage: error?.sqlMessage,
    });
  }
};

export default register;
