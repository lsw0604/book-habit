import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { MyBookReviewService } from './my-book-review.service';
import { CreateMyBookReviewDto } from './dto/create.my.book.review.dto';
import { UpdateMyBookReviewDto } from './dto/update.my.book.review.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-review')
export class MyBookReviewController {
  constructor(private myBookReviewService: MyBookReviewService) {}

  @Post('/:myBookId')
  @HttpCode(201)
  async createMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
    @Body() dto: CreateMyBookReviewDto,
  ) {
    const response = await this.myBookReviewService.createMyBookReview({
      id,
      userId,
      ...dto,
    });

    return ResponseDto.created(response, '리뷰 생성 성공');
  }

  @Get('/:myBookId')
  @HttpCode(200)
  async getMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ) {
    const response = await this.myBookReviewService.getMyBookReview({
      id,
      userId,
    });

    return ResponseDto.success(response, '리뷰 불러오기 성공');
  }

  @Put('/:myBookReviewId')
  @HttpCode(200)
  async updateMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookReviewDto,
  ) {
    const response = await this.myBookReviewService.updateMyBookReview({
      id,
      userId,
      ...dto,
    });

    return ResponseDto.success(response, '리뷰 수정 성공');
  }

  @Delete('/:myBookReviewId')
  @HttpCode(200)
  async deleteMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) id: number,
  ) {
    const response = await this.myBookReviewService.deleteMyBookReview({
      id,
      userId,
    });

    return ResponseDto.success(response, '리뷰 삭제 성공');
  }
}
