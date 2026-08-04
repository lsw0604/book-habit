import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../business.exception';

export class MissingTokenException extends BusinessException {
  constructor() {
    super(
      'JWT 토큰이 제공되지 않았습니다.',
      'JWT_MISSING_TOKEN',
      HttpStatus.UNAUTHORIZED,
      'Unauthorized',
    );
  }
}
