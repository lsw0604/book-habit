import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BookService,
  ) {}

  async createMyBook(payload: CreateMyBookPayload) {
    const book = await this.duplicateMyBook({ bookId: payload.bookId, userId: payload.userId });

    return await this.prismaService.myBook.create({
      data: {
        userId: payload.userId,
        bookId: book.id,
        rating: 0,
        myBookStatus: 'TO_READ',
      },
    });
  }

  async getMyBookDetail(payload: GetMyBookDetailPayload) {
    const myBook = await this.validateMyBook({ id: payload.id, userId: payload.userId });

    return await this.prismaService.myBook.findUnique({
      where: {
        id: myBook.id,
        userId: myBook.userId,
      },
      select: {
        rating: true,
        myBookStatus: true,
        book: true,
        tag: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getMyBookList(payload: GetMyBookListPayload) {
    const take = 10;
    const skip = (payload.pageNumber - 1) * take;

    const where: Prisma.MyBookWhereInput = {
      userId: payload.userId,
      ...(payload.myBookStatus &&
        payload.myBookStatus !== 'ALL' && { myBookStatus: payload.myBookStatus }),
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
    const nextPage = payload.pageNumber < totalPages ? payload.pageNumber + 1 : undefined;

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

  async updateMyBook(payload: UpdateMyBookPayload) {
    const myBook = await this.validateMyBook({ id: payload.id, userId: payload.userId });
    return await this.prismaService.myBook.update({
      where: {
        id: myBook.id,
      },
      data: {
        myBookStatus: payload.myBookStatus,
        rating: payload.rating,
      },
    });
  }

  async deleteMyBook(payload: DeleteMyBookPayload) {
    const myBook = await this.validateMyBook({ id: payload.id, userId: payload.userId });

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.myBookHistory.deleteMany({
        where: {
          myBookId: myBook.id,
        },
      });

      const comments = await prisma.myBookComment.findMany({
        where: { myBookId: myBook.id },
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
        where: { myBookId: myBook.id },
      });

      await prisma.myBookTag.deleteMany({
        where: { myBookId: myBook.id },
      });

      await prisma.myBook.delete({
        where: { id: myBook.id },
      });
    });

    return {
      message: `해당 ID : ${myBook.id}를 가진 MyBook을 삭제하는데 성공했습니다.`,
    };
  }

  async getMyBook(payload: GetMyBookPayload) {
    const myBook = await this.prismaService.myBook.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!myBook) {
      throw new NotFoundException(`해당 ID : ${payload.id}를 가진 myBook을 찾을 수 없습니다.`);
    }

    return myBook;
  }

  async validateMyBook(payload: ValidateMyBookPayload) {
    const myBook = await this.getMyBook({ id: payload.id });

    if (myBook.userId !== payload.userId) {
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }

    return myBook;
  }

  private async duplicateMyBook(payload: DuplicateMyBookPayload) {
    const book = await this.bookService.getBook({ id: payload.bookId });
    const existMyBook = await this.prismaService.myBook.findFirst({
      where: {
        bookId: book.id,
        userId: payload.userId,
      },
    });

    if (!existMyBook) {
      throw new BadRequestException('해당 책은 이미 myBook에 등록되어있습니다.');
    }

    return book;
  }
}
