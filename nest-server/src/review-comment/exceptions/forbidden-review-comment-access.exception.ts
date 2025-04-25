import { ForbiddenException } from '@nestjs/common';

export class ForbiddenReviewCommentAccessException extends ForbiddenException {
  constructor(userId: number, reviewCommentId: number) {
    const message = `사용자 ${userId}는 댓글 ${reviewCommentId}에 대한 수정/삭제 권한이 없습니다.`;
    const errorMeta = {
      reviewCommentId,
      userId,
      errorCode: 'FORBIDDEN_REVIEW_COMMENT_ACCESS',
    };

    super({
      message,
      error: 'Forbidden',
      ...errorMeta,
    });
  }
}
