import { NextFunction, Response } from 'express';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { IKakaoRegisterRequest, KakaoRegisterKakaoUserInfoType, IRequest } from '../types';

const NAMESPACE = 'KAKAO_REGISTER';

export default async function kakaoUpdate(
  req: IRequest<IKakaoRegisterRequest>,
  res: Response,
  _: NextFunction
) {
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

      const KAKAO_USER_EXIST_SQL =
        'SELECT id, name, gender, age, provider, email, profile FROM users WHERE id = ? AND email = ?';
      const KAKAO_USER_EXIST_VALUES = [id, email];
      const [KAKAO_USER_EXIST_RESULT] = await connection.query<KakaoRegisterKakaoUserInfoType[]>(
        KAKAO_USER_EXIST_SQL,
        KAKAO_USER_EXIST_VALUES
      );

      logging.debug(NAMESPACE, '[KAKAO_USER_EXIST_RESULT]', [KAKAO_USER_EXIST_RESULT][0]);

      await connection.commit();
      connection.release();

      res.status(200).json({
        ...KAKAO_USER_EXIST_RESULT[0],
        status: 'success',
        message: '카카오 정보 등록에 성공 하셨습니다.',
      });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, ':', error);
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
    logging.error(NAMESPACE, ':', error);
    res.status(500).json({
      status: 'error',
      message: 'DB연결에 실패했습니다.',
      code: error?.code,
      errno: error?.errno,
      sql: error?.sql,
      sqlMessage: error?.sqlMessage,
    });
  }
}
