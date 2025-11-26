import { BadRequestException } from '@nestjs/common';

export class MyBookPageExceededException extends BadRequestException {
  constructor(currentPage: number, totalPage: number) {
    super(`현재 페이지(${currentPage})는 전체 페이지(${totalPage})를 초과할 수 없습니다.`);
  }
}
