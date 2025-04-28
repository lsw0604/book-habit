import { Module } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookReviewController } from './my-book-review.controller';
import { MyBookReviewService } from './my-book-review.service';

@Module({
  providers: [MyBookReviewService, LoggerService],
  controllers: [MyBookReviewController],
  exports: [MyBookReviewService],
})
export class MyBookReviewModule {}
