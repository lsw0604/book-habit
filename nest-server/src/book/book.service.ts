import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRegisterDto } from './dto/book.register.dto';
import { Book } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async registerBook(
    dto: Omit<BookRegisterDto, 'isbn' | 'author' | 'translator'>,
  ): Promise<number> {
    const { id } = await this.prismaService.book.create({
      data: {
        ...dto,
      },
    });

    return id;
  }

  async existIsbn(isbn: string) {
    const { book } = this.prismaService.iSBN.findUnique({
      where: {
        isbn,
      },
    });
  }

  registerIsbn(dto: Pick<BookRegisterDto, 'isbn'>, bookId: number) {
    if (dto.isbn.length === 0) return;

    dto.isbn.forEach(async (isbn) => {
      await this.prismaService.iSBN.create({
        data: {
          isbn,
          bookId,
        },
      });
    });
  }

  registerAuthor(dto: Pick<BookRegisterDto, 'authors'>, bookId: number) {
    if (dto.authors.length === 0) return;

    dto.authors.forEach(async (name) => {
      await this.prismaService.author.create({
        data: {
          name,
          bookId,
        },
      });
    });
  }

  registerTranslator(
    dto: Pick<BookRegisterDto, 'translators'>,
    bookId: number,
  ) {
    if (dto.translators.length === 0) return;

    dto.translators.forEach(async (translator) => {
      await this.prismaService.translator.create({
        data: {
          translator,
          bookId,
        },
      });
    });
  }
}
