import { Module } from '@nestjs/common';
import { MyBookController } from './my-book.controller';
import { TranslatorService } from './translator.service';
import { MyBookService } from './my-book.service';
import { BookService } from './book.service';
import { AuthorService } from './author.service';
import { ISBNService } from './isbn.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    MyBookService,
    PrismaService,
    BookService,
    AuthorService,
    TranslatorService,
    ISBNService,
  ],
  controllers: [MyBookController],
  exports: [MyBookService],
})
export class MyBookModule {}
