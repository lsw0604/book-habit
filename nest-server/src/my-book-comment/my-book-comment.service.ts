import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MyBook, MyBookComment } from '@prisma/client';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateMyBookCommentDTO = Pick<MyBookComment, 'comment' | 'isPublic' | 'myBookId'> &
  Pick<MyBook, 'userId'>;
type GetPublicMyBookCommentDetailDTO = Pick<MyBookComment, 'id'>;
type UpdateMyBookCommentDTO = Partial<Pick<MyBookComment, 'comment' | 'isPublic'>> &
  Pick<MyBookComment, 'id'> &
  Pick<MyBook, 'userId'>;
type DeleteMyBookCommentDTO = Pick<MyBookComment, 'id'> & Pick<MyBook, 'userId'>;
type ValidateCreateMyBookCommentDTO = Pick<MyBookComment, 'myBookId'> & Pick<MyBook, 'userId'>;
type ValidateMyBookCommentDTO = Pick<MyBookComment, 'id'> & Pick<MyBook, 'userId'>;
type FIndMyBookCommentDTO = Pick<MyBookComment, 'id'>;

@Injectable()
export class MyBookCommentService {
  constructor(
    private prismaService: PrismaService,
    private readonly myBookService: MyBookService,
  ) {}

  async createMyBookComment({ comment, isPublic, myBookId, userId }: CreateMyBookCommentDTO) {
    await this.validateCreateMyBookComment({ userId, myBookId });

    const newComment = await this.prismaService.myBookComment.create({
      data: {
        comment,
        isPublic,
        myBookId,
      },
    });

    return newComment;
  }

  async getPublicMyBookCommentList() {
    const comment = await this.prismaService.myBookComment.findMany({
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

    return comment;
  }

  async getPublicMyBookCommentDetail({ id }: GetPublicMyBookCommentDetailDTO) {
    const myBookComment = await this.findMyBookComment({ id });

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
        commentLike: {
          select: {
            userId: true,
          },
        },
        commentReply: true,
      },
    });
  }

  async updateMyBookComment({ isPublic, userId, comment, id }: UpdateMyBookCommentDTO) {
    await this.validateMyBookComment({ userId, id });

    return await this.prismaService.myBookComment.update({
      where: {
        id,
      },
      data: {
        isPublic,
        comment,
      },
    });
  }

  async deleteMyBookComment({ id, userId }: DeleteMyBookCommentDTO) {
    await this.validateMyBookComment({ id, userId });
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.commentLike.deleteMany({
        where: {
          myBookCommentId: id,
        },
      });

      await prisma.commentReply.deleteMany({
        where: {
          myBookCommentId: id,
        },
      });

      await prisma.myBookComment.delete({
        where: {
          id,
        },
      });
    });
  }

  async findMyBookComment({ id }: FIndMyBookCommentDTO) {
    const myBookComment = await this.prismaService.myBookComment.findUnique({
      where: {
        id,
      },
    });

    if (!myBookComment) {
      throw new NotFoundException(`해당 ID : ${id}를 가진 MyBookComment를 찾을 수 없습니다.`);
    }

    return myBookComment;
  }

  private async validateCreateMyBookComment({ myBookId, userId }: ValidateCreateMyBookCommentDTO) {
    const myBook = await this.myBookService.findMyBook({ id: myBookId });

    if (myBook.userId !== userId) {
      throw new UnauthorizedException(`해당 myBookComment에 대한 권한이 없습니다.`);
    }
  }

  private async validateMyBookComment({ id, userId }: ValidateMyBookCommentDTO) {
    const myBookComment = await this.findMyBookComment({ id });

    const myBook = await this.myBookService.findMyBook({ id: myBookComment.id });

    if (myBook.userId !== userId) {
      throw new UnauthorizedException(`해당 myBookComment에 대한 권한이 없습니다.`);
    }
  }
}
