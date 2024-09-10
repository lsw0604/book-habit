import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';

export const UserDecorator = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException(
        'request에서 user를 찾을 수 없습니다. AccessGuard가 적용됐는지 확인해주세요.',
      );
    }

    if (data) {
      if (user[data] !== undefined) {
        throw new UnauthorizedException(`user객체에서 속성 ${data} 을(를) 찾을 수 없습니다.`);
      }
      return user[data];
    }

    return user;
  },
);
