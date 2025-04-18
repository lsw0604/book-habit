import { NotFoundException } from '@nestjs/common';

export class IsbnNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`ID 또는 코드가 '${identifier}'인 ISBN을 찾을 수 없습니다.`);
    this.name = 'IsbnNotFoundException';
  }
}
