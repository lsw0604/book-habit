import { Module } from '@nestjs/common';
import { MyBookModule } from 'src/my-book/my-book.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookReviewController } from './my-book-review.controller';
import { MyBookReviewService } from './my-book-review.service';

@Module({
  imports: [MyBookModule, PrismaModule],
  providers: [MyBookReviewService, LoggerService],
  controllers: [MyBookReviewController],
  exports: [MyBookReviewService],
})
export class MyBookReviewModule {}
