import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentReply, MyBookComment } from '@prisma/client';
import { MyBookCommentService } from 'src/my-book-comment/my-book-comment.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateCommentReplyDTO = Pick<CommentReply, 'myBookCommentId' | 'reply' | 'userId'>;
type UpdateCommentReplyDTO = Pick<CommentReply, 'id' | 'userId'> &
  Partial<Pick<CommentReply, 'reply'>>;
type DeleteCommentReplyDTO = Pick<CommentReply, 'id' | 'userId'>;
type FindCommentReplyDTO = Pick<CommentReply, 'id'>;
type ValidateCommentReplyDTO = Pick<CommentReply, 'id' | 'userId'>;
type ValidateCreateCommentReplyDTO = Pick<MyBookComment, 'id'>;

@Injectable()
export class CommentReplyService {
  constructor(
    private prismaService: PrismaService,
    private readonly myBookCommentService: MyBookCommentService,
  ) {}

  async createCommentReply({ myBookCommentId, reply, userId }: CreateCommentReplyDTO) {
    await this.validateCreateCommentReply({ id: myBookCommentId });

    const commentReply = await this.prismaService.commentReply.create({
      data: {
        myBookCommentId,
        reply,
        userId,
      },
    });

    return commentReply;
  }

  async updateCommentReply({ id, userId, reply }: UpdateCommentReplyDTO) {
    await this.validateCommentReply({ id, userId });
    const commentReply = await this.prismaService.commentReply.update({
      where: {
        id,
        userId,
      },
      data: {
        reply,
      },
    });

    return commentReply;
  }

  async findCommentReply({ id }: FindCommentReplyDTO) {
    const commentReply = await this.prismaService.commentReply.findUnique({ where: { id } });

    if (!commentReply) {
      throw new NotFoundException('해당 commentReply를 찾을 수 없습니다.');
    }

    return commentReply;
  }

  async deleteCommentReply({ id, userId }: DeleteCommentReplyDTO) {
    await this.validateCommentReply({ id, userId });
    const commentReply = await this.prismaService.commentReply.delete({
      where: {
        id,
        userId,
      },
    });

    return commentReply;
  }

  private async validateCreateCommentReply({ id }: ValidateCreateCommentReplyDTO) {
    await this.myBookCommentService.findMyBookComment({ id });
  }

  private async validateCommentReply({ id, userId }: ValidateCommentReplyDTO) {
    const commentReply = await this.findCommentReply({ id });

    if (commentReply.userId !== userId) {
      throw new UnauthorizedException('해당 commentReply에 대한 권한이 없습니다.');
    }
  }
}
