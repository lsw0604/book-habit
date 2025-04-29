import { NotFoundException } from '@nestjs/common';

export class NotFoundMyBookReviewException extends NotFoundException {
  constructor(myBookReviewId: number) {
    const message = `MY BOOK REVIEW (ID: ${myBookReviewId})를 찾을 수 없습니다.`;
    const errorMetadata = {
      myBookReviewId,
      errorCode: 'MY_BOOK_REVIEW_NOT_FOUND',
    };

    super({
      message,
      error: 'NOT_FOUND',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
