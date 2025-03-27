import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/decorator/user.decorator';
import { MyBookReviewService } from './my-book-review.service';
import { CreateMyBookReviewDto } from './dto/create.my.book.review.dto';
import { UpdateMyBookReviewDto } from './dto/update.my.book.review.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-review')
export class MyBookReviewController {
  constructor(private myBookReviewService: MyBookReviewService) {}

  @Get('/:myBookId')
  async getMyBookReviewList(@Param('myBookId', ParseIntPipe) myBookId: number) {
    return this.myBookReviewService.getMyBookReviewList({ myBookId });
  }

  @Post('/:myBookId')
  async createMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookReviewDto,
  ) {
    return this.myBookReviewService.createMyBookReview({ userId, myBookId, ...dto });
  }

  @Put('/:myBookReviewId')
  async updateMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
    @Body() dto: UpdateMyBookReviewDto,
  ) {
    return this.myBookReviewService.updateMyBookReview({ userId, myBookReviewId, ...dto });
  }

  @Delete('/:myBookReviewId')
  async deleteMyBookReview(
    @UserDecorator('id') userId: number,
    @Param('myBookReviewId', ParseIntPipe) myBookReviewId: number,
  ) {
    return this.myBookReviewService.deleteMyBookReview({ userId, myBookReviewId });
  }
}
