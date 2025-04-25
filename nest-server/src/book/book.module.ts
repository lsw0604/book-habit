import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { BookService } from './book.service';
import { ISBNService } from './services/isbn.service';
import { TranslatorService } from './services/translator.service';
import { AuthorService } from './services/author.service';

@Module({
  providers: [
    PrismaService,
    BookService,
    LoggerService,
    ISBNService,
    TranslatorService,
    AuthorService,
  ],
  exports: [BookService],
})
export class BookModule {}
