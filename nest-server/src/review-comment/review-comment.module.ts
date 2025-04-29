import { Module } from '@nestjs/common';
import { ReviewCommentController } from './review-comment.controller';
import { ReviewCommentService } from './review-comment.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  providers: [ReviewCommentService, LoggerService],
  controllers: [ReviewCommentController],
})
export class ReviewCommentModule {}
