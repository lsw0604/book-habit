import { NotFoundException } from '@nestjs/common';

export class NotFoundEmailException extends NotFoundException {
  constructor(email: string) {
    const message = `EMAIL (email: ${email})을 가진 사용자를 찾을 수 없습니다.`;
    const errorMetadata = {
      email,
      errorCode: 'EMAIL_NOT_FOUND',
    };

    super({
      message,
      error: 'Not Found',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
