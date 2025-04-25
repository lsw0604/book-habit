import { Module } from '@nestjs/common';
import { ReviewCommentController } from './review-comment.controller';
import { ReviewCommentService } from './review-comment.service';
import { MyBookReviewService } from 'src/my-book-review/my-book-review.service';
import { MyBookModule } from 'src/my-book/my-book.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  imports: [MyBookModule, PrismaModule],
  providers: [ReviewCommentService, MyBookReviewService, LoggerService],
  controllers: [ReviewCommentController],
})
export class ReviewCommentModule {}
