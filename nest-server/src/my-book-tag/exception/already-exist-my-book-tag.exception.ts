import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class AlreadyExistMyBookTagException extends BusinessException {
  constructor(myBookId: number, value: string) {
    super(
      `MY BOOK (ID: ${myBookId})에 해당 TAG (${value})가 이미 존재합니다.`,
      'MY_BOOK_TAG_ALREADY_EXISTS',
      HttpStatus.CONFLICT,
      'Conflict',
    );
  }
}
