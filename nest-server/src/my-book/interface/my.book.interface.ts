import { MyBookStatus } from '@prisma/client';
import { RegisterBookPayload } from './book.interface';

export interface CreateMyBookPayload extends RegisterBookPayload {
  userId: number;
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
