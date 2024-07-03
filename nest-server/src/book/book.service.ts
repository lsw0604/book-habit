import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRegisterDto } from './dto/book.register.dto';
import { Book } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async registerBook(
    dto: Omit<BookRegisterDto, 'isbn' | 'author' | 'translator'>,
  ): Promise<Book> {
    return this.prismaService.book.create({
      data: {
        ...dto,
      },
    });
  }
}
