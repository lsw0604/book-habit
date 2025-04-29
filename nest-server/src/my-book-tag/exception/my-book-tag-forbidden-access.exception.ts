import { ForbiddenException } from '@nestjs/common';

export class MyBookTagForbiddenAccessException extends ForbiddenException {
  constructor(params: { myBookTagId: number; ownerId: number; userId: number }) {
    const { myBookTagId, ownerId, userId } = params;
    const message = `USER(ID: ${userId})는 MY BOOK TAG(ID: ${myBookTagId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`;
    const errorMetadata = {
      myBookTagId,
      ownerId,
      userId,
      errorCode: 'MY_BOOK_TAG_FORBIDDEN_ACCESS',
    };

    super({
      message,
      error: 'Forbidden',
      statusCode: 403,
      ...errorMetadata,
    });
  }
}
