import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PublicCommentService } from './public-comment.service';
import { calculateDateRange } from 'src/utils/date-util';

@Controller('/api/public-comment')
export class PublicCommentController {
  constructor(private readonly publicCommentService: PublicCommentService) {}

  @Get()
  async getPublicCommentList(
    @Query('end_date') end?: string,
    @Query('start_date') start?: string,
    @Query('page_size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ) {
    const { endDate, startDate } = calculateDateRange({ end, start });

    return await this.publicCommentService.getPublicCommentList({
      page,
      pageSize,
      endDate,
      startDate,
    });
  }

  @Get('/:commentId')
  async getPublicCommentDetail(@Param('commentId', ParseIntPipe) commentId: number) {
    return await this.publicCommentService.getPublicCommentDetail({ id: commentId });
  }
}
