import type {
  CreateReviewCommentPayload,
  DeleteReviewCommentPayload,
  ResponseDeleteReviewComment,
  UpdateReviewCommentPayload,
} from './interface';
import { Prisma, ReviewComment } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  NotFoundReviewCommentException,
  ReviewCommentForbiddenAccessException,
} from './exceptions';
import { NotFoundMyBookReviewException } from 'src/my-book-review/exceptions';

@Injectable()
export class ReviewCommentService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {
    this.logger.setContext(ReviewCommentService.name);
  }

  /**
   * * 리뷰에 새로운 댓글을 생성합니다.
   *
   * @param {CreateReviewCommentPayload} payload - 댓글 생성에 필요한 데이터
   * @param {number} payload.myBookReviewId - 댓글을 달 리뷰 ID
   * @param {number} payload.userId - 댓글 작성자 ID
   * @param {string} payload.comment - 댓글 내용
   * @returns {Promise<ReviewComment>} 생성된 댓글 객체
   */
  public async createReviewComment(payload: CreateReviewCommentPayload): Promise<ReviewComment> {
    const { myBookReviewId, userId, comment } = payload;

    const existMyBookReview = await this.prismaService.myBookReview.findUnique({
      where: {
        id: myBookReviewId,
      },
      select: {
        id: true,
      },
    });

    if (!existMyBookReview) throw new NotFoundMyBookReviewException(myBookReviewId);

    const createdComment: ReviewComment = await this.prismaService.reviewComment.create({
      data: {
        userId,
        comment,
        myBookReviewId,
      },
    });

    return createdComment;
  }

  /**
   * * 댓글 내용을 수정합니다.
   *
   * @param {UpdateReviewCommentPayload} payload - 댓글 수정에 필요한 데이터
   * @param {number} payload.reviewCommentId - 수정할 댓글 ID
   * @param {number} payload.userId - 사용자 ID (권한 검증용)
   * @param {string} payload.comment - 수정할 댓글 내용
   * @returns {Promise<ReviewComment>} 수정된 댓글 객체
   */
  public async updateReviewComment(payload: UpdateReviewCommentPayload): Promise<ReviewComment> {
    const { comment, reviewCommentId, userId } = payload;
    await this.validateReviewCommentOwnership(reviewCommentId, userId);
    const where: Prisma.ReviewCommentWhereUniqueInput = { id: reviewCommentId };

    const updatedComment: ReviewComment = await this.prismaService.reviewComment.update({
      where,
      data: { comment },
    });

    return updatedComment;
  }

  /**
   * * 리뷰에 등록된 댓글을 삭제합니다.
   *
   * @param {DeleteReviewCommentPayload} payload - 댓글 삭제에 필요한 데이터
   * @param {number} payload.reviewCommentId - 삭제할 댓글 ID
   * @param {number} payload.userId - 사용자 ID (권한 검증용)
   * @returns {Promise<ResponseDeleteReviewComment>} 삭제된 댓글 ID 정보
   */
  public async deleteReviewComment(
    payload: DeleteReviewCommentPayload,
  ): Promise<ResponseDeleteReviewComment> {
    const { reviewCommentId, userId } = payload;
    await this.validateReviewCommentOwnership(reviewCommentId, userId);
    const where: Prisma.ReviewCommentWhereUniqueInput = { id: reviewCommentId };

    await this.prismaService.reviewComment.delete({
      where,
    });

    return {
      reviewCommentId,
    };
  }

  /**
   * * 주어진 ReviewComment ID가 존재하는지, 그리고 해당 ReviewComment의 소유자가 맞는지 확인합니다.
   * * 소유권이 없거나 ReviewComment가 존재하지 않으면 예외를 던집니다.
   *
   * @param {number} reviewCommentId - 확인할 ReviewComment의 ID
   * @param {number} userId - 작업을 요청한 사용자의 ID
   * @private
   * @throws {NotFoundReviewCommentException} ReviewComment 리소스가 존재하지 않을 때
   * @throws {ReviewCommentForbiddenAccessException} ReviewComment는 존재하지만 소유권이 없을 때
   */
  private async validateReviewCommentOwnership(
    reviewCommentId: number,
    userId: number,
  ): Promise<void> {
    const where: Prisma.ReviewCommentWhereUniqueInput = { id: reviewCommentId };
    const reviewComment = await this.prismaService.reviewComment.findUnique({
      where,
      select: {
        userId: true,
      },
    });

    if (!reviewComment) throw new NotFoundReviewCommentException(reviewCommentId);
    const ownerId = reviewComment.userId;
    if (ownerId !== userId) {
      throw new ReviewCommentForbiddenAccessException({ ownerId, reviewCommentId, userId });
    }
  }
}
