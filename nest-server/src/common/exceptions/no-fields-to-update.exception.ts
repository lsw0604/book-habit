import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class NoFieldsToUpdateException extends BusinessException {
  constructor() {
    super('업데이트할 필드가 없습니다.', 'NO_FIELDS_TO_UPDATE', HttpStatus.BAD_REQUEST, 'Bad Request');
  }
}
