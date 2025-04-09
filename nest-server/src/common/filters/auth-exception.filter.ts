import { UnauthorizedException } from '@nestjs/common';

export class EmailAlreadyExistsException extends UnauthorizedException {
  constructor() {
    super('해당 이메일이 존재합니다.');
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor(message: string) {
    super(message);
  }
}
