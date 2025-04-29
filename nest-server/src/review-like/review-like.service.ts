import type { ToggleReviewLikePayload, ResponseToggleReviewLike } from './interface';
import { Injectable } from '@nestjs/common';
import { ReviewLike } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { NotFoundMyBookReviewException } from 'src/my-book-review/exceptions';
import { SelfReviewLikeForbiddenAccessException } from './exceptions';

@Injectable()
export class ReviewLikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(ReviewLikeService.name);
  }

  /**
   * * 특정 리뷰에 대한 사용자의 '좋아요' 상태를 토글합니다.
   * * 이미 좋아요를 눌렀다면 취소하고, 누르지 않았다면 생성합니다.
   * * 자기 자신의 리뷰에는 '좋아요'를 누를 수 없습니다.
   *
   * @param {ToggleReviewLIkePayload} payload - 토글 작업에 필요한 정보
   * @param {number} payload.userId - '좋아요'를 누르는 사용자의 ID
   * @param {number} payload.myBookReviewId - '좋아요' 대상 리뷰의 ID
   * @returns {Promise<ResponseToggleReviewLike>} - 토글 결과
   * @throws {NotFoundMyBookReviewException} 대상 리뷰를 찾을 수 없을 때 발생
   * @throws {SelfReviewLikeForbiddenAccessException} 사용자가 자신의 리뷰에 '좋아요'를 시도할 때 발생
   */
  public async toggleReviewLike(
    payload: ToggleReviewLikePayload,
  ): Promise<ResponseToggleReviewLike> {
    const { userId, myBookReviewId } = payload;
    const result: ResponseToggleReviewLike = await this.prismaService.$transaction(
      async (prisma) => {
        const myBookReview = await prisma.myBookReview.findUnique({
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

        if (myBookReview.myBook.userId === userId) {
          throw new SelfReviewLikeForbiddenAccessException(myBookReviewId, userId);
        }

        const reviewLike: ReviewLike = await prisma.reviewLike.findUnique({
          where: {
            userId_myBookReviewId: {
              myBookReviewId,
              userId,
            },
          },
        });

        if (reviewLike) {
          const deleteLike: ReviewLike = await prisma.reviewLike.delete({
            where: { userId_myBookReviewId: { myBookReviewId, userId } },
          });

          return {
            reviewLike: deleteLike,
            action: 'deleted' as const,
          };
        } else {
          const createLike: ReviewLike = await prisma.reviewLike.create({
            data: {
              myBookReviewId,
              userId,
            },
          });

          return {
            reviewLike: createLike,
            action: 'created' as const,
          };
        }
      },
    );

    return result;
  }
}
