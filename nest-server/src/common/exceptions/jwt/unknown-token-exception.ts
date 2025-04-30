import { UnauthorizedException } from '@nestjs/common';

export class UnknownTokenException extends UnauthorizedException {
  constructor(details?: string) {
    const message = 'JWT 인증 중 알 수 없는 오류가 발생했습니다.';
    const errorMetadata = {
      errorCode: 'JWT_UNKNOWN_ERROR',
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
