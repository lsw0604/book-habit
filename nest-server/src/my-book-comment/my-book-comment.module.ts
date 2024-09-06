import { Module } from '@nestjs/common';
import { MyBookCommentService } from './my-book-comment.service';
import { MyBookCommentController } from './my-book-comment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyBookModule } from 'src/my-book/my-book.module';

@Module({
  imports: [MyBookModule],
  providers: [MyBookCommentService, PrismaService],
  controllers: [MyBookCommentController],
  exports: [MyBookCommentService],
})
export class MyBookCommentModule {}
