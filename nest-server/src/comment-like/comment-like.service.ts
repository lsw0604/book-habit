import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MyBookCommentService } from 'src/my-book-comment/my-book-comment.service';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * TODO MyBookComment 와 Validation에 대해 다시 생각해보기
 */
@Injectable()
export class CommentLikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookCommentService: MyBookCommentService,
  ) {}

  async createCommentLike({ myBookCommentId, userId }: CreateCommentLikeDTO) {
    await this.validateCreateCommentLike({ myBookCommentId, userId });

    const commentLike = await this.prismaService.commentLike.create({
      data: {
        userId,
        myBookCommentId,
      },
    });

    return commentLike;
  }

  async deleteCommentLike({ id, userId }: DeleteCommentLikeDTO) {
    await this.validateCommentLike({ id, userId });

    const deletedCommentLike = await this.prismaService.commentLike.delete({
      where: {
        userId,
        id,
      },
    });

    return deletedCommentLike;
  }

  async findCommentLike({ id }: FindCommentLikeDTO) {
    const commentLike = await this.prismaService.commentLike.findUnique({
      where: {
        id,
      },
    });

    if (!commentLike) {
      throw new NotFoundException(`해당 commentId를 찾지 못 했습니다.`);
    }

    return commentLike;
  }

  private async validateCreateCommentLike({
    myBookCommentId,
    userId,
  }: ValidateCreateCommentLikeDTO) {
    const myBookComment = await this.myBookCommentService.getMyBookComment({
      id: myBookCommentId,
    });

    const commentLike = await this.prismaService.commentLike.findFirst({
      where: {
        myBookCommentId: myBookComment.id,
        userId,
      },
    });

    if (commentLike) {
      throw new BadRequestException('이미 해당 comment에 좋아요를 눌렀습니다.');
    }
  }

  private async validateCommentLike({ id, userId }: ValidateCommentLikeDTO) {
    const commentLike = await this.findCommentLike({ id });

    if (commentLike.userId !== userId) {
      throw new UnauthorizedException('해당 comment의 좋아요를 삭제할 권한이 없습니다.');
    }
  }
}
