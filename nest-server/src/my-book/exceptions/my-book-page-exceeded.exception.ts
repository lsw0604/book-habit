import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

export class MyBookPageExceededException extends BusinessException {
  constructor(currentPage: number, totalPage: number) {
    super(
      `현재 페이지(${currentPage})는 전체 페이지(${totalPage})를 초과할 수 없습니다.`,
      'MY_BOOK_PAGE_EXCEEDED',
      HttpStatus.BAD_REQUEST,
      'Bad Request',
    );
  }
}
