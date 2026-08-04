import type { FormattedMyBookReview, CreateReviewWithMyBookResponse } from './interface';
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { MyBookReviewService } from './my-book-review.service';
import { CreateMyBookReviewDto, CreateReviewWithMyBookDto, UpdateMyBookReviewDto } from './dto';
import { ResponseMessageDecorator } from 'src/common/decorator';
import { CreateReviewWithMyBookUseCase } from './cases';

@UseGuards(AccessGuard)
@Controller('/api/my-book-review')
export class MyBookReviewController {
  constructor(
    private readonly myBookReviewService: MyBookReviewService,
    private readonly createReviewWithMyBookUseCase: CreateReviewWithMyBookUseCase,
  ) {}

  @Post('/with-my-book')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('서재 및 리뷰 생성 성공')
  async createReviewWithMyBook(
    @UserDecorator('id') userId: number,
    @Body() dto: CreateReviewWithMyBookDto,
  ): Promise<CreateReviewWithMyBookResponse> {
    return await this.createReviewWithMyBookUseCase.execute(userId, dto);
  }

  @Post('/:myBookId')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('리뷰 생성 성공')
  async createMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookReviewDto,
  ): Promise<FormattedMyBookReview> {
    return await this.myBookReviewService.createMyBookReview({
      userId,
      myBookId,
      ...dto,
    });
  }

  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('리뷰 불러오기 성공')
  async getMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ): Promise<FormattedMyBookReview> {
    return await this.myBookReviewService.getMyBookReview({
      myBookId,
      userId,
    });
  }

  @Patch('/:myBookReviewId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('리뷰 수정 성공')
  async updateMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
    @Body() dto: UpdateMyBookReviewDto,
  ): Promise<FormattedMyBookReview> {
    return await this.myBookReviewService.updateMyBookReview({
      myBookReviewId,
      userId,
      ...dto,
    });
  }

  @Delete('/:myBookReviewId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('리뷰 삭제 성공')
  async deleteMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
  ): Promise<void> {
    await this.myBookReviewService.deleteMyBookReview({
      myBookReviewId,
      userId,
    });
  }
}
