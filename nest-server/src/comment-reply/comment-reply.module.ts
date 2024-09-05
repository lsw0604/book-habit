import { Module } from '@nestjs/common';
import { CommentReplyService } from './comment-reply.service';
import { CommentReplyController } from './comment-reply.controller';

@Module({
  providers: [CommentReplyService],
  controllers: [CommentReplyController],
})
export class CommentReplyModule {}
