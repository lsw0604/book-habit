import { ForbiddenException } from '@nestjs/common';

export class SelfReviewLikeForbiddenAccessException extends ForbiddenException {
  constructor(myBookReviewId: number, userId: number) {
    const message = `USER (ID: ${userId})는 자기자신이 작성한 REVIEW (ID: ${myBookReviewId})에 좋아요를 생성할 수 없습니다.`;
    const errorMetadata = {
      myBookReviewId,
      userId,
      errorCode: 'REVIEW_LIKE_FORBIDDEN_ACCESS',
    };

    super({
      message,
      error: 'Forbidden',
      statusCode: 403,
      ...errorMetadata,
    });
  }
}
