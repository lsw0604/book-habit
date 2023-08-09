import { Response, Request, NextFunction } from 'express';
import qs from 'qs';

import { connectionPool } from '../config/database';
import logging from '../config/logging';
import { RowDataPacket } from 'mysql2';
import tokenGenerator from '../utils/token';
import { GenderType, ProviderType } from '../types';

interface IQueryResult extends RowDataPacket {
  id: number;
  name: string;
  gender: GenderType;
  age: number;
  email: string;
  provider: ProviderType;
}

export default async function KakaoCallback(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'KAKAO_CALLBACK';
  const code = req.query.code as string;
  const body = qs.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT as string,
    redirect_uri: 'http://localhost:5173/login/kakao',
    code: code,
  });

  try {
    const { access_token, expires_in, refresh_token_expires_in } = await fetch(
      'https://kauth.kakao.com/oauth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }
    ).then((response) => response.json());

    const { id } = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
        'Authorization': `Bearer ${access_token}`,
      },
    }).then((res) => res.json());

    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const EXIST_SQL =
        'SELECT id, email, gender, age, name, provider FROM users WHERE email = ? AND provider = ?';
      const EXIST_VALUE = [id, 'kakao'];

      const [EXIST_RESULT] = await connection.query<IQueryResult[]>(EXIST_SQL, EXIST_VALUE);

      if (EXIST_RESULT[0] !== undefined) {
        connection.release();
        const { id, email, name } = EXIST_RESULT[0];
        const { access_jwt, refresh_jwt } = tokenGenerator({ id, name, email });

        res.cookie('access', access_jwt, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          path: '/',
        });

        res.cookie('refresh', refresh_jwt, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          path: '/',
        });

        return res
          .status(200)
          .json({ ...EXIST_RESULT[0], message: '로그인에 성공 하셨습니다.', status: 'success' });
      }
      const REGISTER_SQL = 'INSERT INTO users (email, provider) VALUES(?, ?)';
      const REGISTER_VALUE = [id, 'kakao'];

      const [REGISTER_RESULT] = await connection.query(REGISTER_SQL, REGISTER_VALUE);

      const { access_jwt, refresh_jwt } = tokenGenerator({ id: 0, name: '', email: id });

      res.cookie('access', access_jwt, {
        maxAge: expires_in,
        httpOnly: true,
        path: '/',
      });

      res.cookie('refresh', refresh_jwt, {
        maxAge: refresh_token_expires_in,
        httpOnly: true,
        path: '/',
      });

      await connection.commit();
      connection.release();
      res.status(200).json({ email: id });
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
