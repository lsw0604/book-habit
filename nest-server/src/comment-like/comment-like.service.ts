import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyBookCommentService } from 'src/my-book-comment/my-book-comment.service';
import { CreateCommentLikeDto } from './dto/create.comment.like.dto';
import { DeleteCommentLikeDto } from './dto/delete.comment.like.dto';

@Injectable()
export class CommentLikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookCommentService: MyBookCommentService,
  ) {}

  async createCommentLike(dto: CreateCommentLikeDto) {
    const myBookComment = await this.duplicateCommentLike({
      id: dto.myBookCommentId,
      userId: dto.userId,
    });

    const commentLike = await this.prismaService.commentLike.create({
      data: {
        userId: dto.userId,
        myBookCommentId: myBookComment.id,
      },
    });

    return commentLike;
  }

  async getCommentLike(payload: getCommentLikePayload) {
    const commentLike = await this.prismaService.commentLike.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!commentLike) {
      throw new NotFoundException(`해당 commentId를 찾지 못 했습니다.`);
    }

    return commentLike;
  }

  async deleteCommentLike(dto: DeleteCommentLikeDto) {
    const commentLike = await this.validateCommentLike({
      id: dto.commentLikeId,
      userId: dto.userId,
    });

    const deletedCommentLike = await this.prismaService.commentLike.delete({
      where: {
        userId: commentLike.userId,
        id: commentLike.id,
      },
    });

    return deletedCommentLike;
  }

  private async duplicateCommentLike(payload: DuplicateCommentLikePayload) {
    const myBookComment = await this.myBookCommentService.getMyBookComment({
      id: payload.id,
    });

    const commentLike = await this.prismaService.commentLike.findFirst({
      where: {
        userId: payload.userId,
        myBookCommentId: myBookComment.id,
      },
    });

    if (commentLike) throw new BadRequestException('이미 해당 comment에 좋아요를 눌렀습니다.');

    return myBookComment;
  }

  private async validateCommentLike(payload: ValidateCommentLikePayload) {
    const commentLike = await this.getCommentLike({ id: payload.id });

    if (commentLike.userId !== payload.userId) {
      throw new UnauthorizedException('해당 comment의 좋아요를 삭제할 권한이 없습니다.');
    }

    return commentLike;
  }
}
