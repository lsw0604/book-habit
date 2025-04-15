import type {
  GetMyBookByIdPayload,
  GetMyBookDetailPayload,
  GetMyBookListPayload,
  UpdateMyBookPayload,
  DeleteMyBookPayload,
  ValidateMyBookPayload,
  CreateMyBookPayload,
} from './interface/my.book.interface';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BookService } from './book.service';
import { AuthorService } from './author.service';
import { TranslatorService } from './translator.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class MyBookService {
  private readonly PAGE_SIZE = 10;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly authorService: AuthorService,
    private readonly translatorService: TranslatorService,
    private readonly bookService: BookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookService.name);
  }

  /**
   * TODO 멱등성 유지를 고려해보기
   */
  async createMyBook(payload: CreateMyBookPayload) {
    const { isbn, userId } = payload;

    // isbn을 갖고 있는 책이 DB에 있는지 검색
    const existBook = await this.bookService.existBookISBN({ isbn });

    // 해당 책이 존재한다면
    if (existBook) {
      const bookId = existBook.id;

      const myBook = await this.prismaService.myBook.create({
        data: {
          bookId,
          userId,
        },
      });

      return {};
    }

    const book = await this.bookService.registerBook(payload);

    return await this.prismaService.myBook.create({
      data: {
        userId: dto.userId,
        bookId: book.id,
      },
    });
  }

  async getMyBookDetail(payload: GetMyBookDetailPayload) {
    const myBook = await this.validateMyBook({ id: payload.id, userId: payload.userId });

    const myBookDetail = await this.prismaService.myBook.findUnique({
      where: {
        id: myBook.id,
        userId: myBook.userId,
      },
      select: {
        id: true,
        book: {
          select: {
            thumbnail: true,
            title: true,
            url: true,
            contents: true,
            authors: {
              select: {
                author: true,
              },
            },
            publisher: true,
            datetime: true,
          },
        },
        rating: true,
        status: true,
        tag: {
          select: {
            tagId: true,
            id: true,
            tag: {
              select: {
                value: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: myBookDetail.id,
      book: {
        thumbnail: myBookDetail.book.thumbnail,
        title: myBookDetail.book.title,
        url: myBookDetail.book.url,
        contents: myBookDetail.book.contents,
        authors: myBookDetail.book.authors.map((item) => item.author.name),
        publisher: myBookDetail.book.publisher,
        datetime: myBookDetail.book.datetime,
      },
      rating: myBookDetail.rating,
      status: myBookDetail.status,
      tag: myBookDetail.tag.map((item) => {
        return {
          myBookId: myBook.id,
          myBookTagId: item.id,
          tag: item.tag.value,
        };
      }),
      createdAt: myBookDetail.createdAt,
      updatedAt: myBookDetail.updatedAt,
    };
  }

  async getMyBookList(payload: GetMyBookListPayload) {
    const { status, orderBy, pageNumber, userId } = payload;
    const take = this.PAGE_SIZE;
    const skip = (pageNumber - 1) * take;

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

    const totalPages = Math.ceil(totalCount / take);
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : undefined;

    const formattedBooks = books.map((book) => {
      // undefined 확인 로직 추가
      if (!book || !book.book) {
        return {
          id: book?.id || 'unknown',
          title: 'Unknown Title',
          thumbnail: '',
          status: book?.status || 'UNKNOWN',
          rating: book?.rating || 0,
        };
      }

      return {
        id: book.id,
        title: book.book.title || 'No Title',
        thumbnail: book.book.thumbnail || '',
        status: book.status,
        rating: book.rating || 0,
      };
    });

    const result = {
      nextPage,
      books: formattedBooks,
    };

    return result;
  }

  async updateMyBook(dto: UpdateMyBookPayload) {
    const myBook = await this.validateMyBook({ id: dto.myBookId, userId: dto.userId });
    const myBookDetail = await this.prismaService.myBook.update({
      where: {
        id: myBook.id,
      },
      data: {
        status: dto.status,
        rating: dto.rating,
      },
      select: {
        id: true,
        book: {
          select: {
            thumbnail: true,
            title: true,
            url: true,
            contents: true,
            authors: {
              select: {
                author: true,
              },
            },
            publisher: true,
            datetime: true,
          },
        },
        rating: true,
        status: true,
        tag: {
          select: {
            tagId: true,
            id: true,
            tag: {
              select: {
                value: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: myBookDetail.id,
      book: {
        ...myBookDetail.book,
        authors: myBookDetail.book.authors.map((item) => item.author.name),
      },
      rating: myBookDetail.rating,
      status: myBookDetail.status,
      tag: myBookDetail.tag.map((item) => {
        return {
          myBookId: myBook.id,
          myBookTagId: item.id,
          tag: item.tag.value,
        };
      }),
      createdAt: myBookDetail.createdAt,
      updatedAt: myBookDetail.updatedAt,
    };
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

  async getMyBookById(payload: GetMyBookByIdPayload) {
    const myBook = await this.prismaService.myBook.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!myBook) {
      throw new NotFoundException(`해당 MyBook을 찾을 수 없습니다. CODE:${payload.id}`);
    }

    return myBook;
  }

  async validateMyBook(payload: ValidateMyBookPayload) {
    const myBook = await this.getMyBookById({ id: payload.id });

    if (myBook.userId !== payload.userId) {
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }

    return myBook;
  }
}
