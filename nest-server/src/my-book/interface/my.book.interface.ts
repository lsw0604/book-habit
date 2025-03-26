import { MyBookStatus } from '@prisma/client';

export interface CreateMyBookPayload {
  userId: number;
  title: string;
  publisher?: string;
  price?: number;
  sale_price?: number;
  thumbnail?: string;
  contents?: string;
  url?: string;
  datetime: string;
  status?: string;
  authors: string[];
  isbn: string[];
  translators?: string[];
}

export interface GetMyBookDetailPayload {
  id: number;
  userId: number;
}

export interface GetMyBookListPayload {
  userId: number;
  status: MyBookStatus | 'ALL';
  pageNumber: number;
  orderBy: 'desc' | 'asc';
}

export interface GetMyBookByIdPayload {
  id: number;
}

export interface UpdateMyBookPayload {
  myBookId: number;
  userId: number;
  rating?: number;
  status?: MyBookStatus;
}

export interface DeleteMyBookPayload {
  myBookId: number;
  userId: number;
}

export interface ValidateMyBookPayload {
  id: number;
  userId: number;
}

export interface DuplicateMyBookPayload {
  bookId: number;
  userId: number;
}
