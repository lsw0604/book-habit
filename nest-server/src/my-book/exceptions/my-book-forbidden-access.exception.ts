import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class MyBookForbiddenAccessException extends BusinessException {
  constructor(params: { myBookId: number; ownerId: number; userId: number }) {
    const { myBookId, ownerId, userId } = params;
    super(
      `USER (ID: ${userId})는 MY BOOK(ID: ${myBookId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`,
      'MY_BOOK_FORBIDDEN_ACCESS',
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
