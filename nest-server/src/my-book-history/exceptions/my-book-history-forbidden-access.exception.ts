import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class MyBookHistoryForbiddenAccessException extends BusinessException {
  constructor(params: { myBookHistoryId: number; ownerId: number; userId: number }) {
    const { myBookHistoryId, ownerId, userId } = params;
    super(
      `USER(ID: ${userId})는 HISTORY(ID: ${myBookHistoryId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`,
      'MY_BOOK_HISTORY_FORBIDDEN_ACCESS',
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
