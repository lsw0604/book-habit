import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class SetBearerHeaderInterceptor<T> implements NestInterceptor {
  constructor(
    private readonly headerKey: keyof T,
    private readonly headerName: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data: T) => {
        const response: Response = context.switchToHttp().getResponse();
        const headerValue = data[this.headerKey];
        if (headerValue) {
          response.setHeader(this.headerName, `Bearer ${headerValue}`);
          delete data[this.headerKey];
        }
      }),
    );
  }
}
