import { Injectable, NotFoundException } from '@nestjs/common';
import { MyBookStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookService {
  constructor(private prismaService: PrismaService) { }

  async deleteMyBook(userId: number, myBookId: number) {
    const myBook = await this.prismaService.myBook.findFirst({
      where: {
        id: myBookId,
        userId,
      },
    });

    if (!myBook) {
      throw new NotFoundException('해당 myBook을 찾을 수 없습니다.');
    }

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.myBookHistory.deleteMany({
        where: {
          myBookId,
        },
      });

      const comments = await prisma.myBookComment.findMany({
        where: { myBookId },
        select: { id: true },
      });

      const commentIds = comments.map((comment) => comment.id);

      await prisma.commentLike.deleteMany({
        where: {
          myBookCommentId: { in: commentIds },
        },
      });

      await prisma.commentReply.deleteMany({
        where: {
          myBookCommentId: { in: commentIds },
        },
      });

      await prisma.myBookComment.deleteMany({
        where: { myBookId },
      });

      await prisma.myBookTag.deleteMany({
        where: { myBookId },
      });

      await prisma.myBook.delete({
        where: { id: myBookId },
      });
    });
  }

  async getMyBookList(
    userId: number,
    page: number,
    status?: MyBookStatus | 'ALL',
  ) {
    const take = 10;
    const skip = (page - 1) * take;

    const where: Prisma.MyBookWhereInput = {
      userId,
      ...(status && status !== 'ALL' && { myBookStatus: status }),
    };

    const totalCount = await this.prismaService.myBook.count({ where });
    const books = await this.prismaService.myBook.findMany({
      where,
      select: {
        id: true,
        myBookStatus: true,
        book: {
          select: {
            title: true,
            thumbnail: true,
            isbns: {
              select: {
                isbn: true,
              },
              take: 1,
            },
          },
        },
        history: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          select: {
            date: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const totalPages = Math.ceil(totalCount / take);
    const nextPage = page < totalPages ? page + 1 : undefined;

    return {
      nextPage,
      books: books.map((book) => ({
        id: book.id,
        title: book.book.title,
        thumbnail: book.book.thumbnail,
        isbn: book.book.isbns.map((isbn) => {
          return isbn;
        }),
        date: book.history[0]?.date,
        status: book.myBookStatus,
      })),
    };
  }
}
