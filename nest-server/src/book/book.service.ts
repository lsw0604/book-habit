import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookRegisterDto } from './dto/book.register.dto';
import { Book, Prisma } from '@prisma/client';

type FindBookDTO = Pick<Book, 'id'>;

/**
 * TODO MyBookComment 와 Validation에 대해 다시 생각해보기, 서비스 코드 다시 작성하기
 */
@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  private validateBookData(dto: BookRegisterDto) {
    if (dto.isbn.length === 0) {
      throw new BadRequestException('ISBN은 반드시 한개 이상 필요합니다.');
    }
  }

  private async existISBN(prisma: Prisma.TransactionClient, isbn: string) {
    const existISBN = await prisma.iSBN.findFirst({
      where: { isbn },
    });
    return !!existISBN;
  }

  async findBook({ id }: FindBookDTO) {
    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException('해당 book을 찾을 수 없습니다.');
    }

    return book;
  }

  async registerBook(dto: BookRegisterDto) {
    return this.prismaService.$transaction(async (prisma) => {
      this.validateBookData(dto);

      for (const isbn of dto.isbn) {
        if (await this.existISBN(prisma, isbn)) {
          throw new BadRequestException(`이미 등록된 책입니다. (${isbn})`);
        }
      }

      const book = await this.createBook(prisma, dto);

      await this.createISBN(prisma, dto, book.id);
      await this.processAuthor(prisma, dto, book.id);
      await this.processTranslator(prisma, dto, book.id);

      return this.getBookWithRelations(prisma, book.id);
    });
  }

  async deleteBook(id: number) {
    return this.prismaService.$transaction(async (prisma) => {
      const book = await prisma.book.findUnique({
        where: { id },
        include: {
          isbns: true,
          translators: true,
          authors: true,
        },
      });

      if (!book) {
        throw new NotFoundException(`해당 id : ${id} (을)를 가진 책을 찾을 수 없습니다.`);
      }

      await this.deleteISBN(prisma, book.id);
      await this.deleteBookAuthor(prisma, book.id);
      await this.deleteBookTranslator(prisma, book.id);
      await prisma.book.delete({ where: { id } });

      return { message: `${book.id}번 책을 성공적으로 삭제했습니다.` };
    });
  }

  private async deleteISBN(prisma: Prisma.TransactionClient, bookId: number) {
    await prisma.iSBN.deleteMany({
      where: {
        bookId,
      },
    });
  }

  private async deleteBookAuthor(prisma: Prisma.TransactionClient, bookId: number) {
    await prisma.bookAuthor.deleteMany({ where: { bookId } });
  }

  private async deleteBookTranslator(prisma: Prisma.TransactionClient, bookId: number) {
    await prisma.bookTranslator.deleteMany({ where: { bookId } });
  }

  private async createBook(
    prisma: Prisma.TransactionClient,
    dto: Omit<BookRegisterDto, 'isbn' | 'translators' | 'authors'>,
  ) {
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
    dto: Pick<BookRegisterDto, 'isbn'>,
    bookId: number,
  ) {
    const isbnPromise = dto.isbn.map((isbn) =>
      prisma.iSBN.create({
        data: {
          isbn,
          bookId,
        },
      }),
    );

    await Promise.all(isbnPromise);
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
    dto: Pick<BookRegisterDto, 'authors'>,
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
    dto: Pick<BookRegisterDto, 'translators'>,
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
