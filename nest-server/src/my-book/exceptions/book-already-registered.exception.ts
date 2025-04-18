import { ConflictException } from '@nestjs/common';

export class BookAlreadyRegisteredException extends ConflictException {
  constructor(userId: number, bookId: number) {
    super(`사용자(${userId})가 이미 해당 도서(${bookId})를 등록했습니다.`);
  }
}
