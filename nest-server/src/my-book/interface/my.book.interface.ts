import { MyBookStatus, Prisma } from '@prisma/client';
import { PaginationMeta } from 'src/common/utils/pagination.util';
import { RegisterBookPayload } from './book.interface';

export interface FormattedMyBook {
  myBookId: number;
  title: string;
  thumbnail: string;
  rating: number;
  status: MyBookStatus;
}

export interface FormattedMyBooks {
  books: FormattedMyBook[];
  meta: PaginationMeta;
}

export interface FormattedMyBookDetail {
  id: number;
  status: MyBookStatus;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  book: {
    url: string;
    title: string;
    thumbnail: string;
    contents: string;
    publisher: string;
    datetime: Date;
    authors: string[];
    translators: string[];
  };
}

export type MyBookWithRelations = Prisma.MyBookGetPayload<{
  include: {
    book: {
      include: {
        authors: {
          include: {
            author: true;
          };
        };
        translators: {
          include: {
            translator: true;
          };
        };
      };
    };
  };
}>;

export interface CreateMyBookPayload extends RegisterBookPayload {
  userId: number;
}

export interface GetMyBookPayload {
  id: number;
  userId: number;
}

export interface GetMyBooksPayload {
  userId: number;
  status: MyBookStatus | 'ALL';
  pageNumber: number;
  orderBy: 'desc' | 'asc';
}

export interface UpdateMyBookPayload {
  id: number;
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
