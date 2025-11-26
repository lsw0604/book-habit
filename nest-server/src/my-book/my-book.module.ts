import { Module } from '@nestjs/common';
import { BookModule } from 'src/book/book.module';
import { MyBookController } from './my-book.controller';
import { MyBookService } from './my-book.service';

@Module({
  imports: [BookModule],
  providers: [MyBookService],
  controllers: [MyBookController],
  exports: [MyBookService],
})
export class MyBookModule {}
