import { ForbiddenException } from '@nestjs/common';

export class MyBookReviewForbiddenAccessException extends ForbiddenException {
  constructor(params: { myBookReviewId: number; ownerId: number; userId: number }) {
    const { myBookReviewId, ownerId, userId } = params;
    const message = `USER(ID: ${userId})는 REVIEW(ID: ${myBookReviewId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`;
    const errorMetadata = {
      userId,
      ownerId,
      myBookReviewId,
      errorCode: 'MY_BOOK_REVIEW_ACCESS_FORBIDDEN',
    };

    super({
      message,
      error: 'Forbidden',
      statusCode: 403,
      ...errorMetadata,
    });
  }
}
