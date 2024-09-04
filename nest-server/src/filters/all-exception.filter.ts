import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    if (!response.headersSent) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.path,
        message: exception instanceof HttpException ? exception.message : 'Internal server error',
      });
    }
  }
}
