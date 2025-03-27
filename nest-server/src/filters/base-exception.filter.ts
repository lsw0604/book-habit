import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

export abstract class BaseExceptionFilter implements ExceptionFilter {
  protected readonly logger: Logger;

  constructor(
    protected readonly configService: ConfigService,
    loggerContext?: string,
  ) {
    this.logger = new Logger(loggerContext || this.constructor.name);
  }

  abstract catch(exception: unknown, host: ArgumentsHost): void;

  protected createErrorResponse(
    status: number,
    message: string,
    request: Request,
    details?: any,
  ): any {
    return {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(this.isDevelopment() && details ? { details } : {}),
    };
  }

  protected sendErrorResponse(
    response: Response,
    status: number,
    message: string,
    request: Request,
    details?: any,
  ): void {
    if (!response.headersSent) {
      response.status(status).json(this.createErrorResponse(status, message, request, details));
    }
  }

  protected logException(
    request: Request,
    status: number,
    message: string,
    exception: unknown,
  ): void {
    const stack = exception instanceof Error && this.isDevelopment() ? exception.stack : undefined;

    this.logger.error(
      `[${request.method}] ${request.url} - Status: ${status}, Message: ${message}`,
      stack,
    );
  }

  protected isDevelopment(): boolean {
    const env = this.configService.get<string>('NODE_ENV');
    return env === 'development' || env === 'local';
  }
}
