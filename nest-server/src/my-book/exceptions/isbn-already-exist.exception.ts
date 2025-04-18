import { ConflictException } from '@nestjs/common';

export class IsbnAlreadyExistsException extends ConflictException {
  constructor(code: string) {
    super(`ISBN 코드 '${code}'는 이미 존재합니다.`);
    this.name = 'IsbnAlreadyExistsException';
  }
}
