import type { FormattedMyBookReview, DeleteMyBooKReviewResponse } from './interface';
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
import { ResponseDto } from 'src/common/dto/response.dto';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { MyBookReviewService } from './my-book-review.service';
import { CreateMyBookReviewDto } from './dto/create.my.book.review.dto';
import { UpdateMyBookReviewDto } from './dto/update.my.book.review.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-review')
export class MyBookReviewController {
  constructor(private myBookReviewService: MyBookReviewService) {}

  @Post('/:myBookId')
  @HttpCode(HttpStatus.CREATED)
  async createMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
    @Body() dto: CreateMyBookReviewDto,
  ): Promise<ResponseDto<FormattedMyBookReview>> {
    const response: FormattedMyBookReview = await this.myBookReviewService.createMyBookReview({
      id,
      userId,
      ...dto,
    });

    return ResponseDto.created(response, '리뷰 생성 성공');
  }

  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  async getMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ): Promise<ResponseDto<FormattedMyBookReview>> {
    const response: FormattedMyBookReview = await this.myBookReviewService.getMyBookReview({
      id,
      userId,
    });

    return ResponseDto.success(response, '리뷰 불러오기 성공');
  }

  @Patch('/:myBookReviewId')
  @HttpCode(HttpStatus.OK)
  async updateMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookReviewDto,
  ): Promise<ResponseDto<FormattedMyBookReview>> {
    const response: FormattedMyBookReview = await this.myBookReviewService.updateMyBookReview({
      id,
      userId,
      ...dto,
    });

    return ResponseDto.success(response, '리뷰 수정 성공');
  }

  @Delete('/:myBookReviewId')
  @HttpCode(HttpStatus.OK)
  async deleteMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) id: number,
  ): Promise<ResponseDto<DeleteMyBooKReviewResponse>> {
    const response: DeleteMyBooKReviewResponse = await this.myBookReviewService.deleteMyBookReview({
      id,
      userId,
    });

    return ResponseDto.success(response, '리뷰 삭제 성공');
  }
}
