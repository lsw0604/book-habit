import type {
  ResponseCreateMyBookTag,
  ResponseDeleteMyBookTag,
  ResponseGetMyBookTag,
} from './interface';
import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { MyBookTagService } from './my-book-tag.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ResponseMessageDecorator, UserDecorator } from 'src/common/decorator';
import { CreateMyBookTagDto } from './dto/create.my.book.tag.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-tag')
export class MyBookTagController {
  constructor(private myBookTagService: MyBookTagService) {}

  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('MY BOOK TAG 조회 성공')
  async getMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ): Promise<ResponseGetMyBookTag> {
    return await this.myBookTagService.getMyBookTag({
      myBookId,
      userId,
    });
  }

  @Post('/:myBookId')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('MY BOOK TAG 생성 성공')
  async createMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookTagDto,
  ): Promise<ResponseCreateMyBookTag> {
    return await this.myBookTagService.createMyBookTag({
      userId,
      myBookId,
      ...dto,
    });
  }

  @Delete('/:myBookTagId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('MY BOOK TAG 삭제 성공')
  async deleteMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookTagId', ParseIntPipe) myBookTagId: number,
  ): Promise<ResponseDeleteMyBookTag> {
    return await this.myBookTagService.deleteMyBookTag({
      userId,
      myBookTagId,
    });
  }
}
