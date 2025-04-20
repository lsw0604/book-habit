import { BadRequestException } from '@nestjs/common';

export class DateRangeException extends BadRequestException {
  constructor(message: string = '날짜 범위가 올바르지 않습니다') {
    super(message);
  }
}
