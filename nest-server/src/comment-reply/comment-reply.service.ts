import { Injectable, NotFoundException } from '@nestjs/common';
import { MyBookCommentService } from 'src/my-book-comment/my-book-comment.service';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * TODO MyBookComment 와 Validation에 대해 다시 생각해보기, type.d.ts.다시 작성
 */
@Injectable()
export class CommentReplyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookCommentService: MyBookCommentService,
  ) {}

  async createCommentReply(payload: CreateCommentReplyPayload) {
    const myBookComment = await this.myBookCommentService.getMyBookComment({
      id: payload.myBookCommentId,
    });
    const commentReply = await this.prismaService.commentReply.create({
      data: {
        myBookCommentId: myBookComment.id,
        reply: payload.reply,
        userId: payload.userId,
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

  async updateCommentReply(payload: UpdateCommentReplyPayload) {
    const myBookComment = await this.myBookCommentService.getMyBookComment({ id: payload.id });
    const commentReply = await this.prismaService.commentReply.update({
      where: {
        id: myBookComment.id,
        userId: payload.userId,
      },
      data: {
        reply: payload.reply,
      },
    });

    return commentReply;
  }

  async deleteCommentReply({ id, userId }: DeleteCommentReplyPayload) {
    const commentReply = await this.prismaService.commentReply.delete({
      where: {
        id,
        userId,
      },
    });

    return commentReply;
  }
}
