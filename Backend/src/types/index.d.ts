import { RowDataPacket } from 'mysql2';
import { Request } from 'express';

interface IRequest<T> extends Request {
  body: T;
}

// auth.kakao.callback

export type KakaoCallbackKakaoIdExistType = {
  id: number;
  name: string;
  gender: GenderType;
  age: number;
  email: string;
  profile?: string;
  provider: ProviderType;
} & RowDataPacket;

// auth.kakao.update

export type KakaoRegisterKakaoUserInfoType = {
  id: number;
  email: string;
  name: string;
  gender: GenderType;
  provider: ProviderType;
  profile: string;
  age: number;
} & RowDataPacket;

export interface IKakaoRegisterRequest {
  name: string;
  gender: GenderType;
  age: number;
}

// auth.like.list

export type AuthLikeListType = {
  like_id: number;
  comment_status: CommentStatusType;
  comment_id: number;
  title: string;
  profile: string;
  name: string;
} & RowDataPacket;

export type AuthLikeListCountType = {
  count: number;
} & RowDataPacket;

// auth.register

export interface IAuthLocalRegisterRequest {
  email: string;
  name: string;
  password: string;
  gender: GenderType;
  age: number;
}

export type AuthLocalRegisterEmailCheckType = {
  email?: string;
} & RowDataPacket;

// auth.reply.list

export type AuthReplyListType = {
  like_id: number;
  status: '읽는중' | '다읽음' | '읽기전';
  comment_id: number;
  title: string;
  profile: string;
  name: string;
} & RowDataPacket;

export type AuthReplyListCountType = {
  count: number;
} & RowDataPacket;

// book.exist

export type MyBookExistCountType = {
  count: number;
} & RowDataPacket;

export type BookExistType = {
  isbn: string;
  id: number;
} & RowDataPacket;

// book.*

export type MyBookRegisterRequest = {
  authors: string;
  publisher: string;
  thumbnail: string;
  isbn: string;
  price: number;
  status: string;
  title: string;
  url: string;
  contents: string;
};

export type MyBookReadRegisterRequest = MyBookRegisterRequest & {
  startDate: string;
  endDate: string;
  users_books_id?: number;
};

export type MyBookReadingRegisterRequest = MyBookRegisterRequest & {
  startDate: string;
  users_books_id?: number;
};

export type MyBOokReadToRegisterRequest = MyBookRegisterRequest & {
  users_books_id?: number;
};

// comment.detail

export interface IRequestBodyRegister {
  email: string;
  name: string;
  gender: string;
  birthday: Date;
  password: string;
}

export type ResponseLoginType = {
  id: number;
  name: string;
  email: string;
  gender: GenderType;
  age: number;
  profile: string;
  provider: ProviderType;
};

type GenderType = 'male' | 'female';

type ProviderType = 'local' | 'kakao';

type CommentStatusType = '읽는중' | '다읽음' | '읽기전';

type StatusType = '읽기시작함' | '다읽음' | '읽고싶음' | '읽는중';

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
      profile?: string;
    }
  }
}
