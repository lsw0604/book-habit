import { ConflictException } from '@nestjs/common';

export class AlreadyExistEmailException extends ConflictException {
  constructor() {
    const message = `이미 사용중인 이메일 입니다.`;
    const errorMetadata = {
      errorCode: 'EMAIL_ALREADY_EXISTS',
    };

    super({
      message,
      error: 'Conflict',
      statusCode: 409,
      ...errorMetadata,
    });
  }
}
