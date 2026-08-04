import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../business.exception';

export class UnknownTokenException extends BusinessException {
  constructor(details?: string) {
    super(
      details
        ? `JWT 인증 중 알 수 없는 오류가 발생했습니다. (${details})`
        : 'JWT 인증 중 알 수 없는 오류가 발생했습니다.',
      'JWT_UNKNOWN_ERROR',
      HttpStatus.UNAUTHORIZED,
      'Unauthorized',
    );
  }
}
