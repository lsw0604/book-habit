import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class NotFoundMyBookHistoryException extends BusinessException {
  constructor(myBookHistoryId: number) {
    super(
      `MY BOOK History (ID : ${myBookHistoryId})을 찾을 수 없습니다.`,
      'MY_BOOK_HISTORY_NOT_FOUND',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
