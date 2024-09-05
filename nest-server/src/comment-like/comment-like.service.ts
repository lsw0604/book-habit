import { Injectable } from '@nestjs/common';
import { CommentLike } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateCommentLikeDTO = Omit<CommentLike, 'id'>;

@Injectable()
export class CommentLikeService {
  constructor(private prismaService: PrismaService) {}

  async createCommentLike(dto: CreateCommentLikeDTO) {
    const commentLike = await this.prismaService.commentLike.create({
      data: {
        ...dto,
      },
    });

    return commentLike;
  }
}
