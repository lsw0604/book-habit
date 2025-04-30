import { Module } from '@nestjs/common';
import { MyBookController } from './my-book.controller';
import { MyBookService } from './my-book.service';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [BookModule],
  providers: [MyBookService],
  controllers: [MyBookController],
  exports: [MyBookService],
})
export class MyBookModule {}
