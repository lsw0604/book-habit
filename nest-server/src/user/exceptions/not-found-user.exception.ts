import { NotFoundException } from '@nestjs/common';

export class NotFoundUserException extends NotFoundException {
  constructor(userId: number) {
    const message = `USER (IDl: ${userId})를 찾을 수 없습니다.`;
    const errorMetadata = {
      userId,
      errorCode: 'USER_NOT_FOUND',
    };

    super({
      message,
      error: 'Not Found',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
