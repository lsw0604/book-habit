import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ReviewLike } from '@prisma/client';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ReviewLikeService } from './review-like.service';

@UseGuards(AccessGuard)
@Controller('/api/review-like')
export class ReviewLikeController {
  constructor(private reviewLikeService: ReviewLikeService) {}

  @Post('/:myBookReviewId')
  async toggleReviewLike(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
  ): Promise<ResponseDto<ReviewLike>> {
    const { action, reviewLike } = await this.reviewLikeService.toggleReviewLike({
      myBookReviewId,
      userId,
    });

    if (action === 'deleted') {
      return ResponseDto.success(reviewLike, '좋아요를 등록 취소했습니다.');
    } else if (action === 'created') {
      return ResponseDto.created(reviewLike, '좋아요를 등록 완료했습니다.');
    }
  }
}
