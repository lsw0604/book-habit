import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class OmitPropertyInterceptor<T, K extends keyof T> implements NestInterceptor {
  constructor(private readonly propertyToOmit: K) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Omit<T, K>> | Promise<Observable<Omit<T, K>>> {
    return next.handle().pipe(
      map((data: T) => {
        if (data) {
          const { [this.propertyToOmit]: _, ...rest } = data;
          return rest as Omit<T, K>;
        }
        return data as Omit<T, K>;
      }),
    );
  }
}
