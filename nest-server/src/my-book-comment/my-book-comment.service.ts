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
type ExistMyBookCommentDTO = Pick<MyBookComment, 'id'>;
type ValidateMyBookUserDTO = Pick<MyBook, 'userId' | 'id'>;
type ValidateMyBookCommentUserDTO = Pick<MyBookComment, 'id'> & Pick<MyBook, 'userId'>;

@Injectable()
export class MyBookCommentService {
  constructor(
    private prismaService: PrismaService,
    private readonly myBookService: MyBookService,
  ) {}

  async createMyBookComment({ comment, isPublic, myBookId, userId }: CreateMyBookCommentDTO) {
    await this.validateMyBookUser({ userId, id: myBookId });

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
    await this.existMyBookComment({ id });
    const comment = await this.prismaService.myBookComment.findUnique({
      where: {
        id,
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

    return comment;
  }

  async updateMyBookComment({ isPublic, userId, comment, id }: UpdateMyBookCommentDTO) {
    await this.validateUserComment({ userId, id });

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
    await this.validateUserComment({ id, userId });
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

  private async existMyBookComment({ id }: ExistMyBookCommentDTO) {
    const comment = await this.prismaService.myBookComment.findUnique({
      where: {
        id,
      },
      select: {
        myBook: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!comment) {
      throw new NotFoundException(`해당 ID : ${id}를 가진 MyBookComment 찾을 수 없습니다.`);
    }

    return comment;
  }

  private async validateMyBookUser({ id, userId }: ValidateMyBookUserDTO) {
    const myBook = await this.myBookService.findMyBookById({ id });

    if (!myBook) {
      throw new NotFoundException(`해당 ${id}를 가진 MyBook을 찾을 수 없습니다.`);
    }

    if (myBook.userId !== userId) {
      throw new UnauthorizedException(
        `해당 MyBook의 소유자가 아니므로 MyBook에 Comment를 작성할 수 없습니다.`,
      );
    }
  }

  private async validateUserComment({ id, userId }: ValidateMyBookCommentUserDTO) {
    const existComment = await this.existMyBookComment({ id });

    if (userId !== existComment.myBook.userId) {
      throw new UnauthorizedException(`해당 MyBookComment의 소유자가 아니므로 수정할 수 없습니다.`);
    }
  }
}
