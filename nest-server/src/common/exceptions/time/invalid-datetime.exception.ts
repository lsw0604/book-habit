import { BadRequestException } from '@nestjs/common';

export class InvalidDatetimeException extends BadRequestException {
  constructor(value?: string, message: string = '유효하지 않은 날짜/시간 형식입니다') {
    super(value ? `${message}: ${value}` : message);
  }
}
