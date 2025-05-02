import type { ResponseDeleteReviewComment } from './interface';
import {
  Body,
  Post,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewComment } from '@prisma/client';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ResponseMessageDecorator, UserDecorator } from 'src/common/decorator';
import { ReviewCommentService } from './review-comment.service';
import { CreateReviewCommentDto } from './dto/create.review.comment.dto';
import { UpdateReviewCommentDto } from './dto/update.review.comment.dto';

@UseGuards(AccessGuard)
@Controller('/api/review-comment')
export class ReviewCommentController {
  constructor(private reviewCommentService: ReviewCommentService) {}

  @Post('/:myBookReviewId')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('리뷰 댓글 생성 성공')
  async createReviewComment(
    @Param('myReviewCommentId', ParseIntPipe) myBookReviewId: number,
    @UserDecorator('id') userId: number,
    @Body() dto: CreateReviewCommentDto,
  ): Promise<ReviewComment> {
    return await this.reviewCommentService.createReviewComment({
      myBookReviewId,
      userId,
      ...dto,
    });
  }

  @Patch('/:reviewCommentId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('리뷰 댓글 수정 성공')
  async updateReviewComment(
    @Param('reviewCommentId', ParseIntPipe) reviewCommentId: number,
    @UserDecorator('id') userId: number,
    @Body() dto: UpdateReviewCommentDto,
  ): Promise<ReviewComment> {
    return await this.reviewCommentService.updateReviewComment({
      reviewCommentId,
      userId,
      ...dto,
    });
  }

  @Delete('/:reviewCommentId')
  @ResponseMessageDecorator('리뷰 댓글 삭제 성공')
  async deleteReviewComment(
    @Param('reviewCommentId', ParseIntPipe) reviewCommentId: number,
    @UserDecorator('id') userId: number,
  ): Promise<ResponseDeleteReviewComment> {
    return await this.reviewCommentService.deleteReviewComment({ reviewCommentId, userId });
  }
}
