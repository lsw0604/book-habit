import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserAllInfo } from '../types';
import { connectionPool } from '../DB';
import tokenGenerator from '../utils/token';

export default async function (req: Request, res: Response) {
  const { id, name, birthday, email, gender } = req.user as Pick<
    IUserAllInfo,
    'id' | 'name' | 'gender' | 'birthday' | 'email'
  >;
  const { access_jwt, refresh_jwt, verifyAccessToken, verifyRefreshToken } =
    tokenGenerator({
      id,
      name,
      email,
      gender,
      birthday,
    });

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();
      const LocalLoginSQL = `UPDATE users SET refresh_token = ? WHERE id = ?`;
      const LocalLoginValue = [refresh_jwt, id];
      await connection.query(LocalLoginSQL, LocalLoginValue);
      await connection.commit();
      connection.release();

      res.cookie('access', access_jwt, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 15,
        path: '/',
      });

      res.cookie('refresh', refresh_jwt, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
      });
      res.status(200).json({
        type: 'success',
        message: '로그인 성공했습니다.',
        name,
        gender,
        birthday,
        email,
      });
    } catch (error: any) {
      await connection.rollback();
      connection.release();
      res.status(400).json({
        message: '로그인에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      code: error?.code,
      errno: error?.errno,
      sqlMessage: error?.sqlMessage,
      sql: error?.sql,
    });
  }
}
