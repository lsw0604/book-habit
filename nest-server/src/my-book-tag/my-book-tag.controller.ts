import type {
  PublicTag,
  ResponseDeleteMyBookTag,
  ResponseMyBookTag,
} from './interface/my.book.tag.interface';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Get,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { MyBookTagService } from './my-book-tag.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { CreateMyBookTagDto } from './dto/create.my.book.tag.dto';

@Controller('/api/my-book-tag')
export class MyBookTagController {
  constructor(private myBookTagService: MyBookTagService) {}

  @Get('/popular')
  @HttpCode(200)
  async getPopularTags(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ): Promise<ResponseDto<PublicTag[]>> {
    const response: PublicTag[] = await this.myBookTagService.getPopularTags({ limit });
    return ResponseDto.success<PublicTag[]>(response, '인기 태그 조회 성공');
  }

  @Get('/search')
  @HttpCode(200)
  async getSearchTags(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 5,
    @Query('query') query: string,
  ): Promise<ResponseDto<PublicTag[]>> {
    const response: PublicTag[] = await this.myBookTagService.getSearchTags({ limit, query });
    return ResponseDto.success<PublicTag[]>(response, '태그 검색 성공');
  }

  @UseGuards(AccessGuard)
  @Post('/:myBookId')
  @HttpCode(201)
  async createMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookTagDto,
  ): Promise<ResponseDto<ResponseMyBookTag>> {
    const response: ResponseMyBookTag = await this.myBookTagService.createMyBookTag({
      userId,
      myBookId,
      ...dto,
    });

    return ResponseDto.created<ResponseMyBookTag>(response, 'MyBookTag 생성 성공');
  }

  @UseGuards(AccessGuard)
  @Delete('/:myBookTagId')
  async deleteMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookTagId', ParseIntPipe) id: number,
  ): Promise<ResponseDto<ResponseDeleteMyBookTag>> {
    const response: ResponseDeleteMyBookTag = await this.myBookTagService.deleteMyBookTag({
      id,
      userId,
    });

    return ResponseDto.success<ResponseDeleteMyBookTag>(response, 'MyBookTag 삭제 성공');
  }
}
