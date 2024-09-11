import { Controller, Delete, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/decorator/user.decorator';

@UseGuards(AccessGuard)
@Controller('/api/comment-like')
export class CommentLikeController {
  constructor(private commentLikeService: CommentLikeService) {}

  @Post('/:myBookCommentId')
  @HttpCode(201)
  async createCommentLike(
    @UserDecorator('id') userId: number,
    @Param('myBookCommentId', ParseIntPipe) myBookCommentId: number,
  ) {
    return await this.commentLikeService.createCommentLike({
      myBookCommentId,
      userId,
    });
  }

  @Delete('/:commentLikeId')
  @HttpCode(204)
  async deleteCommentLike(
    @Param('commentLikeId', ParseIntPipe) commentLikeId: number,
    @UserDecorator('id') userId: number,
  ) {
    return await this.commentLikeService.deleteCommentLike({ commentLikeId, userId });
  }
}
