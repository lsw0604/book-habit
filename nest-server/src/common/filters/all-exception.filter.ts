import { ArgumentsHost, Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from './base-exception.filter';
import { PrismaExceptionFilter } from './prisma-exception.filter';

@Injectable()
@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  constructor(
    configService: ConfigService,
    private readonly prismaExceptionFilter: PrismaExceptionFilter,
  ) {
    super(configService, AllExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientUnknownRequestError ||
      exception instanceof Prisma.PrismaClientRustPanicError ||
      exception instanceof Prisma.PrismaClientInitializationError ||
      exception instanceof Prisma.PrismaClientValidationError
    ) {
      return this.prismaExceptionFilter.catch(exception, host);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();

      let message: string;
      let details: any = undefined;

      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (typeof responseBody === 'object' && responseBody !== null) {
        const body = responseBody as Record<string, any>;
        message = body.message || '알 수 없는 오류';

        if (this.isDevelopment()) {
          const { message: _, ...remainingDetails } = body;
          details = Object.keys(remainingDetails).length > 0 ? remainingDetails : undefined;
        }
      } else {
        message = '알 수 없는 오류';
      }

      this.logException(request, status, message, exception);

      this.sendErrorResponse(response, status, message, request, details);
      return;
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = '서버 내부 오류가 발생했습니다.';

    const details =
      this.isDevelopment() && exception instanceof Error
        ? { name: exception.name, message: exception.message }
        : undefined;

    this.logException(request, status, message, exception);

    this.sendErrorResponse(response, status, message, request, details);
  }
}
