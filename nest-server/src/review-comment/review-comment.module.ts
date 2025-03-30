import { Module } from '@nestjs/common';
import { ReviewCommentController } from './review-comment.controller';
import { ReviewCommentService } from './review-comment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyBookReviewService } from 'src/my-book-review/my-book-review.service';
import { MyBookModule } from 'src/my-book/my-book.module';

@Module({
  imports: [MyBookModule],
  providers: [ReviewCommentService, PrismaService, MyBookReviewService],
  controllers: [ReviewCommentController],
})
export class ReviewCommentModule {}
