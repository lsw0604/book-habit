import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthKakaoService } from '../auth.kakao.service';

@Injectable()
export class KakaoGuard implements CanActivate {
  constructor(private readonly authKakaoService: AuthKakaoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { code } = request.query;

    if (!code) throw new UnauthorizedException('인증 코드를 찾을 수 없습니다.');

    const user = await this.authKakaoService.kakao(code);

    if (!user) throw new UnauthorizedException('kakao token 인증에 실패했습니다.');

    request.user = user;
    return true;
  }
}
