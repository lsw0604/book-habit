import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CommentReplyService } from './comment-reply.service';
import { CreateCommentReplyDto } from './dto/create.comment.reply.dto';
import { UpdateCommentReplyDto } from './dto/update.comment.reply.dto';

@UseGuards(AccessGuard)
@Controller('/api/comment-reply')
export class CommentReplyController {
  constructor(private commentReplyService: CommentReplyService) {}

  @Post()
  async createCommentReply(@Req() req: Request, @Body() dto: CreateCommentReplyDto) {
    const userId = req.user.id;

    return await this.commentReplyService.createCommentReply({ userId, ...dto });
  }

  @Put('/:commentReplyId')
  async updateCommentReply(
    @Req() req: Request,
    @Param('commentReplyId') commentReplyId: string,
    @Body() dto: UpdateCommentReplyDto,
  ) {
    const id = parseInt(commentReplyId, 10);
    const userId = req.user.id;

    return await this.commentReplyService.updateCommentReply({ id, userId, ...dto });
  }

  @Delete('/:commentReplyId')
  async deleteCommentReply(@Req() req: Request, @Param('commentReplyId') commentReplyId: string) {
    const id = parseInt(commentReplyId, 10);
    const userId = req.user.id;

    return await this.commentReplyService.deleteCommentReply({ id, userId });
  }
}
