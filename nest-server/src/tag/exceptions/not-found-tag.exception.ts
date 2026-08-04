import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class NotFoundTagException extends BusinessException {
  constructor(tagId: number) {
    super(
      `TAG (ID : ${tagId})을 찾을 수 없습니다.`,
      'TAG_NOT_FOUND',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
