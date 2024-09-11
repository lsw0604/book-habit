import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicCommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPublicCommentList() {
    const comments = await this.prismaService.myBookComment.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        isPublic: true,
        myBook: {
          select: {
            book: {
              select: {
                title: true,
              },
            },
          },
        },
        commentLike: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            commentReply: true,
          },
        },
      },
    });

    return comments;
  }

  async getPublicCommentDetail(payload: GetPublicCommentDetailPayload) {
    const comment = await this.prismaService.myBookComment.findFirst({
      where: {
        id: payload.id,
        isPublic: true,
      },
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        isPublic: true,
        myBook: {
          select: {
            id: true,
            book: {
              select: {
                thumbnail: true,
                title: true,
              },
            },
          },
        },
        commentLike: true,
        commentReply: true,
      },
    });

    return comment;
  }
}
