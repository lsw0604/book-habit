import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new LoggerService().setContext('LoggingInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, user } = req;
    const userId = user?.id || 'unauthorized';

    const now = Date.now();
    this.logger.log(`Request: ${method} ${url} - User: ${userId}`, { body });

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          this.logger.log(
            `Response: ${method} ${url} - Status: ${response.statusCode} - ${Date.now() - now}ms`,
            { userId, responseSize: JSON.stringify(data).length },
          );
        },
        error: (error) => {
          this.logger.error(
            `Response Error: ${method} ${url} - ${Date.now() - now}ms`,
            error.stack,
            { userId },
          );
        },
      }),
    );
  }
}
