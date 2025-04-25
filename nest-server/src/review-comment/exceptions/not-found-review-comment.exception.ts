import { NotFoundException } from '@nestjs/common';

export class NotFoundReviewCommentException extends NotFoundException {
  constructor(reviewCommentId: number) {
    const message = `REVIEW COMMENT ID : ${reviewCommentId}를 찾을 수 없습니다.`;
    const errorMetaData = {
      reviewCommentId,
      errorCode: 'REVIEW_COMMENT_NOT_FOUND',
    };

    super({
      message,
      error: 'Not Found',
      ...errorMetaData,
    });
  }
}
