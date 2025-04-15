import { Module } from '@nestjs/common';
import { MyBookService } from './my-book.service';
import { BookService } from './book.service';
import { MyBookController } from './my-book.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorService } from './author.service';
import { TranslatorService } from './translator.service';

@Module({
  providers: [MyBookService, PrismaService, BookService, AuthorService, TranslatorService],
  controllers: [MyBookController],
  exports: [MyBookService],
})
export class MyBookModule {}
