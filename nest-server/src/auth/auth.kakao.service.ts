import type { KakaoAccessTokenResponse, KakaoUserInfoResponse } from './interface';
import type { AxiosError } from 'axios';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import * as qs from 'qs';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class AuthKakaoService {
  private readonly KAKAO_API_ME_URL = 'https://kapi.kakao.com/v2/user/me';
  private readonly KAKAO_AUTH_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
  private readonly KAKAO_CLIENT_ID_KEY = 'KAKAO_CLIENT_ID';

  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AuthKakaoService.name);
  }

  public async kakaoCallback(code: string, redirectUri?: string) {
    const actualRedirectUri =
      redirectUri || this.configService.getOrThrow<string>('KAKAO_REDIRECT_URI');
    const body = this.kakaoQsStringify(code, actualRedirectUri);
    const { access_token } = await this.getKakaoAccessToken(body);
    const { kakao_account, id } = await this.getKakaoId(access_token);

    const email = this.kakaoEmailTransfer(id);
    const name = this.kakaoNameTransfer(id);
    const profile = kakao_account.profile.thumbnail_image_url;

    const existKakaoId = await this.userService.getUser({ email });

    if (!!existKakaoId) {
      const token = await this.tokenService.generateToken(existKakaoId.id);

      return {
        ...token,
        existKakaoId,
      };
    }

    const user = await this.userService.createUser({
      email,
      name,
      provider: 'KAKAO',
      profile,
    });

    const token = await this.tokenService.generateToken(user.id);

    return {
      ...token,
      ...user,
    };
  }

  private async getKakaoId(token: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<KakaoUserInfoResponse>(this.KAKAO_API_ME_URL, {
            headers: {
              'Content-Type': 'application/x-www-urlencoded;',
              Authorization: `Bearer ${token}`,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response.data) {
                this.logger.error(error.response.data as string);
              }
              throw new UnauthorizedException('v2/user/me 카카오 API 호출에 실패했습니다.');
            }),
          ),
      );

      if (!data.id || !data.kakao_account || !data.properties) {
        throw new UnauthorizedException('kakao User 정보를 받아오는데 실패했습니다.');
      }

      return data;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('v2/user/me 카카오 API 호출 중에 오류가 발생했습니다.');
    }
  }

  private async getKakaoAccessToken(body: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .post<KakaoAccessTokenResponse>(this.KAKAO_AUTH_TOKEN_URL, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response.data) {
                this.logger.error(error.response.data as string);
              }
              throw new UnauthorizedException('oauth/token 카카오 API 호출에 실패했습니다.');
            }),
          ),
      );

      if (!data.access_token) {
        throw new UnauthorizedException('kakao_access_token이 존재하지 않습니다.');
      }

      return {
        access_token: data.access_token,
        token_type: data.token_type,
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('oauth/token 카카오 API 호출 중에 오류가 발생했습니다.');
    }
  }

  private kakaoQsStringify(code: string, redirectUri: string) {
    const body = qs.stringify({
      grant_type: 'authorization_code',
      client_id: this.configService.getOrThrow<string>(this.KAKAO_CLIENT_ID_KEY),
      redirect_uri: redirectUri,
      code,
    });
    this.logger.debug(`KAKAO_QS_STRINGIFY : ${body}`);
    return body;
  }

  private kakaoEmailTransfer(id: number) {
    const emailAddress = '@oauth.kakao.com';
    return `${id}${emailAddress}`;
  }

  private kakaoNameTransfer(id: number) {
    return `kakao_${id}`;
  }
}
