import { ForbiddenException } from '@nestjs/common';

export class ReviewCommentForbiddenAccessException extends ForbiddenException {
  constructor(params: { reviewCommentId: number; userId: number; ownerId: number }) {
    const { userId, ownerId, reviewCommentId } = params;
    const message = `USER(ID: ${userId})는 COMMENT(ID: ${reviewCommentId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`;
    const errorMeta = {
      userId,
      ownerId,
      reviewCommentId,
      errorCode: 'REVIEW_COMMENT_FORBIDDEN_ACCESS',
    };

    super({
      message,
      error: 'Forbidden',
      statusCode: 403,
      ...errorMeta,
    });
  }
}
