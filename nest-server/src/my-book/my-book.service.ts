import type {
  FormattedMyBook,
  FormattedMyBookDetail,
  MyBookWithRelations,
  CreateMyBookPayload,
  CreateMyBookResponse,
  GetMyBookPayload,
  GetMyBookResponse,
  GetMyBooksPayload,
  GetMyBooksResponse,
  UpdateMyBookPayload,
  UpdateMyBookResponse,
  DeleteMyBookPayload,
  DeleteMyBookResponse,
  ValidateMyBookPayload,
} from './interface/my.book.interface';
import type { FormattedBook } from 'src/book/interface';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MyBook, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from 'src/book/book.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { PaginationOptions, PaginationUtil } from 'src/common/utils/pagination.util';
import { NotFoundMyBookException } from './exceptions';

/**
 * * MyBook 관련 기능을 담당하는 서비스
 * * 사용자의 책 컬렉션을 관리하고 CRUD 작업을 수행합니다.
 */
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

  /**
   * * 새로운 MyBook을 생성합니다.
   * * ISBN을 통해 기존 책이 있는지 확인하고, 없다면 새로 등록합니다.
   *
   * @param {CreateMyBookPayload} payload - 책 생성에 필요한 데이터
   * @returns {Promise<CreateMyBookResponse>} 생성된 MyBook 정보
   */
  public async createMyBook(payload: CreateMyBookPayload): Promise<CreateMyBookResponse> {
    const { isbns, userId } = payload;
    this.logger.log(`사용자 ${userId}가 새 책 등록 시도: ISBNs = ${isbns.join(', ')}`);

    // isbn을 갖고 있는 책이 DB에 있는지 검색
    let bookId: number;
    const existBook: FormattedBook | null = await this.bookService.findBookByISBN(isbns);

    // 해당 책이 존재한다면
    if (existBook) {
      this.logger.log(`기존 책 발견: ${existBook.title} (ID: ${existBook.id})`);
      bookId = existBook.id;
    } else {
      this.logger.log('기존 책을 찾을 수 없어 새로 등록합니다');
      const registeredBook = await this.bookService.registerBook(payload);
      bookId = registeredBook.id;
    }

    this.logger.log(`사용자 ${userId}의 MyBook 생성 시도: BookID = ${bookId}`);
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

    this.logger.log(`MyBook 생성 성공: ID = ${myBookId}, 제목 = ${title}`);

    const formattedBook: FormattedMyBook = {
      myBookId,
      title,
      thumbnail,
      rating,
      status,
    };

    return formattedBook;
  }

  /**
   * * 특정 MyBook의 상세 정보를 조회합니다.
   *
   * @param {GetMyBookPayload} payload - 조회할 MyBook ID와 사용자 ID
   * @returns {Promise<GetMyBookResponse>} MyBook 상세 정보
   */
  public async getMyBook(payload: GetMyBookPayload): Promise<GetMyBookResponse> {
    const { id, userId } = payload;
    this.logger.log(`사용자 ${userId}가 MyBook ${id} 조회 시도`);

    await this.validateMyBook({ id, userId });

    const myBook = (await this.prismaService.myBook.findUnique({
      where: {
        id,
        userId,
      },
      include: this.MY_BOOK_INCLUDE,
    })) as MyBookWithRelations;

    this.logger.log(`MyBook ${id} 조회 성공: 제목 = ${myBook.book?.title}`);
    return this.transformToMyBookDetail(myBook);
  }

  /**
   * * 사용자의 MyBook 목록을 페이지네이션하여 조회합니다.
   *
   * @param {GetMyBooksPayload} payload - 조회 조건 (사용자 ID, 상태, 페이지, 정렬)
   * @returns {Promise<GetMyBooksResponse>} 페이지네이션된 MyBook 목록
   */
  public async getMyBooks(payload: GetMyBooksPayload): Promise<GetMyBooksResponse> {
    const { userId, status, pageNumber, orderBy } = payload;
    this.logger.log(
      `사용자 ${userId}의 MyBook 목록 조회: 페이지 = ${pageNumber}, 정렬 = ${orderBy}, 상태 = ${status}`,
    );

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

    this.logger.log(`MyBook 목록 조회 결과: ${books.length}개 항목, 총 ${totalCount}개 중`);

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

  /**
   * * MyBook의 정보(상태, 평점)를 업데이트합니다.
   *
   * @param {UpdateMyBookPayload} payload - 업데이트할 정보
   * @returns {Promise<UpdateMyBookResponse>} 업데이트된 MyBook 정보
   */
  public async updateMyBook(payload: UpdateMyBookPayload): Promise<UpdateMyBookResponse> {
    const { id, userId, rating, status } = payload;
    this.logger.log(
      `사용자 ${userId}의 MyBook ${id} 업데이트 시도: rating=${rating}, status=${status}`,
    );

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

    this.logger.log(`MyBook ${id} 업데이트 성공`);
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
    this.logger.log(`사용자 ${userId}의 MyBook ${id} 삭제 시도`);

    const myBook = await this.validateMyBook({ id, userId });

    try {
      await this.prismaService.$transaction(async (prisma) => {
        this.logger.log(`MyBook ${id}의 독서 기록 삭제 시작`);
        await prisma.myBookHistory.deleteMany({
          where: {
            myBookId: myBook.id,
          },
        });

        this.logger.log(`MyBook ${id}의 리뷰 관련 데이터 삭제 시작`);
        const reviews = await prisma.myBookReview.findMany({
          where: { myBookId: myBook.id },
          select: { id: true },
        });

        const reviewIds = reviews.map((review) => review.id);
        this.logger.log(`삭제할 리뷰 ID: ${reviewIds.join(', ')}`);

        if (reviewIds.length > 0) {
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
        }

        await prisma.myBookReview.deleteMany({
          where: { myBookId: myBook.id },
        });

        this.logger.log(`MyBook ${id}의 태그 삭제 시작`);
        await prisma.myBookTag.deleteMany({
          where: { myBookId: myBook.id },
        });

        this.logger.log(`MyBook ${id} 삭제 시작`);
        await prisma.myBook.delete({
          where: { id: myBook.id },
        });
      });

      this.logger.log(`MyBook ${id} 삭제 완료`);
    } catch (error) {
      this.logger.error(`MyBook ${id} 삭제 중 오류 발생`, error.stack);
      throw error;
    }

    return { id: myBook.id };
  }

  /**
   * * 주어진 MyBook이 특정 사용자에게 속해있는지 확인합니다.
   * * 권한이 없는 경우 UnauthorizedException을 발생시킵니다.
   *
   * @param {ValidateMyBookPayload} payload - 확인할 MyBook ID와 사용자 ID
   * @returns {Promise<MyBook>} 유효한 MyBook 객체
   * @throws {UnauthorizedException} 권한이 없는 경우
   */
  public async validateMyBook(payload: ValidateMyBookPayload): Promise<MyBook> {
    const { id, userId } = payload;
    this.logger.log(`MyBook ${id}에 대한 사용자 ${userId}의 권한 확인`);

    const myBook: MyBook = await this.getMyBookById(id);

    if (myBook.userId !== userId) {
      this.logger.warn(
        `권한 오류: 사용자 ${userId}는 MyBook ${id}에 접근할 수 없음 (소유자: ${myBook.userId})`,
      );
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }

    return myBook;
  }

  /**
   * * ID로 MyBook을 조회합니다.
   *
   * @param {number} id - 조회할 MyBook ID
   * @returns {Promise<MyBook>} MyBook 객체
   * @throws {NotFoundBookException} 해당 ID의 MyBook이 없는 경우
   * @private
   */
  private async getMyBookById(id: number): Promise<MyBook> {
    this.logger.log(`ID ${id}로 MyBook 조회`);

    const myBook: MyBook = await this.prismaService.myBook.findUnique({
      where: {
        id,
      },
    });

    if (!myBook) {
      this.logger.warn(`MyBook ${id} 찾을 수 없음`);
      throw new NotFoundMyBookException(id);
    }

    return myBook;
  }

  /**
   * * MyBookWithRelations 객체를 FormattedMyBookDetail로 변환합니다.
   *
   * @param {MyBookWithRelations} myBook - 변환할 MyBook 객체
   * @returns {FormattedMyBookDetail} 형식화된 MyBook 상세 정보
   * @private
   */
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
