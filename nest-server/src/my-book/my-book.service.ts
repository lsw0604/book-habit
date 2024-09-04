import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MyBook, MyBookStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookService {
  constructor(private prismaService: PrismaService) {}

  async createMyBook({ bookId, userId }: Pick<MyBook, 'bookId' | 'userId'>) {
    if (!userId || !bookId) {
      throw new BadRequestException('userId 또는 bookId를 읽을 수 없습니다.');
    }

    const myBook = await this.prismaService.myBook.create({
      data: {
        userId,
        bookId,
        rating: 0,
        myBookStatus: 'TO_READ',
      },
    });

    return myBook;
  }

  async getMyBookDetail({ id, userId }: Pick<MyBook, 'id' | 'userId'>) {
    const myBook = await this.prismaService.myBook.findUnique({
      where: {
        id,
        userId,
      },
      select: {
        rating: true,
        myBookStatus: true,
        book: {
          select: {
            id: true,
            authors: {
              select: {
                author: true,
              },
            },
            datetime: true,
            contents: true,
            isbns: {
              select: {
                isbn: true,
              },
            },
            price: true,
            thumbnail: true,
            publisher: true,
            sale_price: true,
            title: true,
            url: true,
            translators: {
              select: {
                translator: true,
              },
            },
            status: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return myBook;
  }

  async getMyBookList({
    userId,
    pageNumber,
    myBookStatus,
  }: Pick<MyBook, 'userId'> & { myBookStatus: MyBookStatus | 'ALL' } & { pageNumber: number }) {
    const take = 10;
    const skip = (pageNumber - 1) * take;

    const where: Prisma.MyBookWhereInput = {
      userId,
      ...(myBookStatus && myBookStatus !== 'ALL' && { myBookStatus }),
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
              take: 2,
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
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : undefined;

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

  async updateMyBook({
    id,
    myBookStatus,
    rating,
    userId,
  }: Partial<Pick<MyBook, 'rating' | 'myBookStatus' | 'id' | 'userId'>>) {
    const existMyBook = await this.findMyBookById({ id });

    if (!existMyBook) {
      throw new BadRequestException(`해당 ID : ${id}를 가진 myBook을 찾을 수 없습니다.`);
    }

    if (existMyBook.userId !== userId) {
      throw new UnauthorizedException(
        `해당 ${id}를 가진 myBook에 대한 작업을 수행 할 수 없습니다.`,
      );
    }

    const updatedMyBook = await this.prismaService.myBook.update({
      where: {
        id,
        userId,
      },
      data: {
        myBookStatus,
        rating,
      },
    });

    return updatedMyBook;
  }

  async deleteMyBook({ id: myBookId, userId }: Pick<MyBook, 'id' | 'userId'>) {
    const existMyBook = await this.findMyBookById({ id: myBookId });

    if (!existMyBook) {
      throw new BadRequestException(`해당 ID : ${myBookId}를 가진 myBook을 찾을 수 없습니다.`);
    }

    if (existMyBook.userId !== userId) {
      throw new UnauthorizedException(
        `해당 ${myBookId}를 가진 myBook에 대한 작업을 수행 할 수 없습니다.`,
      );
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

  private async findMyBookById({ id }: Pick<MyBook, 'id'>) {
    return await this.prismaService.myBook.findUnique({
      where: {
        id,
      },
    });
  }
}
