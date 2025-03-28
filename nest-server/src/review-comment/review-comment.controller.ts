import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ReviewCommentService } from './review-comment.service';
import { UserDecorator } from 'src/decorator/user.decorator';
import { CreateReviewCommentDto } from './dto/create.review.comment.dto';
import { UpdateReviewCommentDto } from './dto/update.review.comment.dto';

@UseGuards(AccessGuard)
@Controller('/api/review-comment')
export class ReviewCommentController {
  constructor(private reviewCommentService: ReviewCommentService) {}

  @Post('/:myReviewCommentId')
  async createReviewComment(
    @Param('myReviewCommentId', ParseIntPipe) id: number,
    @UserDecorator('id') userId: number,
    @Body() dto: CreateReviewCommentDto,
  ) {
    return await this.reviewCommentService.createReviewComment({ id, userId, ...dto });
  }

  @Post('/:reviewCommentId')
  async updateReviewComment(
    @Param('reviewCommentId', ParseIntPipe) id: number,
    @UserDecorator('id') userId: number,
    @Body() dto: UpdateReviewCommentDto,
  ) {
    return await this.reviewCommentService.updateReviewComment({ id, userId, ...dto });
  }

  @Delete('/:reviewCommentId')
  async deleteReviewComment(
    @Param('reviewCommentId', ParseIntPipe) id: number,
    @UserDecorator('id') userId: number,
  ) {
    return await this.reviewCommentService.deleteReviewComment({ id, userId });
  }
}
