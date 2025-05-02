import { Module } from '@nestjs/common';
import { PublicReviewController } from './public-review.controller';
import { PublicReviewService } from './public-review.service';

@Module({
  providers: [PublicReviewService],
  controllers: [PublicReviewController],
})
export class PublicReviewModule {}
