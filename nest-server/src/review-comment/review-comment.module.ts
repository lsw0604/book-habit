import { Module } from '@nestjs/common';
import { ReviewCommentController } from './review-comment.controller';
import { ReviewCommentService } from './review-comment.service';

@Module({
  providers: [ReviewCommentService],
  controllers: [ReviewCommentController],
})
export class ReviewCommentModule {}
