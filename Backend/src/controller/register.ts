import { pool } from '../DB';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUserEmailInfo } from 'types';

interface IRegisterRequestBody {
  email: string;
  name: string;
  gender: string;
  birthday: Date;
  password: string;
}

export default async function (req: Request, res: Response) {
  const { email, name, gender, birthday, password } =
    req.body as IRegisterRequestBody;

  try {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const sqlUsersFromEmail = `SELECT email FROM users WHERE = ?`;
      const sqlUsersFromEmailValue = [email];
      const [rows] = await connection.query<IUserEmailInfo[]>(
        sqlUsersFromEmail,
        sqlUsersFromEmailValue
      );

      if (rows[0] === undefined) {
        return res
          .status(403)
          .json({ message: '해당 아이디가 이미 존재 합니다.' });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = bcrypt.hashSync(password, salt);

      const sqlUserRegister = `INSERT INTO users (email, name, gender, birthday, password) VALUES(?, ?, ?, ?, ?)`;
      const sqlUserRegisterValue = [
        email,
        name,
        gender,
        birthday,
        encryptedPassword,
      ];
      await connection.query(sqlUserRegister, sqlUserRegisterValue);
      await connection.commit();
      res.status(200).json({
        message: '회원가입에 성공 하셨습니다.',
      });

      connection.release();
    } catch (error) {
      await connection.rollback();
      connection.release();
      res.status(400).json({
        message: '회원가입에 실패 하셨습니다.',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'DB에 연결 실패 하셨습니다.',
    });
  }
}
