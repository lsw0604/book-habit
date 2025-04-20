import { BadRequestException } from '@nestjs/common';

export class FutureDateException extends BadRequestException {
  constructor(message: string = '미래 날짜는 허용되지 않습니다') {
    super(message);
  }
}
