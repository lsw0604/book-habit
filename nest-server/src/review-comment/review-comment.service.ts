import type {
  CreateReviewCommentPayload,
  DeleteReviewCommentPayload,
  DeleteReviewCommentResponse,
  UpdateReviewCommentPayload,
  ValidateReviewCommentPayload,
} from './interface';
import { ReviewComment } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { MyBookReviewService } from 'src/my-book-review/my-book-review.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  NotFoundReviewCommentException,
  ForbiddenReviewCommentAccessException,
} from './exceptions';

@Injectable()
export class ReviewCommentService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
    private readonly myBookReviewService: MyBookReviewService,
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
    this.logger.log(`사용자 ${userId}가 리뷰 ID: ${myBookReviewId}에 새 댓글 등록 시도`);

    await this.myBookReviewService.getMyBookReviewById(myBookReviewId);

    const createdComment: ReviewComment = await this.prismaService.reviewComment.create({
      data: {
        userId,
        comment,
        myBookReviewId,
      },
    });

    this.logger.log(
      `댓글 생성 성공 - ID: ${createdComment.id}, 사용자: ${userId}, 리뷰: ${myBookReviewId}`,
    );
    return createdComment;
  }

  /**
   * * ID로 댓글을 조회합니다.
   *
   * @param {number} id - 조회할 댓글 ID
   * @returns {Promise<ReviewComment>} 조회된 댓글 객체
   * @throws {NotFoundReviewCommentException} 댓글을 찾을 수 없는 경우
   */
  public async getReviewCommentById(id: number): Promise<ReviewComment> {
    this.logger.log(`댓글 조회 시도 - ID: ${id}`);

    const reviewComment: ReviewComment | null = await this.prismaService.reviewComment.findUnique({
      where: { id },
    });

    if (!reviewComment) {
      this.logger.warn(`댓글을 찾을 수 없음 - ID: ${id}`);
      throw new NotFoundReviewCommentException(id);
    }

    this.logger.log(`댓글 조회 성공 - ID: ${id}`);
    return reviewComment;
  }

  /**
   * * 댓글 내용을 수정합니다.
   *
   * @param {UpdateReviewCommentPayload} payload - 댓글 수정에 필요한 데이터
   * @param {number} payload.id - 수정할 댓글 ID
   * @param {number} payload.userId - 사용자 ID (권한 검증용)
   * @param {string} payload.comment - 수정할 댓글 내용
   * @returns {Promise<ReviewComment>} 수정된 댓글 객체
   */
  public async updateReviewComment(payload: UpdateReviewCommentPayload): Promise<ReviewComment> {
    const { comment, id, userId } = payload;
    this.logger.log(`댓글 수정 시도 - ID: ${id}, 사용자: ${userId}`);

    await this.validateReviewComment({
      id,
      userId,
    });

    const updatedComment: ReviewComment = await this.prismaService.reviewComment.update({
      where: { id },
      data: { comment },
    });

    this.logger.log(`댓글 수정 성공 - ID: ${id}, 사용자: ${userId}`);
    return updatedComment;
  }

  /**
   * * 리뷰에 등록된 댓글을 삭제합니다.
   *
   * @param {DeleteReviewCommentPayload} payload - 댓글 삭제에 필요한 데이터
   * @param {number} payload.id - 삭제할 댓글 ID
   * @param {number} payload.userId - 사용자 ID (권한 검증용)
   * @returns {Promise<DeleteReviewCommentResponse>} 삭제된 댓글 ID 정보
   */
  public async deleteReviewComment(
    payload: DeleteReviewCommentPayload,
  ): Promise<DeleteReviewCommentResponse> {
    const { id, userId } = payload;
    this.logger.log(`댓글 삭제 시도 - ID: ${id}, 사용자: ${userId}`);

    await this.validateReviewComment({
      id,
      userId,
    });

    const deletedComment = await this.prismaService.reviewComment.delete({
      where: { id },
    });

    this.logger.log(`댓글 삭제 성공 - ID: ${id}, 사용자: ${userId}`);
    return {
      id: deletedComment.id,
    };
  }

  /**
   * * 사용자가 해당 댓글에 대한 권한이 있는지 확인합니다.
   *
   * @param {ValidateReviewCommentPayload} payload - 권한 검증에 필요한 데이터
   * @param {number} payload.id - 검증할 댓글 ID
   * @param {number} payload.userId - 사용자 ID
   * @returns {Promise<ReviewComment>} 검증된 댓글 객체
   * @throws {NotFoundReviewCommentException} 댓글을 찾을 수 없는 경우
   * @throws {ForbiddenReviewCommentAccessException} 사용자에게 권한이 없는 경우
   * @private
   */
  private async validateReviewComment(
    payload: ValidateReviewCommentPayload,
  ): Promise<ReviewComment> {
    const { id, userId } = payload;
    this.logger.debug(`댓글 권한 검증 - ID: ${id}, 사용자: ${userId}`);

    const reviewComment = await this.getReviewCommentById(id);

    if (reviewComment.userId !== userId) {
      this.logger.warn(
        `권한 없음: 사용자 ${userId}는 댓글 ${id}의 소유자가 아님 (실제 소유자: ${reviewComment.userId})`,
      );
      throw new ForbiddenReviewCommentAccessException(userId, id);
    }

    this.logger.debug(`댓글 권한 검증 성공 - ID: ${id}, 사용자: ${userId}`);
    return reviewComment;
  }
}
