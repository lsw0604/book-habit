import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../business.exception';

export class DateRangeException extends BusinessException {
  constructor(message: string = '날짜 범위가 올바르지 않습니다') {
    super(message, 'TIME_DATE_RANGE', HttpStatus.BAD_REQUEST, 'Bad Request');
  }
}
