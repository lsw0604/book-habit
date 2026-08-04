import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../business.exception';

export class InvalidTokenException extends BusinessException {
  constructor(details?: string) {
    super(
      details ? `유효하지 않은 JWT 토큰입니다. (${details})` : '유효하지 않은 JWT 토큰입니다.',
      'JWT_INVALID_TOKEN',
      HttpStatus.UNAUTHORIZED,
      'Unauthorized',
    );
  }
}
