import { UnauthorizedException } from '@nestjs/common';

export class MalformedTokenException extends UnauthorizedException {
  constructor() {
    const message = `유효하지 않은 JWT 토큰 형식입니다.`;
    const errorMetadata = {
      errorCode: 'JWT_MALFORMED_TOKEN',
    };

    super({
      message,
      error: 'Unauthorized',
      statusCode: 401,
      ...errorMetadata,
    });
  }
}
