import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class NotFoundReviewCommentException extends BusinessException {
  constructor(reviewCommentId: number) {
    super(
      `REVIEW COMMENT ID : ${reviewCommentId}를 찾을 수 없습니다.`,
      'REVIEW_COMMENT_NOT_FOUND',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
