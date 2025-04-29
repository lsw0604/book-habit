import { NotFoundException } from '@nestjs/common';

export class NotFoundMyBookTagException extends NotFoundException {
  constructor(myBookTagId: number) {
    const message = `MY BOOK TAG (ID : ${myBookTagId})을 찾을 수 없습니다.`;
    const errorMetadata = {
      myBookTagId,
      errorCode: 'MY_BOOK_TAG_NOT_FOUND',
    };

    super({
      message,
      error: 'Not Found',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
