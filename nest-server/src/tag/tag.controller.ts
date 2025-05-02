import type { FormattedTag } from './interface';
import {
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Controller,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { ResponseMessageDecorator } from 'src/common/decorator';

@Controller('/api/tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('태그 검색 성공')
  async searchTag(
    @Query('query') query: string,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 5,
  ): Promise<FormattedTag[]> {
    return await this.tagService.searchTag({ limit, query });
  }

  @Get('/public-popular')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('인기 태그(공개) 검색 성공')
  async publicPopularTag(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 7,
  ): Promise<FormattedTag[]> {
    return await this.tagService.getPublicPopularTag(limit);
  }

  @Get('/popular')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('인기 태그 검색 성공')
  async popularTag(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ): Promise<FormattedTag[]> {
    return await this.tagService.getPopularTag(limit);
  }
}
