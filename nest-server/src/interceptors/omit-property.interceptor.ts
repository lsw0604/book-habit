import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class OmitPropertyInterceptor<T extends object, K extends keyof T>
  implements NestInterceptor
{
  constructor(private readonly propertyToOmit: K[]) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Omit<T, K> | Omit<T, K>[]> | Promise<Observable<Omit<T, K> | Omit<T, K>[]>> {
    return next.handle().pipe(
      map((data: T | T[]) => {
        const omitProperties = (item: T): Omit<T, K> => {
          let result = { ...item } as T;

          for (const prop of this.propertyToOmit) {
            const { [prop]: _, ...rest } = result;
            result = rest as T;
          }

          return result as Omit<T, K>;
        };

        if (Array.isArray(data)) {
          return data.map((item) => omitProperties(item));
        } else if (data) {
          return omitProperties(data);
        }

        return data;
      }),
    );
  }
}
