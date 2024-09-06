import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';
import { MyBookCommentModule } from 'src/my-book-comment/my-book-comment.module';

@Module({
  imports: [MyBookCommentModule],
  providers: [CommentLikeService, PrismaService],
  controllers: [CommentLikeController],
})
export class CommentLikeModule {}
