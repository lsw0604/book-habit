import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../business.exception';

export class InvalidDatetimeException extends BusinessException {
  constructor(value?: string, message: string = '유효하지 않은 날짜/시간 형식입니다') {
    super(
      value ? `${message}: ${value}` : message,
      'TIME_INVALID_DATETIME',
      HttpStatus.BAD_REQUEST,
      'Bad Request',
    );
  }
}
