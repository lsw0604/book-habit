import { HttpStatus } from '@nestjs/common';

export const PRISMA_ERROR_CODES = {
  P2002: {
    status: HttpStatus.CONFLICT,
    message: '고유 제약 조건 위반',
  },
  P2003: {
    status: HttpStatus.BAD_REQUEST,
    message: '외래 키 제약 조건 위반',
  },
  P2025: {
    status: HttpStatus.NOT_FOUND,
    message: '레코드를 찾을 수 없습니다',
  },
} as const;
