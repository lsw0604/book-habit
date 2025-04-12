import type { FindBookByIdPayload, FindUniqueBook } from './interface/book.interface';

import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMyBookDto } from './dto/create.my.book.dto';

@Injectable()
export class BookService {
  constructor(
    private prismaService: PrismaService,
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
    return {
      ...book,
      isbns: book.isbns.map((isbn) => isbn.code),
      authors: book.authors.map(({ author }) => author.name),
      translators: book.translators.map(({ translator }) => translator.name),
    };
  }

  /**
   * TODO : registerBook 개선하기
   * * 1. payload로 받은 title, isbn으로 해당 책이 존재하는지 확인하기
   * * 2. 없다면 Book 등록하기
   * * 3. 있다면 해당 책 정보를 반환하기 ? [boolean]
   */
  public async registerBook(payload: RegisterBookPayload) {}

  private validateBookData(dto: CreateMyBookDto) {
    if (!dto.title || dto.title.trim() === '') {
      throw new BadRequestException('책 제목은 필수입니다.');
    }

    if (dto.isbn.length === 0) {
      throw new BadRequestException('ISBN은 반드시 한개 이상 필요합니다.');
    }
  }

  private async createBook(prisma: Prisma.TransactionClient, dto: CreateMyBookDto) {
    const { title, url, thumbnail, contents, datetime, price, sale_price, publisher, status } = dto;
    return prisma.book.create({
      data: {
        title,
        url,
        thumbnail,
        contents,
        datetime,
        price,
        sale_price,
        publisher,
        status,
      },
    });
  }

  private async createISBN(
    prisma: Prisma.TransactionClient,
    dto: Pick<CreateMyBookDto, 'isbn'>,
    bookId: number,
  ) {
    const isbnData = dto.isbn.map((isbn) => ({
      code: isbn,
      bookId,
    }));

    return prisma.iSBN.createMany({
      data: isbnData,
    });
  }

  private createAuthor(prisma: Prisma.TransactionClient, name: string) {
    return prisma.author.create({
      data: { name },
    });
  }

  private findAuthor(prisma: Prisma.TransactionClient, name: string) {
    return prisma.author.findFirst({ where: { name } });
  }

  private async processAuthor(
    prisma: Prisma.TransactionClient,
    dto: Pick<CreateMyBookDto, 'authors'>,
    bookId: number,
  ) {
    for (const name of dto.authors) {
      let author = await this.findAuthor(prisma, name);

      if (!author) {
        author = await this.createAuthor(prisma, name);
      }

      await prisma.bookAuthor.create({
        data: {
          bookId,
          authorId: author.id,
        },
      });
    }
  }

  private createTranslator(prisma: Prisma.TransactionClient, name: string) {
    return prisma.translator.create({
      data: { name },
    });
  }

  private findTranslator(prisma: Prisma.TransactionClient, name: string) {
    return prisma.translator.findFirst({ where: { name } });
  }

  private async processTranslator(
    prisma: Prisma.TransactionClient,
    dto: Pick<CreateMyBookDto, 'translators'>,
    bookId: number,
  ) {
    for (const name of dto.translators) {
      let translator = await this.findTranslator(prisma, name);

      if (!translator) {
        translator = await this.createTranslator(prisma, name);
      }

      await prisma.bookTranslator.create({
        data: {
          bookId,
          translatorId: translator.id,
        },
      });
    }
  }

  private getBookWithRelations(prisma: Prisma.TransactionClient, bookId: number) {
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
