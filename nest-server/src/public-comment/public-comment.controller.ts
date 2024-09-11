import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PublicCommentService } from './public-comment.service';

@Controller('/api/public-comment')
export class PublicCommentController {
  constructor(private readonly publicCommentService: PublicCommentService) {}

  @Get()
  async getPublicCommentList() {
    return await this.publicCommentService.getPublicCommentList();
  }

  @Get('/:commentId')
  async getPublicCommentDetail(@Param('commentId', ParseIntPipe) commentId: number) {
    return await this.publicCommentService.getPublicCommentDetail({ id: commentId });
  }
}
