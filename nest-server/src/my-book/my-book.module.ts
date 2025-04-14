import { Module } from '@nestjs/common';
import { MyBookService } from './my-book.service';
import { BookService } from './book.service';
import { MyBookController } from './my-book.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorService } from './author.service';

@Module({
  providers: [MyBookService, PrismaService, BookService, AuthorService],
  controllers: [MyBookController],
  exports: [MyBookService],
})
export class MyBookModule {}
