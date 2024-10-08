import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { flattenObject } from '../utils/flatten-object';

@Injectable()
export class PublicCommentService {
  constructor(private readonly prismaService: PrismaService) {}

  private async commentCount(payload: Pick<GetPublicCommentListPayload, 'startDate' | 'endDate'>) {
    const { startDate, endDate } = payload;
    return await this.prismaService.myBookComment.count({
      where: this.getCommentWhereClause({ startDate, endDate }),
    });
  }

  private getCommentWhereClause(
    payload: Pick<GetPublicCommentListPayload, 'startDate' | 'endDate'>,
  ) {
    return {
      isPublic: true,
      createdAt: {
        gte: payload.startDate,
        lt: payload.endDate,
      },
    };
  }

  async getPublicCommentList(payload: GetPublicCommentListPayload) {
    const { endDate, page, pageSize, startDate } = payload;
    const skip = (page - 1) * 10;

    const count = await this.commentCount({ endDate, startDate });

    const comments = await this.prismaService.myBookComment.findMany({
      where: this.getCommentWhereClause({ startDate, endDate }),
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        myBook: {
          select: {
            book: {
              select: {
                title: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                gender: true,
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
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const nextPage = page < totalPages ? page + 1 : undefined;

    return {
      nextPage,
      comments: comments.map((comment) => flattenObject(comment)),
    };
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
        myBook: {
          select: {
            rating: true,
            book: {
              select: {
                thumbnail: true,
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
        commentReply: true,
      },
    });
    return flattenObject(comment);
  }
}
