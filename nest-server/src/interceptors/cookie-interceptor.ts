import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        if (data && data.refreshToken) {
          response.cookie('refresh_token', data.refreshToken, { httpOnly: true, secure: true });
          delete data.refreshToken;
        }
      }),
    );
  }
}
