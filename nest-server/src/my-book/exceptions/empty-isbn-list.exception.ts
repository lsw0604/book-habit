import { BadRequestException } from '@nestjs/common';

export class EmptyIsbnListException extends BadRequestException {
  constructor(message: string = 'ISBN 목록은 비어 있을 수 없습니다.') {
    super(message);
    this.name = 'EmptyIsbnListException';
  }
}
