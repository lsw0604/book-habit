import { Module } from '@nestjs/common';
import { CommentReplyService } from './comment-reply.service';
import { CommentReplyController } from './comment-reply.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyBookCommentModule } from 'src/my-book-comment/my-book-comment.module';

@Module({
  imports: [MyBookCommentModule],
  providers: [CommentReplyService, PrismaService],
  controllers: [CommentReplyController],
})
export class CommentReplyModule {}
