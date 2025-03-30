import type {
  ReviewLike,
  CreateReviewLikePayload,
  GetReviewLikeByIdPayload,
  ValidateReviewLikePayload,
  FindUserReviewLikePayload,
  DeleteReviewLikePayload,
  ToggleReviewLIkePayload,
  ResponseToggleReviewLike,
} from './interface';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MyBookReviewService } from 'src/my-book-review/my-book-review.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class ReviewLikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookReviewService: MyBookReviewService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(ReviewLikeService.name);
  }

  public async toggleReviewLike(
    payload: ToggleReviewLIkePayload,
  ): Promise<ResponseToggleReviewLike> {
    const { userId, myBookReviewId } = payload;
    const myBookReview = await this.myBookReviewService.getMyBookReviewById({ id: myBookReviewId });
    const existingLike = await this.findUserReviewLike({
      userId,
      myBookReviewId,
    });

    if (existingLike) {
      const deletedLike = await this.deleteReviewLike({
        id: existingLike.id,
        userId,
      });

      return { action: 'deleted', reviewLike: deletedLike };
    } else {
      const createdLike = await this.createReviewLike({
        myBookReviewId: myBookReview.id,
        userId,
      });

      return { action: 'created', reviewLike: createdLike };
    }
  }

  /**
   * * ReviewLikeID값으로 ReviewLike를 찾습니다.
   *
   * @param payload - 좋아요를 찾기 위해 필요한 페이로드 (ReviewID)
   * @returns {Promise<ReviewLike>}
   * @throws {NotFoundException}
   */
  public async getReviewLikeById(payload: GetReviewLikeByIdPayload): Promise<ReviewLike> {
    const { id } = payload;
    this.logger.log(`리뷰 좋아요 조회 시작: ID ${id}`);

    const reviewLike = await this.prismaService.reviewLike.findUnique({
      where: {
        id,
      },
    });

    if (!reviewLike) {
      this.logger.warn(`해당 ReviewLike ID를 가진 좋아요를 찾을 수 없습니다.`);
      throw new NotFoundException('해당 ReviewLike ID를 가진 좋아요를 찾을 수 없습니다.');
    }

    return reviewLike;
  }

  /**
   * * MyBookReviewID값과 UserID갑으로 좋아요를 생성합니다.
   *
   * @param payload - 좋아요를 생성하기 위해 필요한 페이로드 (MyBookReviewID, UserID)
   * @returns {Promise<ReviewLike>}
   * @throws {NotFoundException}
   */
  private async createReviewLike(payload: CreateReviewLikePayload): Promise<ReviewLike> {
    const { userId, myBookReviewId } = payload;
    this.logger.log(`좋아요 생성 시작: 사용자 ID ${userId}, 리뷰 ID ${myBookReviewId}`);

    const reviewLike = await this.prismaService.reviewLike.create({
      data: {
        userId,
        myBookReviewId,
      },
    });

    this.logger.log('생성 완료');
    return reviewLike;
  }

  /**
   * * ReviewID값과 UserID값으로 좋아요를 삭제합니다.
   *
   * @param payload - 좋아요를를 삭제하기 위해 필요한 페이로드 (ReviewID, UserID)
   * @returns {Promise<ReviewLike>}
   * @throws {UnauthorizedException}
   */
  private async deleteReviewLike(payload: DeleteReviewLikePayload): Promise<ReviewLike> {
    const { id, userId } = payload;
    this.logger.log(`좋아요 삭제 시작 : 사용자 ID ${userId}, 리뷰 ID ${id}`);
    const reviewLike = await this.validateReviewLike({
      id,
      userId,
    });

    const deletedReviewLike = await this.prismaService.reviewLike.delete({
      where: {
        userId: reviewLike.userId,
        id: reviewLike.id,
      },
    });
    this.logger.log('삭제 완료');
    return deletedReviewLike;
  }

  /**
   * * 특정 사용자가 해당 도서 리뷰에 등록한 좋아요를 찾습니다.
   *
   * @param payload - 좋아요 확인에 필요한 페이로드 (MyBookReviewID, UserID)
   * @returns {Promise<ReviewLike | null>} - 좋아요 객체 또는 없을 경우 null
   */
  private async findUserReviewLike(payload: FindUserReviewLikePayload): Promise<ReviewLike | null> {
    const { myBookReviewId, userId } = payload;
    this.logger.log(`사용자 ${userId}의 리뷰 ${myBookReviewId} 좋아요 조회 시작`);

    const reviewLike = await this.prismaService.reviewLike.findFirst({
      where: {
        userId,
        myBookReviewId,
      },
    });

    this.logger.log(
      `사용자 ${userId}의 리뷰 ${myBookReviewId} 좋아요 조회 결과: ${reviewLike ? '있음' : '없음'}`,
    );

    return reviewLike;
  }

  /**
   * * 해당 좋아요에 대한 수정/삭제 권한을 가진 유저인지 확인합니다.
   *
   * @param payload - 좋아요에 대한 권한을 확인을 위한 페이로드 (ReviewLikeID, UserID)
   * @returns {Promise<ReviewLike>}
   * @throws {UnauthorizedException}
   */
  private async validateReviewLike(payload: ValidateReviewLikePayload): Promise<ReviewLike> {
    const { userId, id } = payload;
    this.logger.log('권한 검증을 시작합니다.');
    const reviewLike = await this.getReviewLikeById({ id });

    if (reviewLike.userId !== userId) {
      this.logger.warn('해당 좋아요에 대한 권한이 없습니다.');
      throw new UnauthorizedException('해당 좋아요에 대한 권한이 없습니다.');
    }

    return reviewLike;
  }
}
