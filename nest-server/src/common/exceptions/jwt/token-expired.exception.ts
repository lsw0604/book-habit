import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../business.exception';

export class TokenExpiredException extends BusinessException {
  constructor() {
    super(
      'JWT 토큰이 만료되었습니다.',
      'JWT_TOKEN_EXPIRED',
      HttpStatus.UNAUTHORIZED,
      'Unauthorized',
    );
  }
}
