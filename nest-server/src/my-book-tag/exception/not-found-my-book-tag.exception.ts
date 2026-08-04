import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class NotFoundMyBookTagException extends BusinessException {
  constructor(myBookTagId: number) {
    super(
      `MY BOOK TAG (ID : ${myBookTagId})을 찾을 수 없습니다.`,
      'MY_BOOK_TAG_NOT_FOUND',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
