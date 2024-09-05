import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { MyBookCommentService } from './my-book-comment.service';
import { CreateMyBookCommentDto } from './dto/create.my.book.comment.dto';
import { UpdateMyBookCommentDto } from './dto/update.my.book.comment.dto';

@Controller('/api/my-book-comment')
export class MyBookCommentController {
  constructor(private myBookCommentService: MyBookCommentService) {}

  @UseGuards(AccessGuard)
  @Post()
  async createMyBookComment(@Req() req: Request, @Body() dto: CreateMyBookCommentDto) {
    const userId = req.user.id;
    return await this.myBookCommentService.createMyBookComment({ userId, ...dto });
  }

  @Get()
  async getPublicMyBookComment() {
    return await this.myBookCommentService.getPublicMyBookCommentList();
  }

  @Get('/:myBookCommentId')
  async getPublicMyBookCommentDetail(@Param('myBookCommentId') myBookCommentId: string) {
    const id = parseInt(myBookCommentId, 10);
    return await this.myBookCommentService.getPublicMyBookCommentDetail({ id });
  }

  @UseGuards(AccessGuard)
  @Put('/:myBookCommentId')
  async updateMyBookComment(
    @Req() req: Request,
    @Param('myBookCommentId') myBookCommentId: string,
    @Body() dto: UpdateMyBookCommentDto,
  ) {
    const id = parseInt(myBookCommentId, 10);
    const userId = req.user.id;

    return await this.myBookCommentService.updateMyBookComment({ id, userId, ...dto });
  }

  @UseGuards(AccessGuard)
  @Delete('/:myBookCommentId')
  async deleteMyBookComment(
    @Req() req: Request,
    @Param('myBookCommentId') myBookCommentId: string,
  ) {
    const id = parseInt(myBookCommentId, 10);
    const userId = req.user.id;

    await this.myBookCommentService.deleteMyBookComment({ id, userId });

    return {
      message: `myBookComment/:${id}를 삭제하는데 성공했습니다.`,
    };
  }
}
