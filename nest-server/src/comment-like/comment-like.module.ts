import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';

@Module({
  providers: [CommentLikeService, PrismaService],
  controllers: [CommentLikeController],
})
export class CommentLikeModule {}
