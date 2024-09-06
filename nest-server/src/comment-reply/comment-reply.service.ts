import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentReply } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateCommentReplyDTO = Pick<CommentReply, 'myBookCommentId' | 'reply' | 'userId'>;
type UpdateCommentReplyDTO = Pick<CommentReply, 'id' | 'userId'> &
  Partial<Pick<CommentReply, 'reply'>>;
type DeleteCommentReplyDTO = Pick<CommentReply, 'id' | 'userId'>;
type AuthenticateUserDTO = Pick<CommentReply, 'id' | 'userId'>;

@Injectable()
export class CommentReplyService {
  constructor(private prismaService: PrismaService) {}

  async createCommentReply(dto: CreateCommentReplyDTO) {
    const commentReply = await this.prismaService.commentReply.create({
      data: {
        ...dto,
      },
    });

    return commentReply;
  }

  async updateCommentReply(dto: UpdateCommentReplyDTO) {
    const commentReply = await this.prismaService.commentReply.update({
      where: {
        id: dto.id,
        userId: dto.userId,
      },
      data: {
        reply: dto.reply,
      },
    });

    return commentReply;
  }

  async deleteCommentReply(dto: DeleteCommentReplyDTO) {
    const commentReply = await this.prismaService.commentReply.delete({
      where: {
        id: dto.id,
        userId: dto.id,
      },
    });

    return commentReply;
  }

  private async authenticateUser(dto: AuthenticateUserDTO) {
    const commentReply = await this.prismaService.commentReply.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (!commentReply) {
      throw new BadRequestException('해당 commentReply를 찾을 수 없습니다.');
    }
  }
}
