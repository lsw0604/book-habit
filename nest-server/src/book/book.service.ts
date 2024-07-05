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
    });
  }

  private validateBookData(dto: BookRegisterDto) {
    if (dto.isbn.length === 0) {
      throw new BadRequestException('ISBN은 반드시 한개 이상 필요합니다.');
    }
  }

  private async createBook(
    prisma: Prisma.TransactionClient,
    dto: BookRegisterDto,
  ) {}
}
