import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class MyBookTagForbiddenAccessException extends BusinessException {
  constructor(params: { myBookTagId: number; ownerId: number; userId: number }) {
    const { myBookTagId, ownerId, userId } = params;
    super(
      `USER(ID: ${userId})는 MY BOOK TAG(ID: ${myBookTagId})에 접근할 권한이 없습니다. 소유자(ID: ${ownerId})`,
      'MY_BOOK_TAG_FORBIDDEN_ACCESS',
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
