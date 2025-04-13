import { Book } from '@prisma/client';

export interface FindBookByIdPayload {
  id: number;
}

export interface ExistBookPayload extends Pick<RegisterBookPayload, 'isbn'> {}

export interface FindUniqueBook extends Book {
  isbns: string[];
  authors: string[];
  translators: string[];
}

export interface RegisterBookPayload extends Omit<Book, 'id'> {
  authors: string[];
  isbn: string[];
  translators?: string[];
}

export interface CreateBookPayload extends Omit<Book, 'id'> {}

export interface CreateISBNPayload extends Pick<RegisterBookPayload, 'isbn'> {
  bookId: number;
}

export interface CreateAuthorPayload extends Pick<RegisterBookPayload, 'authors'> {
  bookId: number;
}

export interface ProcessTranslatorPayload extends Pick<RegisterBookPayload, 'translators'> {
  bookId: number;
}

export interface ProcessAuthorPayload extends Pick<RegisterBookPayload, 'authors'> {
  bookId: number;
}
