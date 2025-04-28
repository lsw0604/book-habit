import { BadRequestException } from '@nestjs/common';

export class NoFieldsToUpdateException extends BadRequestException {
  constructor() {
    const message = '업데이트할 필드가 없습니다.';
    const errorMetadata = {
      errorCode: 'NO_FIELDS_TO_UPDATE',
    };

    super({
      message,
      error: 'Bad Request',
      statusCode: 400,
      ...errorMetadata,
    });
  }
}
