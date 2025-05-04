import type { ResponseCreateReviewLike, ResponseDeleteReviewLike } from './interface';
import {
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { ResponseMessageDecorator } from 'src/common/decorator';
import { ReviewLikeService } from './review-like.service';
import { REVIEW_LIKE_CONTROLLER_MESSAGE } from './constant';

@UseGuards(AccessGuard)
@Controller('/api/review-like')
export class ReviewLikeController {
  constructor(private reviewLikeService: ReviewLikeService) {}

  @Post('/:myBookReviewId')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator(REVIEW_LIKE_CONTROLLER_MESSAGE.CREATE_REVIEW_LIKE)
  async createReviewLike(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
  ): Promise<ResponseCreateReviewLike> {
    const response: ResponseCreateReviewLike = await this.reviewLikeService.createReviewLike({
      userId,
      myBookReviewId,
    });
    return response;
  }

  @Delete('/:myBookReviewId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator(REVIEW_LIKE_CONTROLLER_MESSAGE.DELETE_REVIEW_LIKE)
  async deleteReviewLike(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
  ): Promise<ResponseDeleteReviewLike> {
    const response: ResponseDeleteReviewLike = await this.reviewLikeService.deleteReviewLike({
      myBookReviewId,
      userId,
    });

    return response;
  }
}
