import { Module } from '@nestjs/common';
import { ReviewLikeController } from './review-like.controller';
import { ReviewLikeService } from './review-like.service';

@Module({
  providers: [ReviewLikeService],
  controllers: [ReviewLikeController],
})
export class ReviewLikeModule {}
