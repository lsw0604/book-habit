import type {
  CreateReviewLikePayload,
  GetReviewLikeByIdPayload,
  ValidateReviewLikePayload,
  DuplicateReviewLikePayload,
  DeleteReviewLikePayload,
} from './interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MyBookReviewService } from 'src/my-book-review/my-book-review.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewLikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookReviewService: MyBookReviewService,
  ) {}

  public async createReviewLike(payload: CreateReviewLikePayload) {
    const myBookReview = await this.duplicateReviewLike({
      id: payload.id,
      userId: payload.userId,
    });

    const reviewLike = await this.prismaService.reviewLike.create({
      data: {
        userId: payload.userId,
        myBookReviewId: myBookReview.id,
      },
    });

    return reviewLike;
  }

  public async getReviewLikeById(payload: GetReviewLikeByIdPayload) {
    const reviewLike = await this.prismaService.reviewLike.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!reviewLike) throw new NotFoundException('해당 reviewLike를 찾을 수 없습니다.');

    return reviewLike;
  }

  public async deleteReviewLike(payload: DeleteReviewLikePayload) {
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

  private async duplicateReviewLike(payload: DuplicateReviewLikePayload) {
    const myBookReview = await this.myBookReviewService.getMyBookReviewById({
      id: payload.id,
    });

    const reviewLike = await this.prismaService.reviewLike.findFirst({
      where: {
        userId: payload.userId,
        myBookReviewId: myBookReview.id,
      },
    });

    if (reviewLike) throw new BadRequestException('해당 Review에 좋아요를 눌렀습니다.');

    return myBookReview;
  }

  private async validateReviewLike(payload: ValidateReviewLikePayload) {
    const reviewLike = await this.getReviewLikeById({ id: payload.id });

    if (reviewLike.userId !== payload.userId) {
      throw new UnauthorizedException('해당 Like에 대한 권한이 없습니다. ');
    }

    return reviewLike;
  }
}
