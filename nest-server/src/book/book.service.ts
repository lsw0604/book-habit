import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRegisterDto } from './dto/book.register.dto';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async registerBook(dto: BookRegisterDto): Promise<Book> {
    return this.prismaService.$transaction(async (prisma) => {
      this.validateBookData(dto);

      const book = await this.createBook(prisma, dto);

      await this.createISBN(prisma, dto, book.id);
      await this.processAuthor(prisma, dto, book.id);
      await this.processTranslator(prisma, dto, book.id);

      return this.getBookWithRelations(prisma, book.id);
    });
  }

  private validateBookData(dto: BookRegisterDto) {
    if (dto.isbn.length === 0) {
      throw new BadRequestException('ISBN은 반드시 한개 이상 필요합니다.');
    }
  }

  private createBook(
    prisma: Prisma.TransactionClient,
    dto: Omit<BookRegisterDto, 'isbn' | 'translators' | 'authors'>,
  ) {
    return prisma.book.create({
      data: {
        ...dto,
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

  private getBookWithRelations(
    prisma: Prisma.TransactionClient,
    bookId: number,
  ) {
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
