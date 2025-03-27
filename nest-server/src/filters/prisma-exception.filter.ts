import { Catch, ArgumentsHost, Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from './base-exception.filter';

@Injectable()
@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientValidationError,
)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  constructor(configService: ConfigService) {
    super(configService, PrismaExceptionFilter.name);
  }

  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientRustPanicError
      | Prisma.PrismaClientInitializationError
      | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } = this.handlePrismaError(exception);

    this.logException(request, status, message, exception);

    const details = this.isDevelopment() ? this.getErrorDetails(exception) : undefined;

    this.sendErrorResponse(response, status, message, request, details);
  }

  private handlePrismaError(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientValidationError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientRustPanicError
      | Prisma.PrismaClientInitializationError,
  ): { status: number; message: string } {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          return {
            status: HttpStatus.CONFLICT,
            message: `고유 제약 조건 위반: ${exception.meta?.target || '알 수 없는 필드'}`,
          };
        case 'P2003':
          return {
            status: HttpStatus.BAD_REQUEST,
            message: '외래 키 제약 조건 위반',
          };
        case 'P2025':
          return {
            status: HttpStatus.NOT_FOUND,
            message: '해당 레코드를 찾을 수 없습니다',
          };
        case 'P2016':
        case 'P2017':
          return {
            status: HttpStatus.BAD_REQUEST,
            message: '쿼리 구문이 올바르지 않습니다',
          };
        default:
          return {
            status: HttpStatus.BAD_REQUEST,
            message: `데이터베이스 오류: ${exception.code || '알 수 없는 오류'}`,
          };
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: '입력 값 검증 실패',
      };
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '데이터베이스 연결 초기화 실패',
      };
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '데이터베이스 내부 오류',
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '예상치 못한 데이터베이스 오류',
      };
    }
  }

  private getErrorDetails(exception: any): any {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: exception.code,
        meta: exception.meta,
        clientVersion: exception.clientVersion,
      };
    }

    return {
      name: exception.name,
      message: exception.message,
    };
  }
}
