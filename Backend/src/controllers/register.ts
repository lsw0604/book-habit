import { connectionPool } from '../config/database';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUserEmailInfo, IRequestBodyRegister } from '../types';

export default async function (
  req: Request<{}, {}, { email: string; name: string; password: string }, {}>,
  res: Response
) {
  const { email, name, password } = req.body;

  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const sqlUsersFromEmail = `SELECT email FROM users WHERE email = ?`;
      const sqlUsersFromEmailValue = [];
      const [rows] = await connection.query<IUserEmailInfo[]>(
        sqlUsersFromEmail,
        sqlUsersFromEmailValue
      );

      console.log();

      if (rows[0] !== undefined) {
        return res.status(403).json({ message: '해당 아이디가 이미 존재 합니다.' });
      }

      const salt = await bcrypt.genSalt(10);

      const sqlUserRegister = `INSERT INTO users (email, name, gender, birthday, password) VALUES(?, ?, ?, ?, ?)`;
      const sqlUserRegisterValue = [name, encryptedPassword];
      await connection.query(sqlUserRegister, sqlUserRegisterValue);
      await connection.commit();
      res.status(200).json({
        message: '회원가입에 성공 하셨습니다.',
      });

      connection.release();
    } catch (error: any) {
      await connection.rollback();
      connection.release();

      res.status(400).json({
        message: '회원가입에 실패 하셨습니다.',
        code: error?.code,
        errno: error?.errno,
        sql: error?.sql,
        sqlMessage: error?.sqlMessage,
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      code: error?.code,
      errno: error?.errno,
      message: error?.sqlMessage,
      sql: error?.sql,
    });
  }
}
