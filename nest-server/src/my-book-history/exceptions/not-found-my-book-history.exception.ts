import { NotFoundException } from '@nestjs/common';

export class NotFoundMyBookHistoryException extends NotFoundException {
  constructor(myBookHistoryId: number) {
    const message = `MY BOOK History (ID : ${myBookHistoryId})을 찾을 수 없습니다.`;
    const errorMetadata = {
      myBookHistoryId,
      errorCode: 'MY_BOOK_HISTORY_NOT_FOUND',
    };

    super({
      message,
      error: 'Not Found',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
