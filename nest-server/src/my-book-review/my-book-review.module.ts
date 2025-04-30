import { Module } from '@nestjs/common';
import { MyBookModule } from 'src/my-book/my-book.module';
import { MyBookReviewController } from './my-book-review.controller';
import { MyBookReviewService } from './my-book-review.service';

@Module({
  imports: [MyBookModule],
  providers: [MyBookReviewService],
  controllers: [MyBookReviewController],
  exports: [MyBookReviewService],
})
export class MyBookReviewModule {}
