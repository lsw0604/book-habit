import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PublicCommentService } from './public-comment.service';
import { calculateDateRange } from 'src/utils/date-util';

@Controller('/api/public-comment')
export class PublicCommentController {
  constructor(private readonly publicCommentService: PublicCommentService) {}

  @Get()
  async getPublicCommentList(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('page_size', ParseIntPipe) pageSize: number = 10,
    @Query('start_date') start?: string,
    @Query('end_date') end?: string,
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
