import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/decorator/user.decorator';
import { CommentReplyService } from './comment-reply.service';
import { CreateCommentReplyDto } from './dto/create.comment.reply.dto';
import { UpdateCommentReplyDto } from './dto/update.comment.reply.dto';

@UseGuards(AccessGuard)
@Controller('/api/comment-reply')
export class CommentReplyController {
  constructor(private commentReplyService: CommentReplyService) {}

  @Post('/:myBookCommentId')
  async createCommentReply(
    @Param('myBookCommentId', ParseIntPipe) myBookCommentId: number,
    @UserDecorator('id') userId: number,
    @Body() dto: Pick<CreateCommentReplyDto, 'reply'>,
  ) {
    return await this.commentReplyService.createCommentReply({ myBookCommentId, userId, ...dto });
  }

  @Put('/:commentReplyId')
  async updateCommentReply(
    @Param('commentReplyId', ParseIntPipe) commentReplyId: number,
    @UserDecorator('id') userId: number,
    @Body() dto: Pick<UpdateCommentReplyDto, 'reply'>,
  ) {
    return await this.commentReplyService.updateCommentReply({ commentReplyId, userId, ...dto });
  }

  @Delete('/:commentReplyId')
  async deleteCommentReply(
    @Param('commentReplyId', ParseIntPipe) commentReplyId: number,
    @UserDecorator('id') userId: number,
  ) {
    return await this.commentReplyService.deleteCommentReply({ commentReplyId, userId });
  }
}
