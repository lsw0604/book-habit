import { NotFoundException } from '@nestjs/common';

export class NotFoundMyBookException extends NotFoundException {
  constructor(myBookId: number) {
    const message = `MY BOOK (ID : ${myBookId})을 찾을 수 없습니다.`;
    const errorMetadata = {
      myBookId,
      errorCode: 'MY_BOOK_NOT_FOUND',
    };

    super({
      message,
      error: 'Not Found',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
