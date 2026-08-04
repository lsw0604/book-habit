import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class AlreadyExistMyBookReviewException extends BusinessException {
  constructor(myBookId: number) {
    super(
      `MyBook ID: ${myBookId}에 이미 리뷰가 존재합니다.`,
      'REVIEW_ALREADY_EXISTS',
      HttpStatus.CONFLICT,
      'Conflict',
    );
  }
}
