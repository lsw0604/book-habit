import { Controller, Delete, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ReviewLikeService } from './review-like.service';
import { UserDecorator } from 'src/decorator/user.decorator';

@UseGuards(AccessGuard)
@Controller('/api/review-like')
export class ReviewLikeController {
  constructor(private reviewLikeService: ReviewLikeService) {}

  @Post('/:myBookReviewId')
  @HttpCode(201)
  async createReviewLike(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) id: number,
  ) {
    return await this.reviewLikeService.createReviewLike({
      id,
      userId,
    });
  }

  @Delete('/:reviewLikeId')
  @HttpCode(204)
  async deleteReviewLike(
    @UserDecorator('id') userId: number,
    @Param('reviewLikeId', ParseIntPipe) id: number,
  ) {
    return await this.reviewLikeService.deleteReviewLike({ id, userId });
  }
}
