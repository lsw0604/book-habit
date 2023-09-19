import { RowDataPacket } from 'mysql2';

export interface IUserAllInfo extends RowDataPacket {
  id?: number;
  email: string;
  name: string;
  password: string;
  gender: GenderType;
  birthday: Date;
  provider: ProviderType;
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
  thumbnail: string;
  company: string;
  price: number;
}

export interface IRankingCount extends RowDataPacket {
  total: number;
}

export interface ISelectFromJWTPayload extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: GenderType;
  provider: ProviderType;
}

export interface ISelectAllFromUsersWhereEmail extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  password: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
}

interface IMyBooksInfo extends RowDataPacket {
  status: '다읽음' | '읽는중' | '읽고싶음';
  start_date: Date | null;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date | null;
  page: number | null;
  rating: number | null;
  isbn: string;
  title: string;
}

export interface IMyBooksResponse extends RowDataPacket {
  books_id: number;
  id: number;
  isbn: string;
  status: string;
  thumbnail: string;
  start_date: Date;
  end_date: Date;
  rating: number;
  page: number;
  created_at: Date;
}

export interface IMyBookInfoProps extends RowDataPacket {
  status: '다읽음' | '읽는중' | '읽고싶음';
  start_date: Date | null;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date | null;
  page: number | null;
  rating: number | null;
}

export type ResponseLoginType = {
  id: number;
  name: string;
  email: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
};

export type MyBookListCountResponseType = {
  count: number;
} & RowDataPacket;

export type MyBookListResponseType = {
  id: number;
  isbn: string;
  title: string;
  thumbnail?: string;
  status: '다읽음' | '읽는중' | '읽고싶음';
  created_at: Date;
} & RowDataPacket;

export type MyBookExistResponseType = {
  count: number;
} & RowDataPacket;

export type MyBookHistoryType = {
  id: number;
  status: '읽기시작함' | '다읽음' | '읽고싶음' | '읽는중';
  date: Date;
  page: number | null;
  created_at: Date;
  updated_at: Date | null;
} & RowDataPacket;

export type MyBookRatingType = {
  status: '읽기전' | '다읽음' | '읽는중';
  created_at: Date;
  rating: number;
} & RowDataPacket;

export type MyBookInfoType = {
  thumbnail?: string;
  title: string;
  url: string;
  contents: string;
  publisher: string;
  authors: string;
} & RowDataPacket;

export type MyBookRatingExistType = {
  status: '읽기전' | '다읽음' | '읽는중';
} & RowDataPacket;

export type MyBookCommentsListType = {
  comment_id: number;
  comment: string;
  rating: number;
  status: '읽기전' | '다읽음' | '읽는중';
  comment_is_open: boolean;
  created_at: Date;
  updated_at: Date | null;
} & RowDataPacket;

type GenderType = 'male' | 'female';

type ProviderType = 'local' | 'kakao';

declare module 'express-session' {
  interface SessionData {
    kakaoAccessToken: string;
  }
}

declare global {
  namespace Express {
    interface User {
      id?: number;
      email?: string;
      name?: string;
      age?: number;
      gender?: GenderType;
      provider?: ProviderType;
      access_jwt?: string;
    }
  }
}
