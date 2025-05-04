import { NotFoundException } from '@nestjs/common';

export class NotFoundReviewLikeException extends NotFoundException {
  constructor(reviewLikeId: number) {
    const message = `REVIEW LIKE (ID: ${reviewLikeId})를 찾을 수 없습니다.`;
    const errorMetadata = {
      reviewLikeId,
      errorCode: 'REVIEW_LIKE_NOT_FOUND',
    };

    super({
      message,
      error: 'NOT_FOUND',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
