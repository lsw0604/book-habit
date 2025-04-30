import { NotFoundException } from '@nestjs/common';

export class NotFoundTagException extends NotFoundException {
  constructor(tagId: number) {
    const message = `TAG (ID : ${tagId})을 찾을 수 없습니다.`;
    const errorMetadata = {
      tagId,
      errorCode: 'TAG_NOT_FOUND',
    };

    super({
      message,
      error: 'Not Found',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
