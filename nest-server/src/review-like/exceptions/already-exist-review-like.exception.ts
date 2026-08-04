import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class ReviewLikeAlreadyExistsException extends BusinessException {
  constructor(myBookReviewId: number, userId: number) {
    super(
      `USER(ID: ${userId})는 이미 REVIEW(ID: ${myBookReviewId})에 좋아요를 표시했습니다.`,
      'REVIEW_LIKE_ALREADY_EXISTS',
      HttpStatus.CONFLICT,
      'Conflict',
    );
  }
}
