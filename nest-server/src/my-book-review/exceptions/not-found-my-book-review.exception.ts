import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class NotFoundMyBookReviewException extends BusinessException {
  constructor(myBookReviewId: number) {
    super(
      `MY BOOK REVIEW (ID: ${myBookReviewId})를 찾을 수 없습니다.`,
      'MY_BOOK_REVIEW_NOT_FOUND',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
