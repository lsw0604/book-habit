import { ForbiddenException } from '@nestjs/common';

export class MyBookHistoryForbiddenAccessException extends ForbiddenException {
  constructor(params: { myBookHistoryId: number; ownerId: number; userId: number }) {
    const { myBookHistoryId, ownerId, userId } = params;
    const message = `USER(ID: ${userId})는 HISTORY(ID: ${myBookHistoryId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`;
    const errorMetadata = {
      userId,
      ownerId,
      myBookHistoryId,
      errorCode: 'MY_BOOK_HISTORY_FORBIDDEN_ACCESS',
    };

    super({
      message,
      error: 'Forbidden',
      statusCode: 403,
      ...errorMetadata,
    });
  }
}
