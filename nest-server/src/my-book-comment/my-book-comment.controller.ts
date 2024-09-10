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
import { MyBookCommentService } from './my-book-comment.service';
import { CreateMyBookCommentDto } from './dto/create.my.book.comment.dto';
import { UpdateMyBookCommentDto } from './dto/update.my.book.comment.dto';
import { UserDecorator } from 'src/decorator/user.decorator';

@Controller('/api/my-book-comment')
export class MyBookCommentController {
  constructor(private myBookCommentService: MyBookCommentService) {}

  @UseGuards(AccessGuard)
  @Post('/:myBookId')
  async createMyBookComment(
    @UserDecorator('id') userId: number,
    @Body() dto: CreateMyBookCommentDto,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ) {
    return this.myBookCommentService.createMyBookComment({ userId, myBookId, ...dto });
  }

  @Get()
  async getPublicMyBookCommentList() {
    return await this.myBookCommentService.getPublicMyBookCommentList();
  }

  @Get('/:myBookCommentId')
  async getPublicMyBookCommentDetail(@Param('myBookCommentId', ParseIntPipe) id: number) {
    return this.myBookCommentService.getPublicMyBookCommentDetail({ id });
  }

  @UseGuards(AccessGuard)
  @Put('/:myBookCommentId')
  async updateMyBookComment(
    @UserDecorator('id') userId: number,
    @Param('myBookCommentId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookCommentDto,
  ) {
    return this.myBookCommentService.updateMyBookComment({ id, userId, ...dto });
  }

  @UseGuards(AccessGuard)
  @Delete('/:myBookCommentId')
  async deleteMyBookComment(
    @UserDecorator('id') userId: number,
    @Param('myBookCommentId', ParseIntPipe) id: number,
  ) {
    return this.myBookCommentService.deleteMyBookComment({ id, userId });
  }
}
