import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 일관된 커스텀 비즈니스 예외 응답 포맷을 제공하는 기본 추상 클래스
 */
export abstract class BusinessException extends HttpException {
  constructor(
    message: string,
    errorCode: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    error?: string,
  ) {
    super(
      {
        message,
        errorCode,
        statusCode,
        ...(error && { error }),
      },
      statusCode,
    );
  }
}
