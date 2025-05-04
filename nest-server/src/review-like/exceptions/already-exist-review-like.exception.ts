import { ConflictException } from '@nestjs/common';

export class ReviewLikeAlreadyExistsException extends ConflictException {
  constructor(myBookReviewId: number, userId: number) {
    const message = `USER(ID: ${userId})는 이미 REVIEW(ID: ${myBookReviewId})에 좋아요를 표시했습니다.`;
    const errorMetadata = {
      myBookReviewId,
      userId,
      errorCode: 'REVIEW_LIKE_ALREADY_EXISTS',
    };

    super({
      message,
      error: 'Conflict',
      statusCode: 409,
      ...errorMetadata,
    });
  }
}
