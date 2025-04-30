import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthKakaoService } from '../auth.kakao.service';
import { ResponseKakaoCallback } from '../interface';

@Injectable()
export class KakaoGuard implements CanActivate {
  constructor(private readonly authKakaoService: AuthKakaoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { code, redirect_uri } = request.query;

    if (!code) throw new UnauthorizedException('인증 코드를 찾을 수 없습니다.');

    try {
      const user: ResponseKakaoCallback = await this.authKakaoService.kakaoCallback(
        code,
        redirect_uri,
      );

      request.user = user;
      return true;
    } catch (error) {
      throw error;
    }
  }
}
