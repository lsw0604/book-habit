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
import { ResponseDto } from 'src/common/dto/response.dto';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { CreateMyBookTagDto } from './dto/create.my.book.tag.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-tag')
export class MyBookTagController {
  constructor(private myBookTagService: MyBookTagService) {}

  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  async getMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ): Promise<ResponseDto<ResponseGetMyBookTag>> {
    const response: ResponseGetMyBookTag = await this.myBookTagService.getMyBookTag({
      myBookId,
      userId,
    });

    return ResponseDto.success(response, 'MyBookTag 조회 성공');
  }

  @Post('/:myBookId')
  @HttpCode(HttpStatus.CREATED)
  async createMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookTagDto,
  ): Promise<ResponseDto<ResponseCreateMyBookTag>> {
    const response: ResponseCreateMyBookTag = await this.myBookTagService.createMyBookTag({
      userId,
      myBookId,
      ...dto,
    });

    return ResponseDto.created(response, 'MyBookTag 생성 성공');
  }

  @Delete('/:myBookTagId')
  @HttpCode(HttpStatus.OK)
  async deleteMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookTagId', ParseIntPipe) myBookTagId: number,
  ): Promise<ResponseDto<ResponseDeleteMyBookTag>> {
    const response: ResponseDeleteMyBookTag = await this.myBookTagService.deleteMyBookTag({
      userId,
      myBookTagId,
    });

    return ResponseDto.success(response, 'MyBookTag 삭제 성공');
  }
}
