import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class ReviewCommentForbiddenAccessException extends BusinessException {
  constructor(params: { reviewCommentId: number; userId: number; ownerId: number }) {
    const { userId, ownerId, reviewCommentId } = params;
    super(
      `USER(ID: ${userId})는 COMMENT(ID: ${reviewCommentId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`,
      'REVIEW_COMMENT_FORBIDDEN_ACCESS',
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
