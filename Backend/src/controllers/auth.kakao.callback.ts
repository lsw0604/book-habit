import { Response, Request, NextFunction } from 'express';
import qs from 'qs';

import { connectionPool } from '../config/database';
import logging from '../config/logging';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import tokenGenerator from '../utils/token';
import { GenderType, ProviderType } from '../types';

interface IQueryResult extends RowDataPacket {
  id: number;
  name: string;
  gender: GenderType;
  age: number;
  email: string;
  profile?: string;
  provider: ProviderType;
}

export default async function KakaoCallback(req: Request, res: Response, _: NextFunction) {
  const NAMESPACE = 'KAKAO_CALLBACK';

  const code = req.query.code as string;
  const body = qs.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT as string,
    redirect_uri: `${process.env.CLIENT_URL}/login/kakao`,
    code,
  });

  logging.debug(NAMESPACE, body);

  try {
    const { access_token } = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }).then((response) => response.json());

    if (access_token === undefined)
      return res
        .status(403)
        .json({ message: 'access_token이 존재하지 않습니다..', status: 'error' });

    const { id, kakao_account } = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
        'Authorization': `Bearer ${access_token}`,
      },
    }).then((res) => res.json());

    logging.debug(NAMESPACE, '[kakao_account]', kakao_account);

    if (id === undefined)
      return res.status(403).json({ message: 'kakao_id가 존재하지 않습니다.', status: 'error' });

    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const KAKAO_ID_EXIST_SQL =
        'SELECT id, email, gender, age, name, provider, profile FROM users WHERE email = ? AND provider = ?';
      const KAKAO_ID_EXIST_VALUE = [id, 'kakao'];
      const [KAKAO_ID_EXIST_RESULT] = await connection.query<IQueryResult[]>(
        KAKAO_ID_EXIST_SQL,
        KAKAO_ID_EXIST_VALUE
      );
      logging.debug(NAMESPACE, '[KAKAO_ID_EXIST_RESULT]', KAKAO_ID_EXIST_RESULT);

      if (KAKAO_ID_EXIST_RESULT[0] !== undefined) {
        connection.release();

        const { id, email, name } = KAKAO_ID_EXIST_RESULT[0];
        const { access_jwt, refresh_jwt } = tokenGenerator({ id, name, email });

        res.cookie('refresh', refresh_jwt, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          path: '/',
        });
        return res.status(200).json({
          ...KAKAO_ID_EXIST_RESULT[0],
          access_jwt,
          message: '로그인에 성공 하셨습니다.',
          status: 'success',
        });
      } else {
        const REGISTER_SQL = 'INSERT INTO users (email, provider, profile) VALUES(?, ?, ?)';
        const REGISTER_VALUE = [id, 'kakao', kakao_account.profile.thumbnail_image_url];

        const [REGISTER_RESULT] = await connection.query<ResultSetHeader>(
          REGISTER_SQL,
          REGISTER_VALUE
        );

        logging.info(NAMESPACE, '[RESULT_SET_HEADER]', REGISTER_RESULT.insertId);

        const EXIST_SUB_SQL =
          'SELECT id, email, gender, age, name, provider, profile FROM users WHERE id = ? AND provider = ?';
        const EXIST_SUB_VALUES = [REGISTER_RESULT.insertId, 'kakao'];
        const [EXIST_SUB_RESULT] = await connection.query<IQueryResult[]>(
          EXIST_SUB_SQL,
          EXIST_SUB_VALUES
        );

        logging.info(NAMESPACE, '[EXIST_SUB_RESULT]', EXIST_SUB_RESULT[0]);

        const { access_jwt, refresh_jwt } = tokenGenerator({
          id: REGISTER_RESULT.insertId,
          name: null,
          email: id,
        });

        res.cookie('refresh', refresh_jwt, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          path: '/',
        });

        await connection.commit();
        connection.release();
        res.status(200).json({
          ...EXIST_SUB_RESULT[0],
          access_jwt,
          message: '카카오 추가정보를 등록해주세요.',
          status: 'info',
        });
      }
    } catch (error) {
      await connection.rollback();
      connection.release();
      logging.error(NAMESPACE, ':', error);
      res.status(403).json({ error });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, ':', error);
    res.status(403).json({ error });
  }
}
