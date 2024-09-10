import { Injectable, NotFoundException } from '@nestjs/common';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookCommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
  ) {}

  async createMyBookComment(payload: CreateMyBookCommentPayload) {
    const myBook = await this.myBookService.validateMyBook({
      id: payload.myBookId,
      userId: payload.userId,
    });
    return await this.prismaService.myBookComment.create({
      data: {
        myBookId: myBook.id,
        comment: payload.comment,
        isPublic: payload.isPublic,
      },
    });
  }

  async getPublicMyBookCommentList() {
    return await this.prismaService.myBookComment.findMany({
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
  }

  async getPublicMyBookCommentDetail({ id }: GetPublicMyBookCommentDetailPayload) {
    const myBookComment = await this.getMyBookComment({ id });

    return await this.prismaService.myBookComment.findUnique({
      where: {
        id: myBookComment.id,
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
  }

  async getMyBookComment(payload: GetMyBookCommentPayload) {
    const myBookComment = await this.prismaService.myBookComment.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!myBookComment) {
      throw new NotFoundException(
        `해당 ID : ${payload.id}를 가진 MyBookComment를 찾을 수 없습니다.`,
      );
    }

    return myBookComment;
  }

  async updateMyBookComment(payload: UpdateMyBookCommentPayload) {
    const myBookComment = await this.getMyBookComment({ id: payload.id });
    await this.myBookService.validateMyBook({
      id: myBookComment.myBookId,
      userId: payload.userId,
    });

    return await this.prismaService.myBookComment.update({
      where: {
        id: myBookComment.id,
      },
      data: {
        isPublic: payload.isPublic,
        comment: payload.comment,
      },
    });
  }

  async deleteMyBookComment(payload: DeleteMyBookCommentPayload) {
    const myBookComment = await this.getMyBookComment({ id: payload.id });
    await this.myBookService.validateMyBook({
      id: myBookComment.myBookId,
      userId: payload.userId,
    });
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.commentLike.deleteMany({
        where: {
          myBookCommentId: myBookComment.id,
        },
      });

      await prisma.commentReply.deleteMany({
        where: {
          myBookCommentId: myBookComment.id,
        },
      });

      await prisma.myBookComment.delete({
        where: {
          id: myBookComment.id,
        },
      });
    });
  }
}
