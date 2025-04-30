import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { ISBNService } from './services/isbn.service';
import { TranslatorService } from './services/translator.service';
import { AuthorService } from './services/author.service';

@Module({
  providers: [BookService, ISBNService, TranslatorService, AuthorService],
  exports: [BookService],
})
export class BookModule {}
