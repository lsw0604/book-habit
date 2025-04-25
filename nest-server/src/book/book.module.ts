import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from './book.service';

@Module({
  providers: [PrismaService, BookService],
  exports: [BookService],
})
export class BookModule {}
