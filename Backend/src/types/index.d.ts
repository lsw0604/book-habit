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

export interface ICrawledId extends RowDataPacket {
  id: number;
}

export interface IBestSellerList extends RowDataPacket {
  title: string;
  author: string;
  book_rank: number;
  img: string;
  company: string;
  published_date: Date;
}

export interface ICountResult extends RowDataPacket {
  total: number;
}
