import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ReviewLikeService } from './review-like.service';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ReviewLike } from './interface';

@UseGuards(AccessGuard)
@Controller('/api/review-like')
export class ReviewLikeController {
  constructor(private reviewLikeService: ReviewLikeService) {}

  @Post('/:myBookReviewId')
  async toggleReviewLike(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
  ) {
    const { action, reviewLike } = await this.reviewLikeService.toggleReviewLike({
      myBookReviewId,
      userId,
    });

    if (action === 'deleted') {
      return ResponseDto.success<ReviewLike>(reviewLike, '좋아요를 등록 취소했습니다.');
    } else if (action === 'created') {
      return ResponseDto.created<ReviewLike>(reviewLike, '좋아요를 등록 완료했습니다.');
    }
  }
}
