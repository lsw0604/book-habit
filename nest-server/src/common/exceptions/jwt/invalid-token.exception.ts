import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor(details?: string) {
    const message = `유효하지 않은 JWT 토큰입니다.`;
    const errorMetadata = {
      errorCode: 'JWT_INVALID_TOKEN',
      details,
    };

    super({
      message,
      error: 'Unauthorized',
      statusCode: 401,
      ...errorMetadata,
    });
  }
}
