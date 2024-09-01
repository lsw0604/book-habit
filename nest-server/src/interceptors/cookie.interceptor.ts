import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class CookieInterceptor<T, K extends keyof T> implements NestInterceptor {
  constructor(private readonly omitToProperty: K) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: T) => {
        const response: Response = context.switchToHttp().getResponse();
        if (data) {
          response.cookie(this.omitToProperty as string, data[this.omitToProperty], {
            httpOnly: true,
            secure: true,
          });
          const { [this.omitToProperty]: _, ...rest } = data;
          return rest as Omit<T, K>;
        }
        return data as Omit<T, K>;
      }),
    );
  }
}