import type {
  CreateMyBookReviewPayload,
  GetMyBookReviewPayload,
  UpdateMyBookReviewPayload,
  DeleteMyBookReviewPayload,
  FormattedMyBookReview,
} from './interface';

import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoFieldsToUpdateException } from 'src/common/exceptions';
import {
  AlreadyExistMyBookReviewException,
  MyBookReviewForbiddenAccessException,
  NotFoundMyBookReviewException,
} from './exceptions';
import { MY_BOOK_REVIEW_SELECT_WITH_COUNTS } from './constants';

@Injectable()
export class MyBookReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookReviewService.name);
  }

  /**
   * * 사용자의 특정 도서 (MyBook)에 대한 리뷰를 생성합니다.
   * * 하나의 MyBook당 하나의 리뷰만 존재할 수 있습니다. (1:1 관계)
   *
   * @param {CreateMyBookReviewPayload} payload - 생성할 리뷰 정보
   * @param {Prisma.TransactionClient} [tx] - 선택적 트랜잭션 클라이언트
   * @returns {Promise<FormattedMyBookReview>} 생성된 리뷰 정보 (댓글/좋아요 수 포함)
   * @throws {AlreadyExistMyBookReviewException} 이미 해당 책에 리뷰가 존재할 경우
   */
  public async createMyBookReview(
    payload: CreateMyBookReviewPayload,
    tx?: Prisma.TransactionClient,
  ): Promise<FormattedMyBookReview> {
    const { isPublic, review, userId, myBookId } = payload;
    const prisma = tx || this.prismaService;

    if (!tx) {
      await this.myBookService.validateMyBookOwnership(myBookId, userId);
    }

    try {
      return await prisma.myBookReview.create({
        data: {
          myBookId,
          review,
          isPublic,
        },
        select: MY_BOOK_REVIEW_SELECT_WITH_COUNTS,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new AlreadyExistMyBookReviewException(myBookId);
      }
      throw err;
    }
  }

  /**
   * * 사용자의 특정 도서 (MyBook)에 대한 리뷰를 조회합니다.
   * * 리뷰가 존재하지 않으면 예외를 발생시킵니다.
   *
   * @param {GetMyBookReviewPayload} payload - 조회할 리뷰에 대한 정보
   * @returns {Promise<FormattedMyBookReview>} 조회된 리뷰 객체
   */
  public async getMyBookReview(payload: GetMyBookReviewPayload): Promise<FormattedMyBookReview> {
    const { myBookId, userId } = payload;

    await this.myBookService.validateMyBookOwnership(myBookId, userId);

    return await this.prismaService.myBookReview.findUnique({
      where: { myBookId },
      select: MY_BOOK_REVIEW_SELECT_WITH_COUNTS,
    });
  }

  /**
   * * 특정 리뷰의 내용을 수정합니다. (리뷰 내용 또는 공개 여부)
   *
   * @param {UpdateMyBookReviewPayload} payload - 업데이트할 리뷰 정보
   * @returns {Promise<FormattedMyBookReview>} 업데이트된 리뷰 객체
   * @throws {NoFieldsToUpdateException} 업데이트할 필드가 없는 경우
   */
  public async updateMyBookReview(
    payload: UpdateMyBookReviewPayload,
  ): Promise<FormattedMyBookReview> {
    const { myBookReviewId, userId, isPublic, review } = payload;

    await this.validateMyBookReviewOwnership(myBookReviewId, userId);

    const data: Prisma.MyBookReviewUpdateInput = {
      ...(isPublic !== undefined && { isPublic }),
      ...(review !== undefined && { review }),
    };

    if (Object.keys(data).length === 0) {
      throw new NoFieldsToUpdateException();
    }

    return await this.prismaService.myBookReview.update({
      where: { id: myBookReviewId },
      data,
      select: MY_BOOK_REVIEW_SELECT_WITH_COUNTS,
    });
  }

  /**
   * * 특정 리뷰를 삭제합니다. (Cascade Delete로 연관된 좋아요, 댓글 자동 삭제)
   *
   * @param {DeleteMyBookReviewPayload} payload - 삭제할 리뷰 정보
   * @returns {Promise<void>}
   */
  public async deleteMyBookReview(payload: DeleteMyBookReviewPayload): Promise<void> {
    const { myBookReviewId, userId } = payload;

    // 1. 소유권 검증 (존재 여부 및 본인 리뷰 확인)
    await this.validateMyBookReviewOwnership(myBookReviewId, userId);

    // 2. Cascade Delete에 의해 연관된 댓글/좋아요 DB에서 자동 삭제됨
    await this.prismaService.myBookReview.delete({
      where: { id: myBookReviewId },
    });
  }

  /**
   * * 주어진 MyBookReview ID가 존재하는지, 그리고 연관된 MyBook이 해당 사용자의 소유인지 확인합니다.
   * * 소유권이 없거나 Review가 존재하지 않으면 예외를 던집니다.
   *
   * @param {number} myBookReviewId - 확인할 MyBookReview의 ID
   * @param {number} userId - 작업을 요청한 사용자의 ID
   * @private
   * @throws {NotFoundMyBookReviewException} Review 리소스가 존재하지 않을 때
   * @throws {MyBookReviewForbiddenAccessException} Review는 존재하지만 소유권이 없을 때
   */
  private async validateMyBookReviewOwnership(myBookReviewId: number, userId: number) {
    const myBookReview = await this.prismaService.myBookReview.findUnique({
      where: { id: myBookReviewId },
      select: {
        myBook: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!myBookReview) {
      throw new NotFoundMyBookReviewException(myBookReviewId);
    }
    const ownerId = myBookReview.myBook.userId;
    if (ownerId !== userId) {
      throw new MyBookReviewForbiddenAccessException({ myBookReviewId, userId, ownerId });
    }
  }
}
