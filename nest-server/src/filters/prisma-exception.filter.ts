import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.BAD_REQUEST;
    let message = '요청을 처리하는 중에 오류가 발생했습니다.';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = `고유 제약 조건에 실패했습니다: ${exception.meta?.target}`;
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = '외래 키 제약 조건에 실패했습니다.';
          break;
        case 'P2004':
          status = HttpStatus.BAD_REQUEST;
          message = '제약 조건에 맞지 않는 쿼리입니다.';
          break;
        case 'P2005':
          status = HttpStatus.BAD_REQUEST;
          message = '잘못된 값이 제공되었습니다.';
          break;
        default:
          message = '알 수 없는 데이터베이스 오류가 발생했습니다.';
      }
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      message = '데이터베이스 연결 초기화에 실패했습니다.';
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      message = '데이터베이스 클라이언트에서 치명적인 오류가 발생했습니다.';
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = '잘못된 입력이 제공되었습니다.';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.path,
      message,
    });
  }
}
