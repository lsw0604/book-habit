import { ConflictException } from '@nestjs/common';

export class AlreadyExistMyBookException extends ConflictException {
  constructor(userId: number, bookId: number) {
    const message = `USER (ID: ${userId})의 서재에 해당 BOOK (ID: ${bookId})가 존재합니다.`;
    const errorMetadata = {
      userId,
      bookId,
      errorCode: 'MY_BOOK_ALREADY_EXISTS',
    };

    super({
      message,
      error: 'Conflict',
      statusCode: 409,
      ...errorMetadata,
    });
  }
}
