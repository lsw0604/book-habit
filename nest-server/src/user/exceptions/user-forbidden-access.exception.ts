import { ForbiddenException } from '@nestjs/common';

export class UserForbiddenAccessException extends ForbiddenException {
  constructor(params: { userId: number; ownerId: number }) {
    const { ownerId, userId } = params;
    const message = `USER (ID: ${userId})는 USER(ID: ${ownerId})에 접근할 권한이 없습니다.`;
    const errorMetadata = {
      ownerId,
      userId,
      errorCode: 'USER_FORBIDDEN_ACCESS',
    };

    super({
      message,
      error: 'Forbidden',
      statusCode: 403,
      ...errorMetadata,
    });
  }
}
