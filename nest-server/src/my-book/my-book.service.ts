import type {
  FormattedMyBook,
  FormattedMyBooks,
  FormattedMyBookDetail,
  MyBookWithRelations,
  MyBooksWithRelations,
  CreateMyBookPayload,
  GetMyBookPayload,
  GetMyBooksPayload,
  UpdateMyBookPayload,
  DeleteMyBookPayload,
  DeleteMyBookResponse,
} from './interface';
import type { FormattedBook } from 'src/book/interface';
import type { PaginationOptions } from 'src/common/utils/pagination.util';
import { Injectable } from '@nestjs/common';
import { MyBookStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from 'src/book/book.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { NoFieldsToUpdateException } from 'src/common/exceptions';
import { PaginationUtil } from 'src/common/utils/pagination.util';
import {
  NotFoundMyBookException,
  AlreadyExistMyBookException,
  MyBookForbiddenAccessException,
} from './exceptions';
import {
  MY_BOOK_PAGE_SIZE,
  MY_BOOK_INCLUDE_BOOK_BASIC,
  MY_BOOK_INCLUDE_BOOK_DETAILS,
} from './constant';

/**
 * * MyBook 관련 기능을 담당하는 서비스
 * * 사용자의 책 컬렉션을 관리하고 CRUD 작업을 수행합니다.
 */
@Injectable()
export class MyBookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookService.name);
  }

  /**
   * * 새로운 MyBook을 생성합니다.
   * * ISBN을 통해 기존 책이 있는지 확인하고, 없다면 새로 등록합니다.
   *
   * @param {CreateMyBookPayload} payload - 책 생성에 필요한 데이터
   * @returns {Promise<CreateMyBookResponse>} 생성된 MyBook 정보
   */
  public async createMyBook(payload: CreateMyBookPayload): Promise<FormattedMyBook> {
    const { isbns, userId, ...bookPayload } = payload;

    const { id: bookId }: FormattedBook = await this.bookService.findOrCreateBook({
      isbns,
      ...bookPayload,
    });

    try {
      const myBook: MyBooksWithRelations = await this.prismaService.myBook.create({
        data: {
          userId,
          bookId,
        },
        include: MY_BOOK_INCLUDE_BOOK_BASIC,
      });

      return this.transformToFormatMyBook(myBook);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new AlreadyExistMyBookException(userId, bookId);
      }
      throw err;
    }
  }

  /**
   * * 특정 MyBook의 상세 정보를 조회합니다.
   * @param {GetMyBookPayload} payload - 조회할 MyBook ID와 사용자 ID
   * @returns {Promise<GetMyBookResponse>} MyBook 상세 정보
   */
  public async getMyBook(payload: GetMyBookPayload): Promise<FormattedMyBookDetail> {
    const { id, userId } = payload;
    await this.validateMyBookOwnership(id, userId);

    const myBook: MyBookWithRelations = await this.prismaService.myBook.findUnique({
      where: {
        id,
        userId,
      },
      include: MY_BOOK_INCLUDE_BOOK_DETAILS,
    });

    return this.transformToMyBookDetail(myBook);
  }

  /**
   * * 사용자의 MyBook 목록을 페이지네이션하여 조회합니다.
   *
   * @param {GetMyBooksPayload} payload - 조회 조건 (사용자 ID, 상태, 페이지, 정렬)
   * @returns {Promise<GetMyBooksResponse>} 페이지네이션된 MyBook 목록
   */
  public async getMyBooks(payload: GetMyBooksPayload): Promise<FormattedMyBooks> {
    const { userId, status, pageNumber } = payload;

    const paginationOptions: PaginationOptions = {
      pageNumber,
      pageSize: MY_BOOK_PAGE_SIZE,
    };

    const { skip, take } = PaginationUtil.getSkipTake(paginationOptions);

    let statusCondition: { status?: MyBookStatus } = {};

    if (status && status !== 'ALL') {
      switch (status) {
        case 'WANT_TO_READ':
          statusCondition = { status: MyBookStatus.WANT_TO_READ };
          break;
        case 'CURRENTLY_READING':
          statusCondition = { status: MyBookStatus.CURRENTLY_READING };
          break;
        case 'READ':
          statusCondition = { status: MyBookStatus.READ };
          break;
        default:
          statusCondition = { status: undefined };
          break;
      }
    }

    const where: Prisma.MyBookWhereInput = {
      userId,
      ...statusCondition,
    };

    const orderBy: Prisma.MyBookOrderByWithRelationInput = { createdAt: payload.orderBy };

    const [totalCount, books] = await Promise.all([
      this.prismaService.myBook.count({ where }),
      this.prismaService.myBook.findMany({
        where,
        include: MY_BOOK_INCLUDE_BOOK_BASIC,
        skip,
        take,
        orderBy,
      }),
    ]);

    const paginationMeta = PaginationUtil.getPaginationMeta(totalCount, paginationOptions);

    const formattedBooks: FormattedMyBook[] = this.transformToFormatMyBooks(books);

    return {
      books: formattedBooks,
      meta: paginationMeta,
    };
  }

  /**
   * * MyBook의 정보(상태, 평점)를 업데이트합니다.
   *
   * @param {UpdateMyBookPayload} payload - 업데이트할 정보
   * @returns {Promise<UpdateMyBookResponse>} 업데이트된 MyBook 정보
   */
  public async updateMyBook(payload: UpdateMyBookPayload): Promise<FormattedMyBookDetail> {
    const { id, userId, rating, status } = payload;

    await this.validateMyBookOwnership(id, userId);

    const where: Prisma.MyBookWhereUniqueInput = { id, userId };
    const data: Prisma.MyBookUpdateInput = {
      ...(rating !== undefined && { rating }),
      ...(status !== undefined && { status }),
    };

    if (Object.keys(data).length === 0) {
      throw new NoFieldsToUpdateException();
    }

    const updateMyBook: MyBookWithRelations = await this.prismaService.myBook.update({
      where,
      data,
      include: MY_BOOK_INCLUDE_BOOK_DETAILS,
    });

    return this.transformToMyBookDetail(updateMyBook);
  }

  /**
   * * MyBook과 관련된 모든 데이터(태그, 리뷰, 좋아요, 댓글 등)를 삭제합니다.
   * * 트랜잭션으로 처리되어 모든 작업이 성공하거나 모두 롤백됩니다.
   *
   * @param {DeleteMyBookPayload} payload - 삭제할 MyBook ID와 사용자 ID
   * @returns {Promise<DeleteMyBookResponse>} 삭제된 MyBook ID
   */
  public async deleteMyBook(payload: DeleteMyBookPayload): Promise<DeleteMyBookResponse> {
    const { id, userId } = payload;

    await this.validateMyBookOwnership(id, userId);

    await this.prismaService.$transaction(async (prisma) => {
      // MY BOOK을 삭제하기전 MY BOOK과 연결된 REVIEW를 찾습니다.
      const { id: myBookReviewId } = await prisma.myBookReview.findUnique({
        where: {
          myBookId: id,
        },
        select: {
          id: true,
        },
      });

      if (myBookReviewId) {
        // REVIEW와 연결된 COMMENT들을 삭제합니다.
        await prisma.reviewComment.deleteMany({ where: { myBookReviewId } });

        // REVIEW와 연결된 LIKE들을 삭제합니다.
        await prisma.reviewLike.deleteMany({ where: { myBookReviewId } });

        // MY BOOK과 연결된 REVIEW를 삭제합니다.
        await prisma.myBookReview.delete({ where: { myBookId: id } });
      }

      // MY BOOK과 연결된 HISTORY를 삭제합니다.
      await prisma.myBookHistory.deleteMany({ where: { myBookId: id } });

      // MY BOOK을 삭제합니다.
      await prisma.myBook.delete({
        where: { id, userId },
      });
    });
    return { id };
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

  private transformToFormatMyBook(myBook: MyBooksWithRelations): FormattedMyBook {
    const { id, book, rating, status } = myBook;
    const { title, thumbnail } = book;
    return {
      id,
      title,
      thumbnail,
      rating,
      status,
    };
  }

  private transformToFormatMyBooks(myBooks: MyBooksWithRelations[]): FormattedMyBook[] {
    return myBooks.map(({ id, status, rating, book: { title, thumbnail } }) => {
      return {
        id,
        title,
        thumbnail,
        status,
        rating,
      };
    });
  }

  /**
   * * MyBook의 존재 여부와 소유권을 검증합니다.
   *
   * @param myBookId - 검증할 MyBook ID
   * @param userId - 검증할 사용자 ID
   * @throws {NotFoundMyBookException} MyBook이 존재하지 않을 경우
   * @throws {MyBookForbiddenAccessException} 사용자가 MyBook의 소유자가 아닌 경우
   */
  public async validateMyBookOwnership(myBookId: number, userId: number): Promise<void> {
    const where: Prisma.MyBookWhereUniqueInput = { id: myBookId };
    const existMyBook = await this.prismaService.myBook.findUnique({
      where,
      select: { userId: true },
    });

    if (!existMyBook) throw new NotFoundMyBookException(myBookId);
    const ownerId = existMyBook.userId;
    if (ownerId !== userId) throw new MyBookForbiddenAccessException({ myBookId, ownerId, userId });
  }
}
