import { UnauthorizedException } from '@nestjs/common';

export class InvalidPasswordException extends UnauthorizedException {
  constructor() {
    const message = '비밀번호가 올바르지 않습니다.';
    const errorMetadata = {
      errorCode: 'INVALID_PASSWORD',
    };

    super({
      message,
      error: 'Unauthorized',
      statusCode: 401,
      ...errorMetadata,
    });
  }
}
