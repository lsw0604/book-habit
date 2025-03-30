import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PickPropertyInterceptor<T extends object, K extends keyof T>
  implements NestInterceptor
{
  constructor(private readonly propertiesToPick: K[]) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Pick<T, K> | Pick<T, K>[]> | Promise<Observable<Pick<T, K> | Pick<T, K>[]>> {
    return next.handle().pipe(
      map((data: T | T[]) => {
        const pickProperties = (item: T): Pick<T, K> => {
          const result: Partial<T> = {};

          for (const prop of this.propertiesToPick) {
            if (prop in item) {
              result[prop] = item[prop];
            }
          }

          return result as Pick<T, K>;
        };

        if (Array.isArray(data)) {
          return data.map((item) => pickProperties(item));
        } else if (data) {
          return pickProperties(data);
        }

        return data;
      }),
    );
  }
}
