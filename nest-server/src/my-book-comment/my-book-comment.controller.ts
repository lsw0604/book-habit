import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/decorator/user.decorator';
import { MyBookCommentService } from './my-book-comment.service';
import { CreateMyBookCommentDto } from './dto/create.my.book.comment.dto';
import { UpdateMyBookCommentDto } from './dto/update.my.book.comment.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-comment')
export class MyBookCommentController {
  constructor(private myBookCommentService: MyBookCommentService) {}

  @Post('/:myBookId')
  async createMyBookComment(
    @UserDecorator('id') userId: number,
    @Body() dto: Pick<CreateMyBookCommentDto, 'comment' | 'isPublic'>,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ) {
    return this.myBookCommentService.createMyBookComment({ userId, myBookId, ...dto });
  }

  @Put('/:myBookCommentId')
  async updateMyBookComment(
    @UserDecorator('id') userId: number,
    @Param('myBookCommentId', ParseIntPipe) myBookCommentId: number,
    @Body() dto: Pick<UpdateMyBookCommentDto, 'comment' | 'isPublic'>,
  ) {
    return this.myBookCommentService.updateMyBookComment({ myBookCommentId, userId, ...dto });
  }

  @Delete('/:myBookCommentId')
  async deleteMyBookComment(
    @UserDecorator('id') userId: number,
    @Param('myBookCommentId', ParseIntPipe) myBookCommentId: number,
  ) {
    return this.myBookCommentService.deleteMyBookComment({ myBookCommentId, userId });
  }
}
