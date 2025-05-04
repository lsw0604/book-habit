import type {
  CreateReviewLikePayload,
  DeleteReviewLikePayload,
  ResponseCreateReviewLike,
  ResponseDeleteReviewLike,
} from './interface';
import type { MyBookReviewWithUserId } from 'src/my-book-review/interface';
import { Injectable } from '@nestjs/common';
import { ReviewLike } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { MY_BOOK_REVIEW_SELECT_WITH_USER_ID } from 'src/my-book-review/constants';
import { NotFoundMyBookReviewException } from 'src/my-book-review/exceptions';
import {
  ReviewLikeAlreadyExistsException,
  SelfReviewLikeForbiddenAccessException,
  NotFoundReviewLikeException,
} from './exceptions';

@Injectable()
export class ReviewLikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(ReviewLikeService.name);
  }

  public async createReviewLike(
    payload: CreateReviewLikePayload,
  ): Promise<ResponseCreateReviewLike> {
    const { userId, myBookReviewId } = payload;

    return await this.prismaService.$transaction(async (prisma) => {
      // 리뷰 존재 여부 및 작성자 확인
      const myBookReview: MyBookReviewWithUserId = await prisma.myBookReview.findUnique({
        where: { id: myBookReviewId },
        select: MY_BOOK_REVIEW_SELECT_WITH_USER_ID,
      });

      if (!myBookReview) {
        throw new NotFoundMyBookReviewException(myBookReviewId);
      }

      // 자신의 리뷰에 좋아요를 누르는 경우 예외 발생
      if (myBookReview.myBook.userId === userId) {
        throw new SelfReviewLikeForbiddenAccessException(myBookReviewId, userId);
      }

      // 이미 좋아요가 있는지 확인
      const existingLike: ReviewLike = await prisma.reviewLike.findUnique({
        where: {
          userId_myBookReviewId: {
            myBookReviewId,
            userId,
          },
        },
      });

      // 이미 좋아요가 있으면 409 Conflict 에러 발생
      if (existingLike) {
        throw new ReviewLikeAlreadyExistsException(myBookReviewId, userId);
      }

      // 좋아요 생성
      const createdLike: ReviewLike = await prisma.reviewLike.create({
        data: {
          myBookReviewId,
          userId,
        },
      });

      return { reviewLike: createdLike };
    });
  }

  public async deleteReviewLike(
    payload: DeleteReviewLikePayload,
  ): Promise<ResponseDeleteReviewLike> {
    const { userId, myBookReviewId } = payload;

    // 좋아요 존재 여부 확인
    const existingLike: ReviewLike = await this.prismaService.reviewLike.findUnique({
      where: {
        userId_myBookReviewId: {
          myBookReviewId,
          userId,
        },
      },
    });

    if (!existingLike) {
      throw new NotFoundReviewLikeException(myBookReviewId);
    }

    // 좋아요 삭제
    const deletedLike: ReviewLike = await this.prismaService.reviewLike.delete({
      where: {
        userId_myBookReviewId: {
          myBookReviewId,
          userId,
        },
      },
    });

    return { reviewLike: deletedLike };
  }
}
