import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRegisterDto } from './dto/book.register.dto';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  isbnSplit(isbn: string) {}

  async registerBook(dto: BookRegisterDto) {}
}
