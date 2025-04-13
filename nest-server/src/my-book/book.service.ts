import type {
  CreateISBNPayload,
  CreateBookPayload,
  FindBookByIdPayload,
  FindUniqueBook,
  ProcessAuthorPayload,
  ProcessTranslatorPayload,
  RegisterBookPayload,
} from './interface/book.interface';

import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(BookService.name);
  }

  /**
   * ID로 책을 찾습니다.
   *
   * @param {FindBookByIdPayload} payload - 찾을 책 정보
   * @param {number} payload.id - 찾을 책 ID
   * @returns {Promise<FindUniqueBook>} 조회한 책 객체
   * @throws {NotFoundException} 책을 찾을 수 없는 경우
   */
  public async findBookById(payload: FindBookByIdPayload): Promise<FindUniqueBook> {
    const { id } = payload;
    this.logger.debug(`Book ID : ${id}, 조회를 시작합니다.`);

    const book = await this.prismaService.book.findUnique({
      where: { id },
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

    if (!book) {
      this.logger.warn(`Book ID : ${id}를 찾을 수 없습니다.`);
      throw new NotFoundException(`Book ID : ${id}를 찾을 수 없습니다.`);
    }

    this.logger.debug('책 조회에 성공했습니다.');
    return this.formatBookRelations(book);
  }

  /**
   * 새 책을 등록하거나 이미 존재하는 책을 반환합니다.
   * ISBN을 기준으로 이미 존재하는 책인지 확인 후 처리합니다.
   *
   * @param {RegisterBookPayload} payload - 등록할 책 정보
   * @param {string[]} payload.isbn - 책의 ISBN 목록
   * @param {string[]} payload.authors - 책의 저자 목록
   * @param {string[]} payload.translators - 책의 번역자 목록
   * @returns {Promise<FindUniqueBook>} 등록되거나 조회된 책 정보
   */
  public async registerBook(payload: RegisterBookPayload): Promise<FindUniqueBook> {
    const { isbn, authors, translators } = payload;
    this.logger.debug(`책 등록 시작. ISBN: ${isbn.join(', ')}`);

    try {
      // ISBN으로 이미 존재하는 책인지 확인
      const existBook = await this.prismaService.book.findFirst({
        where: {
          isbns: {
            some: {
              code: {
                in: isbn,
              },
            },
          },
        },
        include: {
          isbns: true,
          translators: {
            select: {
              translator: true,
            },
          },
          authors: {
            select: {
              author: true,
            },
          },
        },
      });

      // 이미 존재하는 책이면 해당 책 정보 반환
      if (existBook) {
        this.logger.debug(`이미 존재하는 책을 찾았습니다. Book ID: ${existBook.id}`);
        return this.formatBookRelations(existBook);
      }

      // 새 책 등록
      this.logger.debug('기존 책이 존재하지 않아 새로 등록합니다.');
      return this.prismaService.$transaction(async (prisma) => {
        const createBook = await this.createBook(prisma, payload);
        const bookId = createBook.id;

        await this.createISBN(prisma, { bookId, isbn });
        await this.processAuthor(prisma, { bookId, authors });
        await this.processTranslator(prisma, { bookId, translators });

        const createdBook = await this.getBookWithRelations(prisma, bookId);
        this.logger.debug(`새 책 등록 완료. Book ID: ${bookId}`);

        return this.formatBookRelations(createdBook);
      });
    } catch (error) {
      this.logger.error(`책 등록 중 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 책 객체의 관계 데이터(ISBN, 저자, 번역자)를 포맷팅합니다.
   *
   * @param {any} book - 포맷팅할 책 객체
   * @returns {FindUniqueBook} 포맷팅된 책 객체
   * @private
   */
  private formatBookRelations(book: any): FindUniqueBook {
    return {
      ...book,
      isbns: book.isbns.map(({ code }) => code),
      translators: book.translators.map(({ translator: { name } }) => name),
      authors: book.authors.map(({ author: { name } }) => name),
    };
  }

  /**
   * 새 책을 데이터베이스에 생성합니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {CreateBookPayload} payload - 생성할 책 정보
   * @returns {Promise<any>} 생성된 책 객체
   * @private
   */
  private async createBook(prisma: Prisma.TransactionClient, payload: CreateBookPayload) {
    this.logger.debug('책 생성 시작');
    const createBook = await prisma.book.create({
      data: {
        ...payload,
      },
    });
    this.logger.debug(`책 생성 완료 ID : ${createBook.id}`);

    return createBook;
  }

  /**
   * 책에 대한 ISBN 정보를 데이터베이스에 생성합니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {CreateISBNPayload} payload - 생성할 ISBN 정보
   * @param {number} payload.bookId - 책 ID
   * @param {string[]} payload.isbn - ISBN 코드 배열
   * @returns {Promise<any>} 생성 결과
   * @private
   */
  private async createISBN(prisma: Prisma.TransactionClient, payload: CreateISBNPayload) {
    const { bookId, isbn } = payload;

    this.logger.debug(`ISBN 생성 시작. 책 ID: ${bookId}, ISBN 개수: ${isbn.length}`);
    const ISBNInputData = isbn.map((code) => ({
      code,
      bookId,
    }));

    const createISBN = await prisma.iSBN.createMany({
      data: ISBNInputData,
    });

    this.logger.debug(`ISBN ${createISBN.count}개 생성하는데 성공했습니다.`);
    return createISBN;
  }

  /**
   * 저자 정보를 생성합니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {string} name - 저자 이름
   * @returns {Promise<any>} 생성된 저자 정보
   * @private
   */
  private createAuthor(prisma: Prisma.TransactionClient, name: string) {
    this.logger.debug(`저자 생성: ${name}`);
    return prisma.author.create({
      data: { name },
    });
  }

  /**
   * 저자 이름으로 저자 정보를 찾습니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {string} name - 저자 이름
   * @returns {Promise<any>} 찾은 저자 정보
   * @private
   */
  private findAuthor(prisma: Prisma.TransactionClient, name: string) {
    return prisma.author.findFirst({ where: { name } });
  }

  /**
   * 책에 저자 정보를 연결합니다. 존재하지 않는 저자는 새로 생성합니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {ProcessAuthorPayload} payload - 저자 처리에 필요한 정보
   * @param {number} payload.bookId - 책 ID
   * @param {string[]} payload.authors - 저자 이름 배열
   * @returns {Promise<void>}
   * @private
   */
  private async processAuthor(prisma: Prisma.TransactionClient, payload: ProcessAuthorPayload) {
    const { authors, bookId } = payload;
    this.logger.debug(`저자 처리 시작. 책 ID: ${bookId}, 저자 수: ${authors.length}`);

    for (const name of authors) {
      let author = await this.findAuthor(prisma, name);

      if (!author) {
        this.logger.debug(`새 저자 생성: ${name}`);
        author = await this.createAuthor(prisma, name);
      } else {
        this.logger.debug(`기존 저자 사용: ${name}`);
      }

      await prisma.bookAuthor.create({
        data: {
          bookId,
          authorId: author.id,
        },
      });
    }

    this.logger.debug(`저자 처리 완료. 책 ID: ${bookId}`);
  }

  /**
   * 번역자 정보를 생성합니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {string} name - 번역자 이름
   * @returns {Promise<any>} 생성된 번역자 정보
   * @private
   */
  private createTranslator(prisma: Prisma.TransactionClient, name: string) {
    this.logger.debug(`번역자 생성: ${name}`);
    return prisma.translator.create({
      data: { name },
    });
  }

  /**
   * 번역자 이름으로 번역자 정보를 찾습니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {string} name - 번역자 이름
   * @returns {Promise<any>} 찾은 번역자 정보
   * @private
   */
  private findTranslator(prisma: Prisma.TransactionClient, name: string) {
    return prisma.translator.findFirst({ where: { name } });
  }

  /**
   * 책에 번역자 정보를 연결합니다. 존재하지 않는 번역자는 새로 생성합니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {ProcessTranslatorPayload} payload - 번역자 처리에 필요한 정보
   * @param {number} payload.bookId - 책 ID
   * @param {string[]} payload.translators - 번역자 이름 배열
   * @returns {Promise<void>}
   * @private
   */
  private async processTranslator(
    prisma: Prisma.TransactionClient,
    payload: ProcessTranslatorPayload,
  ) {
    const { translators, bookId } = payload;
    this.logger.debug(`번역자 처리 시작. 책 ID: ${bookId}, 번역자 수: ${translators.length}`);

    for (const name of translators) {
      let translator = await this.findTranslator(prisma, name);

      if (!translator) {
        this.logger.debug(`새 번역자 생성: ${name}`);
        translator = await this.createTranslator(prisma, name);
      } else {
        this.logger.debug(`기존 번역자 사용: ${name}`);
      }

      await prisma.bookTranslator.create({
        data: {
          bookId,
          translatorId: translator.id,
        },
      });
    }

    this.logger.debug(`번역자 처리 완료. 책 ID: ${bookId}`);
  }

  /**
   * 책과 관련된 모든 정보를 함께 조회합니다.
   *
   * @param {Prisma.TransactionClient} prisma - 트랜잭션 클라이언트
   * @param {number} bookId - 책 ID
   * @returns {Promise<any>} 관계 정보가 포함된 책 객체
   * @private
   */
  private getBookWithRelations(prisma: Prisma.TransactionClient, bookId: number) {
    this.logger.debug(`관계 정보 포함하여 책 조회. 책 ID: ${bookId}`);
    return prisma.book.findUnique({
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
  }
}
