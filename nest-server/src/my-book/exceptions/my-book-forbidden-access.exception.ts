import { ForbiddenException } from '@nestjs/common';

export class MyBookForbiddenAccessException extends ForbiddenException {
  constructor(params: { myBookId: number; ownerId: number; userId: number }) {
    const { myBookId, ownerId, userId } = params;
    const message = `User ID : ${userId}는 MyBook(ID : ${myBookId})에 접근할 권한이 없습니다. (소유자 ID : ${ownerId})`;
    const errorMetadata = {
      myBookId,
      ownerId,
      userId,
      errorCode: 'MY_BOOK_ACCESS_FORBIDDEN',
    };

    super({
      message,
      error: 'Forbidden',
      statusCode: 403,
      ...errorMetadata,
    });
  }
}
