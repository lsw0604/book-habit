import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMyBookDto } from './dto/create.my.book.dto';
import { GetBookByIdPayload } from './interface/book.interface';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async getBookById(payload: GetBookByIdPayload) {
    const book = await this.prismaService.book.findUnique({
      where: { id: payload.id },
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
      throw new NotFoundException('해당 book을 찾을 수 없습니다.');
    }

    return book;
  }

  async registerBook(dto: CreateMyBookDto) {
    const existBook = await this.prismaService.book.findFirst({
      where: {
        isbns: {
          some: {
            code: {
              in: dto.isbn,
            },
          },
        },
      },
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

    if (!!existBook) return existBook;

    return this.prismaService.$transaction(async (prisma) => {
      this.validateBookData(dto);

      const book = await this.createBook(prisma, dto);

      await this.createISBN(prisma, dto, book.id);
      await this.processAuthor(prisma, dto, book.id);
      await this.processTranslator(prisma, dto, book.id);

      return this.getBookWithRelations(prisma, book.id);
    });
  }

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
