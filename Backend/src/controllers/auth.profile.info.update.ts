import { Response, NextFunction } from 'express';
import { ResultSetHeader } from 'mysql2';

import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { GenderType, IRequest, ProfileInfoUpdateType } from '../types';

const NAMESPACE = 'PROFILE_INFO_UPDATE';

export default async function profileInfoUpdate(
  req: IRequest<{ name?: string; age?: number | ''; gender: GenderType | '' }>,
  res: Response,
  _: NextFunction
) {
  if (!req.user) return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });

  const { id } = req.user;
  if (!id) return res.status(403).json({ status: 'error', message: '로그인이 필요합니다.' });

  const { name, age, gender } = req.body;

  logging.debug(NAMESPACE, '[REQ.BODY]', req.body);

  try {
    const connection = await connectionPool.getConnection();
    try {
      let PROFILE_INFO_UPDATE_SQL = 'UPDATE users SET ';
      const PROFILE_INFO_UPDATE_VALUE: GenderType | number | string[] = [];

      if (name === '') {
        PROFILE_INFO_UPDATE_SQL += 'name = ?, ';
        PROFILE_INFO_UPDATE_VALUE.push(name);
      }

      if (age === '') {
        PROFILE_INFO_UPDATE_SQL += 'age = ?, ';
        PROFILE_INFO_UPDATE_VALUE.push(age);
      }

      if (gender === '') {
        PROFILE_INFO_UPDATE_SQL += 'gender = ?, ';
        PROFILE_INFO_UPDATE_VALUE.push(gender);
      }

      PROFILE_INFO_UPDATE_SQL = PROFILE_INFO_UPDATE_SQL.slice(0, -2);

      PROFILE_INFO_UPDATE_SQL += ' WHERE id = ?';
      PROFILE_INFO_UPDATE_VALUE.push(id as any);

      const [PROFILE_INFO_UPDATE_RESULT] = await connection.query<ResultSetHeader>(
        PROFILE_INFO_UPDATE_SQL,
        PROFILE_INFO_UPDATE_VALUE
      );

      logging.debug(NAMESPACE, '[PROFILE_INFO_UPDATE_RESULT]', PROFILE_INFO_UPDATE_RESULT);

      const PROFILE_INFO_SQL = 'SELECT name, age, gender FROM users WHERE id = ?';
      const PROFILE_INFO_VALUE = [id];
      const [PROFILE_INFO_RESULT] = await connection.query<ProfileInfoUpdateType[]>(
        PROFILE_INFO_SQL,
        PROFILE_INFO_VALUE
      );

      logging.debug(NAMESPACE, '[PROFILE_INFO_RESULT]', PROFILE_INFO_RESULT[0]);

      connection.release();
      res.status(200).json({
        message: '프로필 등록에 성공했습니다.',
        status: 'success',
        ...PROFILE_INFO_RESULT[0],
      });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, '[ERROR]', error);
      res.status(400).json({
        status: 'error',
        message: '프로필 등록에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, '[ERROR]', error);
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
