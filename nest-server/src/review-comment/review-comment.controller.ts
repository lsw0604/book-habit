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
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ReviewCommentService } from './review-comment.service';
import { CreateReviewCommentDto } from './dto/create.review.comment.dto';
import { UpdateReviewCommentDto } from './dto/update.review.comment.dto';
import { ResponseDeleteReviewComment } from './interface';

@UseGuards(AccessGuard)
@Controller('/api/review-comment')
export class ReviewCommentController {
  constructor(private reviewCommentService: ReviewCommentService) {}

  @Post('/:myBookReviewId')
  @HttpCode(HttpStatus.CREATED)
  async createReviewComment(
    @Param('myReviewCommentId', ParseIntPipe) myBookReviewId: number,
    @UserDecorator('id') userId: number,
    @Body() dto: CreateReviewCommentDto,
  ): Promise<ResponseDto<ReviewComment>> {
    const response: ReviewComment = await this.reviewCommentService.createReviewComment({
      myBookReviewId,
      userId,
      ...dto,
    });
    return ResponseDto.created(response, '리뷰 댓글 생성 성공');
  }

  @Patch('/:reviewCommentId')
  @HttpCode(HttpStatus.OK)
  async updateReviewComment(
    @Param('reviewCommentId', ParseIntPipe) reviewCommentId: number,
    @UserDecorator('id') userId: number,
    @Body() dto: UpdateReviewCommentDto,
  ): Promise<ResponseDto<ReviewComment>> {
    const response: ReviewComment = await this.reviewCommentService.updateReviewComment({
      reviewCommentId,
      userId,
      ...dto,
    });

    return ResponseDto.success(response, '리뷰 댓글 수정 성공');
  }

  @Delete('/:reviewCommentId')
  async deleteReviewComment(
    @Param('reviewCommentId', ParseIntPipe) reviewCommentId: number,
    @UserDecorator('id') userId: number,
  ): Promise<ResponseDto<ResponseDeleteReviewComment>> {
    const response: ResponseDeleteReviewComment =
      await this.reviewCommentService.deleteReviewComment({ reviewCommentId, userId });

    return ResponseDto.success(response, '리뷰 댓글 삭제 성공');
  }
}
