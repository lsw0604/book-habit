import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class MyBookReviewForbiddenAccessException extends BusinessException {
  constructor(params: { myBookReviewId: number; ownerId: number; userId: number }) {
    const { myBookReviewId, ownerId, userId } = params;
    super(
      `USER(ID: ${userId})는 REVIEW(ID: ${myBookReviewId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`,
      'MY_BOOK_REVIEW_FORBIDDEN_ACCESS',
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
