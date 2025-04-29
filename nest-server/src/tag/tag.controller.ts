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
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetPopularTagResponse } from 'src/my-book-tag/interface';

@Controller('/api/tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async searchTag(
    @Query('query') query: string,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 5,
  ) {
    const response = await this.tagService.searchTag({ limit, query });
    return ResponseDto.success(response, '태그 검색 성공');
  }

  @Get('/popular')
  @HttpCode(HttpStatus.OK)
  async popularTag(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ): Promise<ResponseDto<GetPopularTagResponse[]>> {
    const response: GetPopularTagResponse[] = await this.tagService.getPopularTag(limit);

    return ResponseDto.success(response, '인기 태그 검색 성공');
  }
}
