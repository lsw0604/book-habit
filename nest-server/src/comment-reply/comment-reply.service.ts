import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyBookCommentService } from 'src/my-book-comment/my-book-comment.service';
import { CreateCommentReplyDto } from './dto/create.comment.reply.dto';
import { UpdateCommentReplyDto } from './dto/update.comment.reply.dto';
import { DeleteCommentReplyDto } from './dto/delete.comment.reply.dto';

@Injectable()
export class CommentReplyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookCommentService: MyBookCommentService,
  ) {}

  async createCommentReply(dto: CreateCommentReplyDto) {
    const myBookComment = await this.myBookCommentService.getMyBookComment({
      id: dto.myBookCommentId,
    });
    const commentReply = await this.prismaService.commentReply.create({
      data: {
        myBookCommentId: myBookComment.id,
        reply: dto.reply,
        userId: dto.userId,
      },
    });

    return commentReply;
  }

  async getCommentReply(payload: GetCommentReplyPayload) {
    const commentReply = await this.prismaService.commentReply.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!commentReply) {
      throw new NotFoundException('해당 commentReply를 찾을 수 없습니다.');
    }

    return commentReply;
  }

  async updateCommentReply(dto: UpdateCommentReplyDto) {
    const commentReply = await this.validateCommentReply({
      id: dto.commentReplyId,
      userId: dto.userId,
    });

    return await this.prismaService.commentReply.update({
      where: {
        id: commentReply.id,
        userId: commentReply.userId,
      },
      data: {
        reply: dto.reply,
      },
    });
  }

  async deleteCommentReply(dto: DeleteCommentReplyDto) {
    const commentReply = await this.validateCommentReply({
      id: dto.commentReplyId,
      userId: dto.userId,
    });

    return await this.prismaService.commentReply.delete({
      where: {
        id: commentReply.id,
        userId: commentReply.userId,
      },
    });
  }

  private async validateCommentReply(payload: ValidateCommentReplyPayload) {
    const commentReply = await this.getCommentReply({ id: payload.id });

    if (commentReply.userId !== payload.userId) {
      throw new UnauthorizedException('해당 commentReply를 수정/삭제할 권한이 없습니다.');
    }

    return commentReply;
  }
}
