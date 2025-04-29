import { Module } from '@nestjs/common';
import { ReviewLikeController } from './review-like.controller';
import { ReviewLikeService } from './review-like.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  providers: [ReviewLikeService, LoggerService],
  controllers: [ReviewLikeController],
})
export class ReviewLikeModule {}
