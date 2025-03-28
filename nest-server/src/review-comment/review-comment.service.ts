import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MyBookReviewService } from 'src/my-book-review/my-book-review.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateReviewCommentPayload,
  DeleteReviewCommentPayload,
  GetReviewCommentByIdPayload,
  UpdateReviewCommentPayload,
  ValidateReviewCommentPayload,
} from './interface';

@Injectable()
export class ReviewCommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookReviewService: MyBookReviewService,
  ) {}

  /**
   * * Review에 Comment를 생성합니다.
   * @param {CreateReviewCommentPayload} payload - 생성할 Comment 정보
   * @param {number} payload.id                  - MyBookReview ID
   * @param {number} payload.userId              - User ID
   * @param {string} payload.comment             - Comment
   */
  public async createReviewComment(payload: CreateReviewCommentPayload) {
    const myBookReview = await this.myBookReviewService.getMyBookReviewById({
      id: payload.id,
    });

    const createComment = await this.prismaService.reviewComment.create({
      data: {
        myBookReviewId: myBookReview.id,
        userId: payload.userId,
        comment: payload.comment,
      },
    });

    return createComment;
  }

  public async getReviewCommentById(payload: GetReviewCommentByIdPayload) {
    const reviewComment = await this.prismaService.reviewComment.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!reviewComment) throw new NotFoundException('해당 reviewComment를 찾을 수 없습니다.');

    return reviewComment;
  }

  /**
   * * Review에 Comment를 수정합니다.
   * @param
   * @param {number} payload.id - Comment ID
   * @param {number} payload.userId - User ID
   *
   */
  public async updateReviewComment(payload: UpdateReviewCommentPayload) {
    const reviewComment = await this.validateReviewComment({
      id: payload.id,
      userId: payload.userId,
    });

    const updatedComment = await this.prismaService.reviewComment.update({
      where: {
        id: reviewComment.id,
        userId: payload.userId,
      },
      data: {
        comment: payload.comment,
      },
    });

    return updatedComment;
  }

  public async deleteReviewComment(payload: DeleteReviewCommentPayload) {
    const reviewComment = await this.validateReviewComment({
      id: payload.id,
      userId: payload.userId,
    });

    const deletedComment = await this.prismaService.reviewComment.delete({
      where: {
        id: reviewComment.id,
        userId: payload.userId,
      },
    });

    return deletedComment;
  }

  private async validateReviewComment(payload: ValidateReviewCommentPayload) {
    const reviewComment = await this.getReviewCommentById({ id: payload.id });

    if (reviewComment.userId !== payload.userId) {
      throw new UnauthorizedException('해당 comment에 대한 권한이 없습니다.');
    }

    return reviewComment;
  }
}
