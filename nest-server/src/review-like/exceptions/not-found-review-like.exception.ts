import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class NotFoundReviewLikeException extends BusinessException {
  constructor(reviewLikeId: number) {
    super(
      `REVIEW LIKE (ID: ${reviewLikeId})를 찾을 수 없습니다.`,
      'REVIEW_LIKE_NOT_FOUND',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
