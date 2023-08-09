import { Request, Response } from 'express';

import logging from '../config/logging';
import { connectionPool } from '../config/database';

interface IRequest<T> extends Request {
  body: T;
}

const NAMESPACE = 'KAKAO_REGISTER';

const KakaoRegister = async (
  req: IRequest<{
    name: string;
    gender: 'female' | 'male';
    age: number;
  }>,
  res: Response
) => {
  const { name, gender, age } = req.body;
  const { id, email } = req.user as { id: number; email: string };

  logging.debug(NAMESPACE, '[START]');

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const KAKAO_REGISTER_SQL =
        'UPDATE users SET name = ?, gender = ?, age = ? WHERE id = ? AND email = ?';
      const KAKAO_REGISTER_VALUES = [name, gender, age, id, email];

      await connection.query(KAKAO_REGISTER_SQL, KAKAO_REGISTER_VALUES);

      await connection.commit();
      connection.release();

      res.status(200).json({
        status: 'success',
        message: '카카오 정보 등록에 성공 하셨습니다.',
      });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, ' : ', error);
      res.status(400).json({
        status: 'error',
        message: '카카오 정보 등록에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, 'ERROR :', error);
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

export default KakaoRegister;
