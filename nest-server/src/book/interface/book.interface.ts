import { Author, Book, BookAuthor, BookTranslator, ISBN, Translator } from '@prisma/client';

/**
 * * Book 엔티티 생성 시 필요한 핵심 필드를 정의하는 인터페이스
 */
export interface CreateBookPayload {
  title: string;
  publisher?: string | null;
  price?: number | null;
  sale_price?: number | null;
  thumbnail?: string | null;
  contents?: string | null;
  url?: string | null;
  datetime: Date; // Date에서 string으로 변경
  status?: string | null;
}

/**
 * * 책 등록 시 Service 계층에서 사용하는 전체 Payload 인터페이스
 */
export interface RegisterBookPayload extends CreateBookPayload {
  authors: string[];
  isbns: string[];
  translators?: string[];
}

/**
 * * 저자 정보 처리(연결)를 위한 내부 Payload 인터페이스
 */
export interface ProcessAuthorPayload {
  bookId: number;
  authors: string[];
}

/**
 * * 번역가 정보 처리(연결)를 위한 내부 Payload 인터페이스
 */
export interface ProcessTranslatorPayload {
  bookId: number;
  translators: string[];
}

/**
 * * Prisma 조회 시 관계(Relation)를 포함한 Book 데이터 구조 인터페이스
 * * (Service 내부에서 사용되며, Prisma의 include 결과와 일치해야 함)
 */
export interface BookWithRelations extends Book {
  isbns: ISBN[];
  authors: (BookAuthor & {
    author: Author;
  })[];
  translators: (BookTranslator & {
    translator: Translator;
  })[];
}

/**
 * * 최종적으로 API 등에서 반환될 포맷팅된 Book 데이터 구조 인터페이스
 * * (관계 정보가 단순 문자열 배열 등으로 변환됨)
 */
export interface FormattedBook extends Book {
  authors: string[];
  isbns: string[];
  translators: string[];
}
