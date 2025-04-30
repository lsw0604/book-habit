import { UnauthorizedException } from '@nestjs/common';

export class MissingTokenException extends UnauthorizedException {
  constructor() {
    const message = `JWT 토큰이 제공되지 않았습니다.`;
    const errorMetadata = {
      errorCode: 'JWT_MISSING_TOKEN',
    };

    super({
      message,
      error: 'Unauthorized',
      statusCode: 401,
      ...errorMetadata,
    });
  }
}
