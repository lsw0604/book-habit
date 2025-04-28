import type {
  CreateMyBookReviewPayload,
  GetMyBookReviewPayload,
  UpdateMyBookReviewPayload,
  DeleteMyBookReviewResponse,
  DeleteMyBookReviewPayload,
  FormattedMyBookReview,
} from './interface';

import { MyBook, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoFieldsToUpdateException } from 'src/common/exceptions';
import {
  AlreadyExistMyBookReviewException,
  MyBookReviewForbiddenAccessException,
  NotFoundMyBookReviewException,
} from './exceptions';
import { MyBookForbiddenAccessException, NotFoundMyBookException } from 'src/my-book/exceptions';
import { MY_BOOK_REVIEW_SELECT_WITH_COUNTS } from './constants';

@Injectable()
export class MyBookReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookReviewService.name);
  }

  /**
   * * 사용자의 특정 도서 (MyBook)에 대한 리뷰를 생성합니다.
   * * 하나의 MyBook당 하나의 리뷰만 존재할 수 있습니다. (1:1 관계)
   *
   * @param {CreateMyBookReviewPayload} payload - 생성할 리뷰 정보
   * @param {number} payload.myBookId - 리뷰를 작성할 MyBook의 ID
   * @param {number} payload.userId - 리뷰 작성자(사용자) ID
   * @param {string} payload.review - 리뷰 내용
   * @param {boolean} payload.isPublic - 리뷰 공개 여부
   * @returns {Promise<ResponseMyBookReview>} 생성된 리뷰 정보 (댓글/좋아요 수 포함)
   * @throws {AlreadyExistMyBookReviewException} 이미 해당 책에 리뷰가 존재할 경우
   */
  public async createMyBookReview(
    payload: CreateMyBookReviewPayload,
  ): Promise<FormattedMyBookReview> {
    const { isPublic, myBookId, review, userId } = payload;
    await this.validateMyBookOwnership(myBookId, userId);

    try {
      const myBookReview: FormattedMyBookReview = await this.prismaService.myBookReview.create({
        data: {
          myBookId,
          review,
          isPublic,
        },
        select: MY_BOOK_REVIEW_SELECT_WITH_COUNTS,
      });
      return myBookReview;
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
   * @param {number} payload.myBookId - 조회할 MyBook ID
   * @param {number} payload.userId - 리뷰 작성자 사용자 ID
   * @returns {Promise<ResponseMyBookReview>} 조회된 리뷰 객체
   */
  public async getMyBookReview(payload: GetMyBookReviewPayload): Promise<FormattedMyBookReview> {
    const { myBookId, userId } = payload;

    await this.validateMyBookOwnership(myBookId, userId);
    const where: Prisma.MyBookReviewWhereUniqueInput = { id: myBookId };
    const myBookReview = await this.prismaService.myBookReview.findUnique({
      where,
      select: MY_BOOK_REVIEW_SELECT_WITH_COUNTS,
    });
    return myBookReview;
  }

  /**
   * * 특정 리뷰의 내용을 수정합니다. (리뷰 내용 또는 공개 여부)
   *
   * @param {UpdateMyBookReviewPayload} payload - 업데이트할 리뷰 정보
   * @param {number} payload.myBookReviewId - 업데이트할 리뷰 ID
   * @param {number} payload.userId - 리뷰 소유자 ID
   * @param {string} [payload.review] - 변경할 리뷰 내용 (선택적)
   * @param {boolean} [payload.isPublic] - 변경할 공개 여부 (선택적)
   * @returns {Promise<ResponseMyBookReview>} 업데이트된 리뷰 객체
   * @throws {NoFieldsToUpdateException} 업데이트할 필드가 없는 경우
   */
  public async updateMyBookReview(
    payload: UpdateMyBookReviewPayload,
  ): Promise<FormattedMyBookReview> {
    const { myBookReviewId, userId, isPublic, review } = payload;

    await this.validateMyBookReviewOwnership(myBookReviewId, userId);

    const where: Prisma.MyBookReviewWhereUniqueInput = { id: myBookReviewId };
    const data: Prisma.MyBookReviewUpdateInput = {
      ...(isPublic !== undefined && { isPublic }),
      ...(review !== undefined && { review }),
    };

    if (Object.keys(data).length === 0) {
      throw new NoFieldsToUpdateException();
    }
    const updatedReview: FormattedMyBookReview = await this.prismaService.myBookReview.update({
      where,
      data,
      select: MY_BOOK_REVIEW_SELECT_WITH_COUNTS,
    });

    return updatedReview;
  }

  /**
   * * 특정 리뷰와 관련된 모든 데이터 (좋아요, 댓글 포람)을 삭제합니다.
   *
   * @param {UpdateMyBookReviewPayload} payload - 삭제할 리뷰 정보
   * @param {number} payload.myBookReviewId - 삭제할 리뷰 ID
   * @param {number} payload.userId - 리뷰 소유자 ID
   * @returns {Promise<DeleteMyBookReviewResponse>} 삭제된 리뷰 ID
   */
  public async deleteMyBookReview(
    payload: DeleteMyBookReviewPayload,
  ): Promise<DeleteMyBookReviewResponse> {
    const { myBookReviewId, userId } = payload;
    await this.validateMyBookReviewOwnership(myBookReviewId, userId);
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.reviewComment.deleteMany({
        where: {
          myBookReviewId,
          myBookReview: {
            myBook: {
              userId,
            },
          },
        },
      });

      await prisma.reviewLike.deleteMany({
        where: {
          myBookReviewId,
          myBookReview: {
            myBook: {
              userId,
            },
          },
        },
      });
      await prisma.myBookReview.delete({
        where: {
          id: myBookReviewId,
          myBook: {
            userId,
          },
        },
      });
    });

    return {
      myBookReviewId,
    };
  }

  /**
   * * 주어진 MyBook ID가 존재하는지, 그리고 해당 사용자의 소유인지 확인합니다.
   * * 소유권이 없거나 MyBook이 존재하지 않으면 예외를 던집니다.
   *
   * @param {number} myBookId - 확인할 MyBook의 ID
   * @param {number} userId - 작업을 요청한 사용자의 ID
   * @private
   * @throws {NotFoundMyBookException} MyBook 리소스가 존재하지 않을 때
   * @throws {MyBookForbiddenAccessException} MyBook 리소스는 존재하지만 소유권이 없을 때
   */
  private async validateMyBookOwnership(myBookId: number, userId: number) {
    const where: Prisma.MyBookWhereUniqueInput = { id: myBookId };

    const myBook: Pick<MyBook, 'id' | 'userId'> = await this.prismaService.myBook.findUnique({
      where,
      select: {
        id: true,
        userId: true,
      },
    });

    if (!myBook) {
      throw new NotFoundMyBookException(myBookId);
    }
    const ownerId = myBook.userId;
    if (ownerId !== userId) {
      throw new MyBookForbiddenAccessException({ myBookId, ownerId, userId });
    }
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
    const where: Prisma.MyBookReviewWhereUniqueInput = { id: myBookReviewId };

    const myBookReview = await this.prismaService.myBookReview.findUnique({
      where,
      select: {
        myBook: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!myBookReview) {
      throw new NotFoundMyBookReviewException({ myBookReviewId });
    }
    const ownerId = myBookReview.myBook.userId;
    if (ownerId !== userId) {
      throw new MyBookReviewForbiddenAccessException({ myBookReviewId, userId, ownerId });
    }
  }
}
