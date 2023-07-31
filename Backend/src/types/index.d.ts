import { RowDataPacket } from 'mysql2';

export interface IUserAllInfo extends RowDataPacket {
  id?: number;
  email: string;
  name: string;
  password: string;
  gender: 'female' | 'male';
  birthday: Date;
  provider: 'local' | 'kakao';
  refresh_token: string;
  created_at: Date;
}

export interface IUserEmailInfo extends RowDataPacket {
  id?: number;
  email: string;
}

export interface IRequestBodyRegister {
  email: string;
  name: string;
  gender: string;
  birthday: Date;
  password: string;
}

export interface IRanking extends RowDataPacket {
  title: string;
  author: string;
  ranking: number;
  isbn: string;
  image: string;
  company: string;
  price: number;
}

export interface IRankingCount extends RowDataPacket {
  total: number;
}

/**
 * * SQL SELECT id, name, gender, age, email FROM users WHERE id = ?
 */
export interface ISelectFromJWTPayload extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
}

/**
 *  * SQL SELECT * FROM users WHERE email = ?;
 *  * PAYLOAD { id: number, email: string, name: string, age: number, gender: 'female' | 'male' }
 */

export interface ISelectAllFromUsersWhereEmail extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  password: string;
  gender: 'male' | 'female';
  age: number;
}
