import { Module } from '@nestjs/common';
import { PublicCommentService } from './public-comment.service';
import { PublicCommentController } from './public-comment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PublicCommentService, PrismaService],
  controllers: [PublicCommentController],
})
export class PublicCommentModule {}
