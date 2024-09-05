import { Module } from '@nestjs/common';
import { MyBookCommentService } from './my-book-comment.service';
import { MyBookCommentController } from './my-book-comment.controller';
import { MyBookModule } from 'src/my-book/my-book.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MyBookModule],
  providers: [MyBookCommentService, PrismaService],
  controllers: [MyBookCommentController],
})
export class MyBookCommentModule {}