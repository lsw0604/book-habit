import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class SelfReviewLikeForbiddenAccessException extends BusinessException {
  constructor(myBookReviewId: number, userId: number) {
    super(
      `USER (ID: ${userId})는 자기자신이 작성한 REVIEW (ID: ${myBookReviewId})에 좋아요를 생성할 수 없습니다.`,
      'REVIEW_LIKE_FORBIDDEN_ACCESS',
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
