import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class AlreadyExistEmailException extends BusinessException {
  constructor() {
    super(
      '이미 사용중인 이메일 입니다.',
      'EMAIL_ALREADY_EXISTS',
      HttpStatus.CONFLICT,
      'Conflict',
    );
  }
}
