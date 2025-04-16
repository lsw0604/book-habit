import type {
  ExistBookISBNPayload,
  FindBookByIdPayload,
  ProcessAuthorPayload,
  RegisterBookPayload,
  ProcessTranslatorPayload,
  FormattedBook,
  BookWithRelations,
} from './interface/book.interface';

import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { ISBNService } from './isbn.service';
import { AuthorService } from './author.service';
import { TranslatorService } from './translator.service';

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

  /**
   * * ID로 책을 찾습니다. (관계 정보 포함)
   *
   * @param {FindBookByIdPayload} payload - 찾을 책 정보 (id)
   * @returns {Promise<FormattedBook>} 조회한 책 객체 (포맷팅됨)
   * @throws {NotFoundException} 책을 찾을 수 없는 경우
   */
  public async findBookById(payload: FindBookByIdPayload): Promise<FormattedBook> {
    const { id } = payload;
    this.logger.debug(`Book ID : ${id}, 조회를 시작합니다.`);

    // getBookWithRelations 메서드 재사용
    const book = await this.getBookWithRelations(this.prismaService, id);

    if (!book) {
      this.logger.warn(`Book ID : ${id}를 찾을 수 없습니다.`);
      throw new NotFoundException(`Book ID : ${id}를 찾을 수 없습니다.`);
    }

    this.logger.debug('책 조회에 성공했습니다.');
    return this.formatBookRelations(book);
  }

  /**
   * * 새 책을 등록하거나 이미 존재하는 책을 반환합니다.
   * @description ISBN을 기준으로 이미 존재하는 책인지 확인 후 처리합니다.
   *
   * @param {RegisterBookPayload} payload - 등록할 책 정보
   * @returns {Promise<FormattedBook>} 등록되거나 조회된 책 정보 (포맷팅됨)
   */
  public async registerBook(payload: RegisterBookPayload): Promise<FormattedBook> {
    const { isbn, authors, translators, ...bookData } = payload;
    this.logger.debug(`책 등록 시작. ISBN: ${isbn.join(', ')}`);

    // ISBN으로 이미 존재하는 책인지 확인
    const existBook = await this.existBookISBN({ isbn });
    if (existBook) {
      this.logger.debug(`이미 존재하는 책을 찾았습니다. Book ID: ${existBook.id}`);
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
      const bookId = createdBook.id;
      this.logger.debug(`책 엔티티 생성 완료. Book ID: ${bookId}`);

      // 2. ISBN 연결 (ISBNService 사용)
      await this.isbnService.createISBNs(prisma, isbn, bookId);
      this.logger.debug(`ISBN 연결 완료. Book ID: ${bookId}`);

      // 3. 저자 연결 (AuthorService 사용 및 조인 테이블 생성)
      await this.processAuthors(prisma, { bookId, authors });
      this.logger.debug(`저자 연결 완료. Book ID: ${bookId}`);

      // 4. 번역가 연결 (TranslatorService 사용 및 조인 테이블 생성)
      // translators가 undefined 또는 빈 배열일 수 있음을 고려
      await this.processTranslators(prisma, { bookId, translators: translators || [] });
      this.logger.debug(`번역가 연결 완료. Book ID: ${bookId}`);

      // 5. 최종적으로 생성/연결된 모든 정보를 포함하여 책 조회
      const fullBookData = await this.getBookWithRelations(prisma, bookId);
      if (!fullBookData) {
        // 이론적으로 여기까지 오면 안되지만 방어 코드
        throw new Error(`Book ID ${bookId} 생성 후 조회를 실패했습니다.`);
      }
      this.logger.debug(`새 책 등록 및 관계 연결 완료. Book ID: ${bookId}`);

      // 6. 결과 포맷팅 후 반환
      return this.formatBookRelations(fullBookData);
    });
  }

  /**
   * ISBN 목록을 기반으로 이미 존재하는 책인지 확인하고, 존재하면 포맷팅된 정보를 반환합니다.
   * (ISBNService.findBookByISBN 활용하도록 리팩토링됨)
   *
   * @param {ExistBookISBNPayload} payload - 확인할 ISBN 목록 정보
   * @returns {Promise<FormattedBook | null>} 존재하는 경우 포맷팅된 책 정보, 없으면 null
   * @throws {NotFoundException} ISBN으로 찾은 책 ID가 존재하지만, 해당 ID로 상세 정보 조회 시 찾을 수 없는 경우 (데이터 불일치 등 예외적 상황). 이 예외는 전역 필터에서 처리됩니다.
   * @throws {Error} findBookById 또는 findBookByISBN에서 예상치 못한 다른 오류 발생 시. 이 예외는 전역 필터에서 처리됩니다.
   */
  public async existBookISBN(payload: ExistBookISBNPayload): Promise<FormattedBook | null> {
    const { isbn } = payload;
    this.logger.debug(`ISBN ${isbn.join(', ')}으로 기존 책 확인 시작`);

    // 1. ISBNService를 통해 해당 ISBN을 가진 책이 있는지 확인
    // findBookByISBN 내부에서 발생하는 오류는 전역 필터에서 처리됨
    const existingBookMinimal = await this.isbnService.findBookByISBN(isbn);

    // 2. 책이 존재하지 않으면 null 반환
    if (!existingBookMinimal) {
      this.logger.debug(`ISBN ${isbn.join(', ')}에 해당하는 책 없음`);
      return null;
    }

    this.logger.debug(
      `ISBN으로 기존 책 확인됨. Book ID: ${existingBookMinimal.id}. 전체 정보 조회 시작.`,
    );

    // 3. 책이 존재하면, 해당 ID로 전체 정보(관계 포함)를 다시 조회하여 포맷팅 후 반환
    // findBookById는 내부적으로 NotFoundException을 던질 수 있으며, 이는 전역 필터에서 처리됨.
    // 여기서 발생하는 다른 오류들도 전역 필터에서 처리됨.
    const fullFormattedBook = await this.findBookById({ id: existingBookMinimal.id });

    // findBookById가 성공적으로 완료되면 fullFormattedBook은 null이 될 수 없음
    // (findBookById 내부에서 null이면 NotFoundException을 던지기 때문)
    return fullFormattedBook;
  }

  /**
   * 책과 관련된 모든 정보(ISBN, 저자, 번역가)를 함께 조회합니다.
   * @description - 이 메서드는 트랜잭션 내부 또는 외부에서 호출될 수 있습니다.
   * - 트랜잭션의 일부로 실행되어야 하는 경우(예: 책 등록 후 최종 데이터 조회 시)에는
   * 반드시 해당 트랜잭션 클라이언트(`Prisma.TransactionClient`)를 `prisma` 인자로 전달해야 합니다.
   * - 이렇게 함으로써 조회 작업이 진행 중인 트랜잭션의 컨텍스트 내에서 이루어져 데이터의 일관성과 원자성을 보장받을 수 있습니다.
   * - 트랜잭션 외부에서 단순 조회를 위해 호출될 경우에는 일반 `PrismaService` 인스턴스를 전달할 수 있습니다.
   *
   * @param {Prisma.TransactionClient | PrismaService} prisma - Prisma 클라이언트
   * @param {number} bookId - 책 ID
   * @returns {Promise<BookWithRelations | null>} 관계 정보가 포함된 책 객체 또는 null
   * @private
   */
  private async getBookWithRelations(
    prisma: Prisma.TransactionClient | PrismaService,
    bookId: number,
  ): Promise<BookWithRelations | null> {
    this.logger.debug(`관계 정보 포함하여 책 조회 시작. 책 ID: ${bookId}`);
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
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
      },
    });
    this.logger.debug(
      `관계 정보 포함 책 조회 완료. 책 ID: ${bookId}, 결과: ${book ? '성공' : '실패'}`,
    );
    return book as BookWithRelations | null;
  }

  /**
   * 책 객체의 관계 데이터(ISBN, 저자, 번역자)를 API 응답에 적합한 형태로 포맷팅합니다.
   *
   * @param {BookWithRelations} book - 포맷팅할 책 객체 (Prisma include 결과)
   * @returns {FormattedBook} 포맷팅된 책 객체
   * @private
   */
  private formatBookRelations(book: BookWithRelations): FormattedBook {
    return {
      ...book, // Book의 기본 속성들 복사
      isbns: book.isbns?.map(({ code }) => code) || [], // isbns가 null/undefined일 수 있음
      authors: book.authors?.map(({ author }) => author.name) || [], // authors가 null/undefined일 수 있음
      translators: book.translators?.map(({ translator }) => translator.name) || [], // translators가 null/undefined일 수 있음
    };
  }

  /**
   * 책에 저자 정보를 연결합니다. (AuthorService 사용 및 createMany 적용)
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {ProcessAuthorPayload} payload - 저자 처리에 필요한 정보 (bookId, authors)
   * @returns {Promise<void>}
   * @private
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
   * 책에 번역자 정보를 연결합니다. (TranslatorService 사용 및 createMany 적용)
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
