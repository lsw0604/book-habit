import { Book } from '@prisma/client';

export interface FindBookByIdPayload {
  id: number;
}

export interface FindUniqueBook extends Book {
  isbns: string[];
  authors: string[];
  translators: string[];
}

export interface RegisterBookPayload {
  title: string;
  publisher?: string;
  price?: string;
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
