import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthKakaoService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async kakao(code: string) {
    const body = this.kakaoQsStringify(code);
    const { access_token } = await this.getKakaoAccessToken(body);
    const { kakao_account, id } = await this.getKakaoId(access_token);

    const email: string = await this.kakaoEmailTransfer(id);
    const profile: string = kakao_account.profile.thumbnail_image_url;

    const existKakaoId = await this.userService.getUser({ email });

    if (!!existKakaoId) {
      const tokens = this.tokenGenerate(existKakaoId.id);

      return {
        ...tokens,
        ...existKakaoId,
      };
    }

    const user = await this.userService.createUser({
      email,
      provider: 'KAKAO',
      profile,
    });

    const tokens = this.tokenGenerate(user.id);

    return {
      ...tokens,
      ...existKakaoId,
    };
  }

  private async getKakaoId(token: string): Promise<KakaoUserInfoResponse> {
    const K_API_FETCH_ME_URL = 'https://kapi.kakao.com/v2/user/me';
    try {
      const response = await fetch(K_API_FETCH_ME_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new UnauthorizedException('v2/user/me 카카오 API 호출에 실패했습니다.');
      }

      const data: KakaoUserInfoResponse = await response.json();

      if (!data.id || !data.kakao_account || !data.properties) {
        throw new UnauthorizedException('kakao User 정보를 받아오는데 실패했습니다.');
      }

      return data;
    } catch (err) {
      throw new UnauthorizedException('v2/user/me 카카오 API 호출 중에 오류가 발생했습니다.');
    }
  }

  private async getKakaoAccessToken(body: string): Promise<KakaoAccessTokenResponse> {
    const K_AUTH_FETCH_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
    try {
      const response = await fetch(K_AUTH_FETCH_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      if (!response.ok) {
        throw new UnauthorizedException('oauth/token 카카오 API 호출에 실패했습니다.');
      }

      const { access_token, token_type } = await response.json();

      if (!access_token) throw new UnauthorizedException('kakao_access_token이 존재하지 않습니다.');

      return {
        access_token,
        token_type,
      };
    } catch (err) {
      throw new UnauthorizedException('oauth/token 카카오 API 호출 중에 오류가 발생했습니다.');
    }
  }

  private tokenGenerate(id: number) {
    const { accessToken } = this.authService.generateAccessToken(id);
    const { refreshToken } = this.authService.generateRefreshToken(id);

    return {
      accessToken,
      refreshToken,
    };
  }

  private kakaoQsStringify(code: string) {
    return qs.stringify({
      grant_type: 'authorization_code',
      client_id: this.configService.getOrThrow<string>('KAKAO_CLIENT_ID'),
      redirect_uri: `${this.configService.getOrThrow<string>('KAKAO_CALLBACK_URL')}/api/auth/kakao`,
      code,
    });
  }

  private kakaoEmailTransfer(id: number) {
    const emailAddress = '@oauth.kakao.com';
    return `${id}${emailAddress}`;
  }
}
