import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable, map } from 'rxjs';

interface ResponseData<T> {
  user: T;
}

@Injectable()
class UserOmitPropertyInterceptor<T, K extends keyof T> implements NestInterceptor {
  constructor(private readonly propertyToOmit: K) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<Omit<T, K>>> | Promise<Observable<ResponseData<Omit<T, K>>>> {
    return next.handle().pipe(
      map((response: ResponseData<T>) => {
        if (response && response.user) {
          const { [this.propertyToOmit]: _, ...rest } = response.user;
          return { ...response, user: rest };
        }
        return response as ResponseData<Omit<T, K>>;
      }),
    );
  }
}

export const ExcludeUserIdInterceptor = new UserOmitPropertyInterceptor<User, 'id'>('id');
export const ExcludeUserNameInterceptor = new UserOmitPropertyInterceptor<User, 'name'>('name');
export const ExcludeUserEmailInterceptor = new UserOmitPropertyInterceptor<User, 'email'>('email');
export const ExcludeUserGenderInterceptor = new UserOmitPropertyInterceptor<User, 'gender'>(
  'gender',
);
export const ExcludeUserProfileInterceptor = new UserOmitPropertyInterceptor<User, 'profile'>(
  'profile',
);
export const ExcludeUserPasswordInterceptor = new UserOmitPropertyInterceptor<User, 'password'>(
  'password',
);
export const ExcludeUserProviderInterceptor = new UserOmitPropertyInterceptor<User, 'provider'>(
  'provider',
);
export const ExcludeUserBirthdayInterceptor = new UserOmitPropertyInterceptor<User, 'birthday'>(
  'birthday',
);
