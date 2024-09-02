import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { code } = request.query;

    if (!code) throw new UnauthorizedException('인증 코드를 찾을 수 없습니다.');

    const user = await this.authService.kakao(code);

    if (!user) throw new UnauthorizedException('kakao token 인증에 실패했습니다.');

    request.user = user;
    return true;
  }
}
