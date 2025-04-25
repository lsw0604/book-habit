import { BadRequestException } from '@nestjs/common';

export class InvalidIsbnFormatException extends BadRequestException {
  constructor(invalidCode: string) {
    super(`유효하지 않은 ISBN 형식 또는 체크섬입니다: ${invalidCode}`);
    this.name = 'InvalidIsbnFormatException';
  }
}
