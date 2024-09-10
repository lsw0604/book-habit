import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MyBook, MyBookStatus, Prisma } from '@prisma/client';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateMyBookDTO = Pick<MyBook, 'bookId' | 'userId'>;
type GetMyBookListDTO = Pick<MyBook, 'userId'> & { myBookStatus: MyBookStatus | 'ALL' } & {
  pageNumber: number;
};
type UpdateMyBookDTO = Partial<Pick<MyBook, 'rating' | 'myBookStatus' | 'id' | 'userId'>>;
type DeleteMyBookDTO = Pick<MyBook, 'id' | 'userId'>;
type FindMyBookDTO = Pick<MyBook, 'id'>;
type ValidateMyBookDTO = Pick<MyBook, 'id' | 'userId'>;
type VAlidateCreateMyBookDTO = Pick<MyBook, 'bookId'>;

@Injectable()
export class MyBookService {
  constructor(
    private prismaService: PrismaService,
    private readonly bookService: BookService,
  ) {}

  async createMyBook({ bookId, userId }: CreateMyBookDTO) {
    await this.validateCreateMyBook({ bookId });
    const initialData: Pick<MyBook, 'rating' | 'myBookStatus'> = {
      rating: 0,
      myBookStatus: 'TO_READ',
    };

    const myBook = await this.prismaService.myBook.create({
      data: {
        userId,
        bookId,
        ...initialData,
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
        tag: {
          select: {
            tag: true,
          },
        },
        book: {
          select: {
            id: true,
            authors: {
              select: {
                author: {
                  select: {
                    name: true,
                  },
                },
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

    return await this.prismaService.executeQuery(async () => myBook);
  }

  async getMyBookList({ userId, pageNumber, myBookStatus }: GetMyBookListDTO) {
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

  async updateMyBook({ id, myBookStatus, rating, userId }: UpdateMyBookDTO) {
    await this.validateMyBook({ id, userId });
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

  async deleteMyBook({ id: myBookId, userId }: DeleteMyBookDTO) {
    await this.validateMyBook({ id: myBookId, userId });

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

    return {
      message: `해당 ID : ${myBookId}를 가진 MyBook을 삭제하는데 성공했습니다.`,
    };
  }

  async findMyBook({ id }: FindMyBookDTO) {
    const myBook = await this.prismaService.myBook.findUnique({
      where: {
        id,
      },
    });

    if (!myBook) {
      throw new NotFoundException(`해당 ID : ${id}를 가진 myBook을 찾을 수 없습니다.`);
    }

    return myBook;
  }

  private async validateCreateMyBook({ bookId: id }: VAlidateCreateMyBookDTO) {
    await this.bookService.findBook({ id });
  }

  async validateMyBook({ id, userId }: ValidateMyBookDTO) {
    const myBook = await this.findMyBook({ id });

    if (myBook.userId !== userId) {
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }

    return myBook;
  }
}
