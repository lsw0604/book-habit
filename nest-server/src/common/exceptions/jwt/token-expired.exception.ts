import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor() {
    const message = `JWT 토큰이 만료되었습니다.`;
    const errorMetadata = {
      errorCode: 'JWT_TOKEN_EXPIRED',
    };

    super({
      message,
      error: 'Unauthorized',
      statusCode: 401,
      ...errorMetadata,
    });
  }
}
