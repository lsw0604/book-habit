import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../business.exception';

export class FutureDateException extends BusinessException {
  constructor(message: string = '미래 날짜는 허용되지 않습니다') {
    super(message, 'TIME_FUTURE_DATE', HttpStatus.BAD_REQUEST, 'Bad Request');
  }
}
