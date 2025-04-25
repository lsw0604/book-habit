import { ConflictException } from '@nestjs/common';

export class AlreadyExistMyBookReviewException extends ConflictException {
  constructor(myBookId: number) {
    const message = `MyBook ID: ${myBookId}에 이미 리뷰가 존재합니다.`;
    const errorMetadata = {
      myBookId,
      errorCode: 'REVIEW_ALREADY_EXISTS',
    };

    super({
      message,
      error: 'Conflict',
      statusCode: 409,
      ...errorMetadata,
    });
  }
}
