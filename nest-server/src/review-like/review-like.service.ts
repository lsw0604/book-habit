import type {
  ReviewLike,
  CreateReviewLikePayload,
  GetReviewLikeByIdPayload,
  ValidateReviewLikePayload,
  CheckDuplicateReviewLikePayload,
  ResponseCheckDuplicateReviewLike,
  DeleteReviewLikePayload,
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

  /**
   * * 리뷰에 좋아요를 생성하는 메서드
   *
   * @param payload                 - 리뷰 좋아요 생성에 필요한 payload
   * @param payload.id              - MyBookReview ID
   * @param payload.userId          - User ID
   * @returns {Promise<ResponseCheckDuplicateReviewLike>}
   * @throws {NotFoundException}    - 리뷰가 존재하지 않을 경우
   */
  public async createReviewLike(payload: CreateReviewLikePayload) {
    this.logger.log(`리뷰 좋아요 생성 시작: 사용자 ID ${payload.userId}, 리뷰 ID ${payload.id}`);

    // 중복된 좋아요가 있는지 확인
    const duplicateReviewLike = await this.checkDuplicateReviewLike({
      id: payload.id,
      userId: payload.userId,
    });

    // 이미 좋아요가 존재하는 경우 기존 좋아요 반환
    if (duplicateReviewLike.existReviewLike && duplicateReviewLike.reviewLike) {
      this.logger.log(`이미 존재하는 좋아요: 사용자 ID ${payload.userId}, 리뷰 ID ${payload.id}`);
      return duplicateReviewLike;
    }

    // 리뷰 ID로 리뷰 정보 조회
    const myBookReview = await this.myBookReviewService.getMyBookReviewById({ id: payload.id });

    // 새로운 리뷰에 대한 좋아요 생성
    const reviewLike = await this.prismaService.reviewLike.create({
      data: {
        userId: payload.userId,
        myBookReviewId: myBookReview.id,
      },
    });

    this.logger.log(`리뷰 좋아요 생성 완료: 사용자 ID ${payload.userId}, 리뷰 ID ${payload.id}`);
    return {
      existReviewLike: duplicateReviewLike.existReviewLike,
      reviewLike,
    };
  }

  /**
   * * ID값으로 ReviewLike를 찾는 메서드
   *
   * @param payload                 - 리뷰 좋아요를 찾기 위해 필요한 payload
   * @param payload.id              - ReviewLIke ID
   * @returns {Promise<ReviewLike>}
   * @throws {NotFoundException}    - 해당 ID를 가진 좋아요가 존재하지 않는 경우
   */
  public async getReviewLikeById(payload: GetReviewLikeByIdPayload): Promise<ReviewLike> {
    this.logger.log(`리뷰 좋아요 조회 시작: ID ${payload.id}`);

    const reviewLike = await this.prismaService.reviewLike.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!reviewLike) {
      this.logger.warn(`해당 ReviewLike ID를 가진 좋아요를 찾을 수 없습니다.`);
      throw new NotFoundException('해당 ReviewLike ID를 가진 좋아요를 찾을 수 없습니다.');
    }

    return reviewLike;
  }

  /**
   * * ID값으로 ReviewLike를 살제하는 메서드
   *
   * @param payload                  - 리뷰 좋아요를 삭제하기 위해 필요한 payload
   * @param payload.id               - ReviewLIke ID
   * @param payload.userId           - User ID
   * @returns {Promise<ReviewLike>}
   * @throws {UnauthorizedException} - 해당 좋아요에 대한 권한이 없는 경우
   */
  public async deleteReviewLike(payload: DeleteReviewLikePayload): Promise<ReviewLike> {
    const reviewLike = await this.validateReviewLike({
      id: payload.id,
      userId: payload.userId,
    });

    const deletedReviewLike = await this.prismaService.reviewLike.delete({
      where: {
        userId: reviewLike.userId,
        id: reviewLike.id,
      },
    });

    return deletedReviewLike;
  }

  /**
   * * 사용자가 특정 도서 리뷰에 이미 좋아요를 했는지 확인합니다.
   *
   * @param payload - 중복 리뷰 좋아요 확인을 위한 페이로드
   * @param payload.id - MyBookReview ID
   * @param payload.userId - User ID
   * @returns {ResponseCheckDuplicateReviewLike}
   */
  private async checkDuplicateReviewLike(
    payload: CheckDuplicateReviewLikePayload,
  ): Promise<ResponseCheckDuplicateReviewLike> {
    // myBookReview를 ID로 조회합니다.
    const myBookReview = await this.myBookReviewService.getMyBookReviewById({
      id: payload.id,
    });

    // myBookReview ID와 user ID를 사용해서 reviewLike를 조회합니다.
    const reviewLike = await this.prismaService.reviewLike.findFirst({
      where: {
        userId: payload.userId,
        myBookReviewId: myBookReview.id,
      },
    });

    // 이미 존재한다면
    if (reviewLike) {
      this.logger.log('이미 등록된 좋아요입니다.');
      return {
        existReviewLike: true,
        reviewLike,
      };
    }

    return {
      existReviewLike: false,
    };
  }

  /**
   * * 해당 좋아요에 대한 수정/삭제 권한을 가진 유저인지 확인합니다.
   *
   * @param payload                  - 좋아요에 대한 권한을 확인을 위한 페이로드
   * @param payload.id               - ReviewLike ID
   * @param payload.userId           - User ID
   * @returns {Promise<ReviewLike>}
   * @throws {UnauthorizedException} - 해당 좋아요에대한 권한이 없습니다
   */
  private async validateReviewLike(payload: ValidateReviewLikePayload) {
    this.logger.log(
      `User ID : ${payload.userId} 에 대한 ReviewLike ID : ${payload.id}의 권한 검증을 시작합니다.`,
    );
    const reviewLike = await this.getReviewLikeById({ id: payload.id });

    if (reviewLike.userId !== payload.userId) {
      this.logger.warn('해당 좋아요에 대한 권한이 없습니다.');
      throw new UnauthorizedException('해당 좋아요에 대한 권한이 없습니다.');
    }

    return reviewLike;
  }
}
