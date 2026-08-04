import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class KakaoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { code } = request.query;

    if (!code) throw new UnauthorizedException('인증 코드를 찾을 수 없습니다.');

    return true;
  }
}
