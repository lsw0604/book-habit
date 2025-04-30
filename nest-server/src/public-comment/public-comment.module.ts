import { Module } from '@nestjs/common';
import { PublicCommentService } from './public-comment.service';
import { PublicCommentController } from './public-comment.controller';

@Module({
  providers: [PublicCommentService],
  controllers: [PublicCommentController],
})
export class PublicCommentModule {}
