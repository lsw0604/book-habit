import { Module } from '@nestjs/common';
import { MyBookReviewController } from './my-book-review.controller';
import { MyBookReviewService } from './my-book-review.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyBookModule } from 'src/my-book/my-book.module';

@Module({
  /**
   * TODO 할일이 많다
   */
  imports: [MyBookModule],
  providers: [MyBookReviewService, PrismaService],
  controllers: [MyBookReviewController],
  exports: [MyBookReviewService],
})
export class MyBookReviewModule {}
