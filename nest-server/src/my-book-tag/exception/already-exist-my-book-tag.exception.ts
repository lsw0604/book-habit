import { ConflictException } from '@nestjs/common';

export class AlreadyExistMyBookTagException extends ConflictException {
  constructor(myBookId: number, value: string) {
    const message = `MY BOOK (ID: ${myBookId})에 해당 TAG (${value})가 이미 존재합니다.`;
    const errorMetadata = {
      value,
      myBookId,
      errorCode: 'MY_BOOK_TAG_ALREADY_EXISTS',
    };

    super({
      message,
      error: 'Conflict',
      statusCode: 409,
      ...errorMetadata,
    });
  }
}
