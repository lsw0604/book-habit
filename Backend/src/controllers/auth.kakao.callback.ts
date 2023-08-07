import { Response, Request, NextFunction } from 'express';
import qs from 'qs';
import { connectionPool } from '../config/database';
import logging from '../config/logging';
import { RowDataPacket } from 'mysql2';

interface IExistEmail extends RowDataPacket {
  id: number;
  email: string;
  name?: string;
  gender?: 'male' | 'female';
  age?: number;
}

export default async function KakaoCallback(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'KAKAO_CALLBACK';

  const code = req.query.code as string;

  const body = qs.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT as string,
    redirect_uri: process.env.KAKAO_CALLBACK as string,
    code: code,
  });

  try {
    const { access_token, refresh_token } = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }).then((response) => response.json());

    console.log(access_token);

    const { id } = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const SQL = 'SELECT id, name, gender, age, email FROM users WHERE email = ? AND provider = ?';
      const VALUE = [id, 'kakao'];

      const [exist_email] = await connection.query<IExistEmail[]>(SQL, VALUE);
      console.log(exist_email[0]);

      await connection.commit();
      connection.release();
      res.json({ exist_email });
    } catch (error) {
      logging.error(NAMESPACE, ' : ', error);
      await connection.rollback();
      connection.release();
      res.status(400).json({ error });
    }
  } catch (error) {
    logging.error(NAMESPACE, ' : ', error);
    res.status(400).json({ error });
  }
}
