import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class NotFoundMyBookException extends BusinessException {
  constructor(myBookId: number) {
    super(
      `MY BOOK (ID : ${myBookId})을 찾을 수 없습니다.`,
      'MY_BOOK_NOT_FOUND',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
