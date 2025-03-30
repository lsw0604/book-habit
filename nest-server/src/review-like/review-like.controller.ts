import { Controller, Delete, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ReviewLikeService } from './review-like.service';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';

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
    const reviewLike = await this.reviewLikeService.createReviewLike({ id, userId });

    if (reviewLike.existReviewLike) {
      return ResponseDto.success(reviewLike, '이미 등록된 좋아요입니다.');
    }

    return ResponseDto.created(reviewLike, '좋아요 등록에 성공했습니다.');
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
