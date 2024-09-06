import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentLike } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateCommentLikeDTO = Omit<CommentLike, 'id'>;
type DeleteCommentLikeDTO = Omit<CommentLike, 'myBookCommentId'>;
type ExistingCommentLikeDTO = Omit<CommentLike, 'id'>;
type validateCommentLikeDTO = Omit<CommentLike, 'myBookCommentId'>;

@Injectable()
export class CommentLikeService {
  constructor(private prismaService: PrismaService) {}

  async createCommentLike(dto: CreateCommentLikeDTO) {
    await this.existingCommentLike({ ...dto });
    const commentLike = await this.prismaService.commentLike.create({
      data: {
        ...dto,
      },
    });

    return commentLike;
  }

  async deleteCommentLike(dto: DeleteCommentLikeDTO) {
    await this.validateCommentLike(dto);

    const deletedCommentLike = await this.prismaService.commentLike.delete({
      where: {
        ...dto,
      },
    });

    return deletedCommentLike;
  }

  private async existingCommentLike(dto: ExistingCommentLikeDTO) {
    const existingCommentLike = await this.prismaService.commentLike.findFirst({
      where: {
        userId: dto.userId,
        myBookCommentId: dto.myBookCommentId,
      },
    });

    if (existingCommentLike) {
      throw new BadRequestException('이미 해당 comment에 좋아요를 눌렀습니다.');
    }
  }

  private async validateCommentLike(dto: validateCommentLikeDTO) {
    const { userId } = await this.prismaService.commentLike.findUnique({
      where: {
        id: dto.id,
      },
      select: {
        userId: true,
      },
    });

    if (userId !== dto.userId) {
      throw new UnauthorizedException('해당 comment의 좋아요를 삭제할 권한이 없습니다.');
    }
  }
}
