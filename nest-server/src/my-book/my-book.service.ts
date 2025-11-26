import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from 'src/book/book.service';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  NotFoundMyBookException,
  MyBookForbiddenAccessException,
  MyBookPageExceededException,
} from './exceptions';
import { myBookListSelect } from './types';
import { PaginationUtil } from 'src/common/utils';
import { CreateMyBookReqDto, GetMyBooksReqDto, UpdateMyBookReqDto } from './dto';

@Injectable()
export class MyBookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookService.name);
  }

  public async create(payload: CreateMyBookReqDto & { userId: number }) {
    const { isbn, status, userId } = payload;
    const { id: bookId } = await this.bookService.findOrCreate(isbn);

    return await this.prismaService.myBook.upsert({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
      create: {
        userId,
        bookId,
        status,
      },
      update: {
        status,
      },
    });
  }

  public async getMyBookDetail(userId: number, myBookId: number) {
    const myBook = await this.prismaService.myBook.findUnique({
      where: {
        id: myBookId,
      },
      include: {
        book: true,
      },
    });

    if (!myBook) throw new NotFoundMyBookException(myBookId);

    if (myBook.userId !== userId) throw new ForbiddenException('해당 기록에 접근권한이 없습니다.');

    return myBook;
  }

  public async getMyBooks(payload: GetMyBooksReqDto & { userId: number }) {
    const { orderBy, pageNumber, status, userId } = payload;
    const pageSize = 10;

    const { skip, take } = PaginationUtil.getSkipTake({ pageNumber, pageSize });

    const whereCondition: Prisma.MyBookWhereInput = {
      userId,
      status: status === 'ALL' ? undefined : status,
    };

    const [totalCount, books] = await this.prismaService.$transaction([
      this.prismaService.myBook.count({ where: whereCondition }),
      this.prismaService.myBook.findMany({
        where: whereCondition,
        select: myBookListSelect,
        skip,
        take,
        orderBy: { createdAt: orderBy },
      }),
    ]);

    const meta = PaginationUtil.getPaginationMeta(totalCount, { pageNumber, pageSize });

    return {
      meta,
      books,
    };
  }

  public async updateMyBook(payload: UpdateMyBookReqDto & { userId: number; id: number }) {
    const { id, userId, ...dto } = payload;

    const existData = await this.validateMyBookOwnership(id, userId);

    if (dto.currentPage && dto.currentPage > existData.book.totalPage) {
      throw new MyBookPageExceededException(dto.currentPage, existData.book.totalPage);
    }

    return await this.prismaService.myBook.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
      include: { book: true },
    });
  }

  public async deleteMyBook(myBookId: number, userId: number) {
    await this.validateMyBookOwnership(myBookId, userId);
    await this.prismaService.myBook.delete({
      where: { id: myBookId },
    });

    return { id: myBookId };
  }

  /**
   * * MyBook의 존재 여부와 소유권을 검증합니다.
   *
   * @param myBookId - 검증할 MyBook ID
   * @param userId - 검증할 사용자 ID
   * @throws {NotFoundMyBookException} MyBook이 존재하지 않을 경우
   * @throws {MyBookForbiddenAccessException} 사용자가 MyBook의 소유자가 아닌 경우
   */
  public async validateMyBookOwnership(myBookId: number, userId: number) {
    const where: Prisma.MyBookWhereUniqueInput = { id: myBookId };
    const existMyBook = await this.prismaService.myBook.findUnique({
      where,
      select: { userId: true, book: { select: { totalPage: true } } },
    });

    if (!existMyBook) throw new NotFoundMyBookException(myBookId);
    const ownerId = existMyBook.userId;
    if (ownerId !== userId) throw new MyBookForbiddenAccessException({ myBookId, ownerId, userId });

    return existMyBook;
  }
}
