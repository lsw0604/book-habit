import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;

  constructor(options: { success: boolean; statusCode: number; message: string; data?: T }) {
    this.success = options.success;
    this.statusCode = options.statusCode;
    this.message = options.message;
    this.data = options.data;
  }

  static success<T>(data?: T, message = '성공적으로 처리되었습니다'): ResponseDto<T> {
    return new ResponseDto<T>({
      success: true,
      statusCode: HttpStatus.OK,
      message,
      data,
    });
  }

  static created<T>(data?: T, message = '성공적으로 생성되었습니다'): ResponseDto<T> {
    return new ResponseDto<T>({
      success: true,
      statusCode: HttpStatus.CREATED,
      message,
      data,
    });
  }

  static noContent(message = '콘텐츠가 없습니다'): ResponseDto<null> {
    return new ResponseDto<null>({
      success: true,
      statusCode: HttpStatus.NO_CONTENT,
      message,
    });
  }
}
