import { Module } from '@nestjs/common';
import { BookModule } from 'src/book/book.module';
import { MyBookModule } from 'src/my-book/my-book.module';
import { MyBookReviewController } from './my-book-review.controller';
import { MyBookReviewService } from './my-book-review.service';
import { CreateReviewWithMyBookUseCase } from './cases';

@Module({
  imports: [MyBookModule, BookModule],
  providers: [MyBookReviewService, CreateReviewWithMyBookUseCase],
  controllers: [MyBookReviewController],
  exports: [MyBookReviewService],
})
export class MyBookReviewModule {}

