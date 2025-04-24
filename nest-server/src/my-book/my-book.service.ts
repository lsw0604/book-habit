import type {
  FormattedMyBook,
  FormattedMyBooks,
  FormattedMyBookDetail,
  MyBookWithRelations,
  GetMyBookPayload,
  GetMyBooksPayload,
  UpdateMyBookPayload,
  DeleteMyBookPayload,
  ValidateMyBookPayload,
  CreateMyBookPayload,
} from './interface/my.book.interface';
import type { FormattedBook } from './interface/book.interface';

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { PaginationOptions, PaginationUtil } from 'src/common/utils/pagination.util';

@Injectable()
export class MyBookService {
  private readonly PAGE_SIZE = 10;
  private readonly MY_BOOK_INCLUDE = {
    book: {
      select: {
        title: true,
        thumbnail: true,
        contents: true,
        publisher: true,
        datetime: true,
        url: true,
        authors: {
          select: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
        translators: {
          select: {
            translator: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    },
  } as const;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookService.name);
  }

  public async createMyBook(payload: CreateMyBookPayload): Promise<FormattedMyBook> {
    const { isbns, userId } = payload;

    // isbn을 갖고 있는 책이 DB에 있는지 검색
    let bookId: number;
    const existBook: FormattedBook | null = await this.bookService.findBookByISBN(isbns);

    // 해당 책이 존재한다면
    if (existBook) {
      bookId = existBook.id;
    } else {
      const registeredBook = await this.bookService.registerBook(payload);
      bookId = registeredBook.id;
    }

    const myBook = await this.prismaService.myBook.create({
      data: {
        userId,
        bookId,
      },
      include: {
        book: {
          select: {
            title: true,
            thumbnail: true,
          },
        },
      },
    });

    const { id: myBookId, book, rating, status } = myBook;
    const { title, thumbnail } = book;

    const formattedBook: FormattedMyBook = {
      myBookId,
      title,
      thumbnail,
      rating,
      status,
    };

    return formattedBook;
  }

  public async getMyBook(payload: GetMyBookPayload) {
    const { id, userId } = payload;
    await this.validateMyBook({ id, userId });

    const myBook = (await this.prismaService.myBook.findUnique({
      where: {
        id,
        userId,
      },
      include: this.MY_BOOK_INCLUDE,
    })) as MyBookWithRelations;

    return this.transformToMyBookDetail(myBook);
  }

  public async getMyBooks(payload: GetMyBooksPayload): Promise<FormattedMyBooks> {
    const { userId, status, pageNumber, orderBy } = payload;
    const paginationOptions: PaginationOptions = {
      pageNumber,
      pageSize: this.PAGE_SIZE,
    };

    const { skip, take } = PaginationUtil.getSkipTake(paginationOptions);

    const where: Prisma.MyBookWhereInput = {
      userId,
      ...(status && status !== 'ALL' && { status }),
    };

    const [totalCount, books] = await Promise.all([
      this.prismaService.myBook.count({ where }),
      this.prismaService.myBook.findMany({
        where,
        select: {
          id: true,
          status: true,
          rating: true,
          book: {
            select: {
              title: true,
              thumbnail: true,
            },
          },
        },
        skip,
        take,
        orderBy: {
          createdAt: orderBy,
        },
      }),
    ]);

    const paginationMeta = PaginationUtil.getPaginationMeta(totalCount, paginationOptions);

    const formattedBooks: FormattedMyBook[] = books.map(
      ({ id, status, rating, book: { title, thumbnail } }) => {
        return {
          myBookId: id,
          title,
          thumbnail,
          status,
          rating,
        };
      },
    );

    return {
      books: formattedBooks,
      meta: paginationMeta,
    };
  }

  public async updateMyBook(payload: UpdateMyBookPayload) {
    const { id, userId, rating, status } = payload;
    await this.validateMyBook({ id, userId });

    const updateData: Prisma.MyBookUpdateInput = {
      ...(rating !== undefined && { rating }),
      ...(status !== undefined && { status }),
    };

    const updateMyBook = (await this.prismaService.myBook.update({
      where: {
        id,
      },
      data: updateData,
      include: this.MY_BOOK_INCLUDE,
    })) as MyBookWithRelations;

    return this.transformToMyBookDetail(updateMyBook);
  }

  async deleteMyBook(dto: DeleteMyBookPayload) {
    const myBook = await this.validateMyBook({ id: dto.myBookId, userId: dto.userId });

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.myBookHistory.deleteMany({
        where: {
          myBookId: myBook.id,
        },
      });

      const reviews = await prisma.myBookReview.findMany({
        where: { myBookId: myBook.id },
        select: { id: true },
      });

      const reviewIds = reviews.map((review) => review.id);

      await prisma.reviewLike.deleteMany({
        where: {
          myBookReviewId: { in: reviewIds },
        },
      });

      await prisma.reviewComment.deleteMany({
        where: {
          myBookReviewId: { in: reviewIds },
        },
      });

      await prisma.myBookReview.deleteMany({
        where: { myBookId: myBook.id },
      });

      await prisma.myBookTag.deleteMany({
        where: { myBookId: myBook.id },
      });

      await prisma.myBook.delete({
        where: { id: myBook.id },
      });
    });

    return myBook;
  }

  async getMyBookById(id: number) {
    const myBook = await this.prismaService.myBook.findUnique({
      where: {
        id,
      },
    });

    if (!myBook) {
      throw new NotFoundException(`해당 MyBook을 찾을 수 없습니다. ID :${id}`);
    }

    return myBook;
  }

  async validateMyBook(payload: ValidateMyBookPayload) {
    const { id, userId } = payload;
    const myBook = await this.getMyBookById(id);

    if (myBook.userId !== userId) {
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }

    return myBook;
  }

  private transformToMyBookDetail(myBook: MyBookWithRelations): FormattedMyBookDetail {
    return {
      id: myBook.id,
      status: myBook.status,
      rating: myBook.rating,
      createdAt: myBook.createdAt,
      updatedAt: myBook.updatedAt,
      book: {
        url: myBook.book?.url || '',
        title: myBook.book?.title || '',
        thumbnail: myBook.book?.thumbnail || '',
        contents: myBook.book?.contents || '',
        publisher: myBook.book?.publisher || '',
        datetime: myBook.book?.datetime,
        authors: myBook.book?.authors.map((item) => item.author.name) || [],
        translators: myBook.book?.translators.map((item) => item.translator.name) || [],
      },
    };
  }
}
