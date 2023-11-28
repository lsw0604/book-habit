import { RowDataPacket } from 'mysql2';
import { Request } from 'express';

interface IRequest<T> extends Request {
  body: T;
}

// auth.profile.info.update

export type ProfileInfoUpdateType = {
  name?: string;
  age?: number;
  gender: GenderType;
} & RowDataPacket;

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

// auth.local

export type ResponseLoginType = {
  id: number;
  name: string;
  email: string;
  gender: GenderType;
  age: number;
  profile: string;
  provider: ProviderType;
};

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

// comments.detail

export type CommentDetailType = {
  comment_id: number;
  comment: string;
  created_at: Date;
  rating: number;
  title: string;
  name: string;
  profile: string;
  status: CommentStatusType;
} & RowDataPacket;

// comments.like.list

export type CommentLikeListType = {
  users_id: number;
} & RowDataPacket;

// comments.list

export type CommentListType = {
  comment_id: number;
  comment: string;
  created_at: Date;
  rating: number;
  title: string;
  name: string;
  profile: string;
  status: CommentStatusType;
} & RowDataPacket;

// comments.reply.list

export type CommentReplyListType = {
  reply_id: number;
  reply: string;
  created_at: Date;
  users_id: number;
  name: string;
  profile: string;
} & RowDataPacket;

// comments.reply.register

export type CommentReplyRegisterType = {
  reply: string;
};

// myBook.comments.list

export type MyBookCommentsListType = {
  comment_id: number;
  comment: string;
  rating: number;
  status: CommentStatusType;
  comment_is_open: boolean;
  created_at: Date;
  updated_at: Date | null;
} & RowDataPacket;

// myBook.comments.register

export type MyBookCommentsRegisterRequestType = {
  rating: number;
  status: string;
  comment: string;
  comment_is_open: boolean;
  users_books_id: number;
};

export type MyBookCommentsRegisterFindBookType = {
  book_id: number;
} & RowDataPacket;

// myBook.comments.update

export type MyBookCommentsUpdateRequestType = {
  comment: string;
  rating: number;
};

// myBook.history.list

export type MyBookHistoryListType = {
  id: number;
  status: StatusType;
  date: Date;
  page: number | null;
  created_at: Date;
  updated_at: Date | null;
} & RowDataPacket;

// myBook.history.register

export type MyBookHistoryRegisterRequestType = {
  users_books_id: number;
  status: HistoryType;
  date: Date;
};

export type MyBookHistoryRegisterStatusExistType = {
  status: HistoryType;
} & RowDataPacket;

export type MyBookHistoryRegisterHistoryExistType = {
  count: number;
} & RowDataPacket;

// myBook.info

export type MyBookInfoType = {
  thumbnail?: string;
  title: string;
  url: string;
  contents: string;
  publisher: string;
  authors: string;
} & RowDataPacket;

// myBook.list

export type MyBookListCountType = {
  count: number;
} & RowDataPacket;

export type MyBookListType = {
  id: number;
  isbn: string;
  title: string;
  thumbnail?: string;
  status: HistoryType;
  created_at: Date;
} & RowDataPacket;

// myBook.time.range

export type MyBookTimeRangeType = {
  startDate: Date;
  endDate: Date;
} & RowDataPacket;

// access.strategy

export type AccessStrategyType = {
  id: number;
  email: string;
  name: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
  profile: string;
} & RowDataPacket;

// local.strategy

export type LocalStrategyType = {
  id: number;
  email: string;
  name: string;
  password: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
  profile: string;
} & RowDataPacket;

// refresh.strategy

export type RefreshStrategyType = {
  id: number;
  email: string;
  name: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
} & RowDataPacket;

// utils.token

export type TokenGeneratorType = {
  id?: number;
  email?: string;
  name?: string | null;
  kakao_access?: string;
  kakao_refresh?: string;
};

type GenderType = 'male' | 'female';

type ProviderType = 'local' | 'kakao';

type CommentStatusType = '읽는중' | '다읽음' | '읽기전';

type StatusType = '읽기시작함' | '다읽음' | '읽고싶음' | '읽는중';

type HistoryType = Omit<StatusType, '읽고싶음'>;

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
