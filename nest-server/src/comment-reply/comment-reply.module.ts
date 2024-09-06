import { Module } from '@nestjs/common';
import { CommentReplyService } from './comment-reply.service';
import { CommentReplyController } from './comment-reply.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CommentReplyService, PrismaService],
  controllers: [CommentReplyController],
})
export class CommentReplyModule {}
