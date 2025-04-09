import { Module } from '@nestjs/common';
import { ReviewLikeController } from './review-like.controller';
import { ReviewLikeService } from './review-like.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyBookReviewModule } from 'src/my-book-review/my-book-review.module';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  imports: [MyBookReviewModule],
  providers: [ReviewLikeService, PrismaService, LoggerService],
  controllers: [ReviewLikeController],
})
export class ReviewLikeModule {}
