import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaExceptionFilter } from './prisma-exception.filter';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor(private readonly prismaExceptionFilter: PrismaExceptionFilter) {}

  catch(exception: unknown, host: ArgumentsHost) {
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

    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    this.logger.error(
      `HTTP Status: ${status} Error Message: ${
        exception instanceof HttpException ? exception.message : 'Unknown error'
      }`,
    );

    if (!response.headersSent) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.path,
        message: exception instanceof HttpException ? exception.message : 'server internal error',
      });
    }
  }
}
