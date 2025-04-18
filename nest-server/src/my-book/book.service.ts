import type {
  FormattedBook,
  BookWithRelations,
  RegisterBookPayload,
  ProcessAuthorPayload,
  ProcessTranslatorPayload,
} from './interface/book.interface';

import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { normalizedISBN } from 'src/common/utils/isbn.util';
import { ISBNService } from './isbn.service';
import { AuthorService } from './author.service';
import { PrismaService } from '../prisma/prisma.service';
import { TranslatorService } from './translator.service';
import { NotFoundBookException } from './exceptions';

@Injectable()
export class BookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
    private readonly isbnService: ISBNService,
    private readonly authorService: AuthorService,
    private readonly translatorService: TranslatorService,
  ) {
    this.logger.setContext(BookService.name);
  }

  private readonly BOOK_INCLUDE_RELATIONS = {
    isbns: true,
    authors: {
      include: {
        author: true,
      },
    },
    translators: {
      include: {
        translator: true,
      },
    },
  };

  /**
   * * ID로 책을 찾습니다. (관계 정보 포함)
   * * API 응답에 적합한 형태로 포맷팅한 후 반환 합니다.
   * @param {number} id - 찾을 책 정보 (id)
   * @returns {Promise<FormattedBook>} - 조회한 책 객체 (포맷팅됨)
   * @throws {NotFoundBookException} - 책을 찾을 수 없는 경우
   */
  public async getBookById(id: number): Promise<FormattedBook> {
    this.logger.debug(`책 ID : ${id}, 조회를 시작합니다.`);

    const book = await this.findBookById(id);

    if (!book) {
      this.logger.warn(`책 ID : ${id}를 찾을 수 없습니다.`);
      throw new NotFoundBookException(id);
    } else {
      this.logger.debug('책 조회에 성공했습니다.');
      return book;
    }
  }

  /**
   * * ID로 책을 찾습니다. (관계 정보 포함)
   * * 책의 존재 여부 확인용 메서드입니다.
   * @param {number} id - 찾을 책 정보 (id)
   * @param {Prisma.TransactionClient} [prisma] - Prisma 클라이언트 (트랜잭션 클라이언트)
   * @description - 트랜잭션 클라이언트가 제공되지 않으면 기본 PrismaService를 사용합니다.
   * @returns {Promise<FormattedBook | null>} 조회한 책 객체 (포맷팅됨)
   */
  public async findBookById(
    id: number,
    prisma?: Prisma.TransactionClient,
  ): Promise<FormattedBook | null> {
    const prismaClient = prisma || this.prismaService;
    if (!id) return null;

    const book: BookWithRelations | null = await prismaClient.book.findUnique({
      where: { id },
      include: this.BOOK_INCLUDE_RELATIONS,
    });
    return book ? this.formatBookRelations(book) : null;
  }

  /**
   * * ISBN으로 책을 찾습니다. (관계 정보 포함)
   * * API응답에 적합한 형태로 포맷팅한 후 반환 합니다.
   * @param {string[]} isbn = 찾을 책 정보 (isbn)
   * @returns {Promise<FormattedBook>} - 조회한 책 객체 (포맷팅됨)
   * @throws {NotFoundBookException} - 책을 찾을 수 없는 경우
   */
  public async getBookByISBN(isbn: string[]) {
    this.logger.debug(`ISBN (${isbn.join(', ')})으로 책 조회를 시작합니다.`);
    const book = await this.findBookByISBN(isbn);

    if (!book) {
      this.logger.warn(`ISBN (${isbn.join(', ')})으로 책을 찾을 수 없습니다.`);
      throw new NotFoundBookException(isbn);
    } else {
      this.logger.debug(`ISBN (${isbn.join(', ')})으로 책 조회를 성공했습니다.`);
      return book;
    }
  }

  /**
   * * ISBN으로 책을 찾습니다. (관계 정보 포함)
   * * 책의 존재 여부 확인용 메서드입니다.
   * @param {string[]} isbn - 찾을 책 정보 (isbn)
   * @param {Prisma.TransactionClient} [prisma] - Prisma 클라이언트 (트랜잭션 클라이언트)
   * @description - 트랜잭션 클라이언트가 제공되지 않으면 기본 PrismaService를 사용합니다.
   * @returns {Promise<FormattedBook | null>} 조회한 책 객체 (포맷팅됨)
   */
  public async findBookByISBN(
    isbn: string[],
    prisma?: Prisma.TransactionClient,
  ): Promise<FormattedBook | null> {
    if (isbn.length === 0) return null;
    const prismaClient = prisma || this.prismaService;
    const normalizedCode: string[] = isbn.map((code) => normalizedISBN(code));
    const book: BookWithRelations | null = await prismaClient.book.findFirst({
      where: {
        isbns: {
          some: {
            code: {
              in: normalizedCode,
            },
          },
        },
      },
      include: this.BOOK_INCLUDE_RELATIONS,
    });

    return book ? this.formatBookRelations(book) : null;
  }

  /**
   * * 새 책을 등록하거나 이미 존재하는 책을 반환합니다.
   * @description ISBN을 기준으로 이미 존재하는 책인지 확인 후 처리합니다.
   * @param {RegisterBookPayload} payload - 등록할 책 정보
   * @returns {Promise<FormattedBook>} 등록되거나 조회된 책 정보 (포맷팅됨)
   */
  public async registerBook(payload: RegisterBookPayload): Promise<FormattedBook> {
    const { isbns, authors, translators, ...bookData } = payload;
    this.logger.debug(`책 등록 시작. ISBN : ${isbns.join(', ')}`);

    // ISBN으로 이미 존재하는 책인지 확인
    const existBook = await this.findBookByISBN(isbns);

    if (existBook) {
      this.logger.debug(`이미 존재하는 책을 찾았습니다. Book ID : ${existBook.id}`);
      return existBook; // existBook은 이미 FormattedBook 타입이어야 함
    }

    // 새 책 등록 (트랜잭션 사용)
    this.logger.debug('찾고자 하는 책이 존재하지 않아 새로 등록합니다.');
    return this.prismaService.$transaction(async (prisma) => {
      // 1. Book 엔티티 생성 (관계 제외)
      const createdBook = await prisma.book.create({
        data: {
          ...bookData,
        },
      });
      const bookId: number = createdBook.id;
      this.logger.debug(`책 엔티티 생성 완료. Book ID: ${bookId}`);

      // 2. ISBN 연결 (ISBNService 사용)
      await this.isbnService.createISBNs(prisma, { bookId, isbns });
      this.logger.debug(`ISBN 연결 완료. Book ID: ${bookId}`);

      // 3. 저자 연결 (AuthorService 사용 및 조인 테이블 생성)
      await this.processAuthors(prisma, { bookId, authors });
      this.logger.debug(`저자 연결 완료. Book ID: ${bookId}`);

      // 4. 번역가 연결 (TranslatorService 사용 및 조인 테이블 생성)
      await this.processTranslators(prisma, { bookId, translators: translators || [] });
      this.logger.debug(`번역가 연결 완료. Book ID: ${bookId}`);

      // 5. 최종적으로 생성/연결된 모든 정보를 포함하여 책 조회
      const registeredBook: FormattedBook | null = await this.findBookById(bookId, prisma);

      if (!registeredBook) throw new Error(`Book ID ${bookId} 생성 후 조회를 실패했습니다.`);

      this.logger.debug(`새 책 등록 및 관계 연결 완료. Book ID: ${bookId}`);

      // 6. 결과 포맷팅 후 반환
      return registeredBook;
    });
  }

  /**
   * * 책 객체의 관계 데이터(ISBN, 저자, 번역자)를 API 응답에 적합한 형태로 포맷팅합니다.
   * @private
   * @param {BookWithRelations} book - 포맷팅할 책 객체 (Prisma include 결과)
   * @returns {FormattedBook} 포맷팅된 책 객체
   */
  private formatBookRelations(book: BookWithRelations): FormattedBook {
    return {
      ...book, // Book의 기본 속성들 복사
      isbns: book.isbns.map(({ code }) => code) || [],
      authors: book.authors.map(({ author }) => author.name) || [],
      translators: book.translators.map(({ translator }) => translator.name) || [],
    };
  }

  /**
   * * 책에 저자 정보를 연결합니다. (AuthorService 사용 및 createMany 적용)
   * @private
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {ProcessAuthorPayload} payload - 저자 처리에 필요한 정보 (bookId, authors)
   * @returns {Promise<void>}
   */
  private async processAuthors(
    prisma: Prisma.TransactionClient,
    payload: ProcessAuthorPayload,
  ): Promise<void> {
    const { authors, bookId } = payload;
    this.logger.debug(`저자 연결 처리 시작. 책 ID: ${bookId}, 저자 수: ${authors?.length || 0}`);

    if (!authors || authors.length === 0) {
      this.logger.debug(`연결할 저자 없음. 책 ID: ${bookId}`);
      return; // 저자 목록이 없으면 종료
    }

    const authorLinkData: Prisma.BookAuthorCreateManyInput[] = [];

    for (const name of authors) {
      // AuthorService의 findOrCreateAuthor 메서드 사용
      const author = await this.authorService.findOrCreateAuthor(prisma, name);
      this.logger.debug(`저자 확인/생성: ${name} (ID: ${author.id})`);
      authorLinkData.push({ bookId, authorId: author.id });
    }

    // BookAuthor 조인 테이블에 createMany를 사용하여 벌크 삽입
    if (authorLinkData.length > 0) {
      await prisma.bookAuthor.createMany({
        data: authorLinkData,
        skipDuplicates: true, // 혹시 모를 중복 연결 시도 시 에러 방지
      });
      this.logger.debug(`${authorLinkData.length}개의 저자 연결 생성 완료. 책 ID: ${bookId}`);
    }
  }

  /**
   * * 책에 번역자 정보를 연결합니다. (TranslatorService 사용 및 createMany 적용)
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {ProcessTranslatorPayload} payload - 번역자 처리에 필요한 정보 (bookId, translators)
   * @returns {Promise<void>}
   * @private
   */
  private async processTranslators(
    prisma: Prisma.TransactionClient,
    payload: ProcessTranslatorPayload,
  ): Promise<void> {
    const { translators, bookId } = payload; // translators는 optional일 수 있음
    this.logger.debug(
      `번역가 연결 처리 시작. 책 ID: ${bookId}, 번역가 수: ${translators?.length || 0}`,
    );

    if (!translators || translators.length === 0) {
      this.logger.debug(`연결할 번역가 없음. 책 ID: ${bookId}`);
      return; // 번역가 목록이 없으면 종료
    }

    const translatorLinkData: Prisma.BookTranslatorCreateManyInput[] = [];

    for (const name of translators) {
      // TranslatorService의 findOrCreateTranslator 메서드 사용
      const translator = await this.translatorService.findOrCreateTranslator(prisma, name);
      this.logger.debug(`번역가 확인/생성: ${name} (ID: ${translator.id})`);
      translatorLinkData.push({ bookId, translatorId: translator.id });
    }

    // BookTranslator 조인 테이블에 createMany를 사용하여 벌크 삽입
    if (translatorLinkData.length > 0) {
      await prisma.bookTranslator.createMany({
        data: translatorLinkData,
        skipDuplicates: true, // 중복 연결 시도 시 에러 방지
      });
      this.logger.debug(`${translatorLinkData.length}개의 번역가 연결 생성 완료. 책 ID: ${bookId}`);
    }
  }
}
