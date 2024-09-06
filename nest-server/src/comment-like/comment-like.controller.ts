import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CommentLikeService } from './comment-like.service';
import { CreateCommentLikeDto } from './dto/create.comment.like.dto';

@UseGuards(AccessGuard)
@Controller('/api/comment-like')
export class CommentLikeController {
  constructor(private commentLikeService: CommentLikeService) {}

  @Post()
  async createCommentLike(@Body() dto: CreateCommentLikeDto, @Req() req: Request) {
    const userId = req.user.id;

    return await this.commentLikeService.createCommentLike({
      userId,
      ...dto,
    });
  }

  @Delete('/:commentLikeId')
  async deleteCommentLike(@Param('commentLikeId') commentLikeId: string, @Req() req: Request) {
    const id = parseInt(commentLikeId, 10);
    const userId = req.user.id;

    return await this.commentLikeService.deleteCommentLike({ id, userId });
  }
}
