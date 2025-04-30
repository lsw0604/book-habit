import type {
  KakaoAccessTokenResponse,
  KakaoUserInfoResponse,
  ResponseKakaoCallback,
  ResponseTokens,
} from './interface';
import type { AxiosError } from 'axios';
import * as qs from 'qs';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { KAKAO_API_ME_URL, KAKAO_AUTH_TOKEN_URL } from './constant';
import {
  KakaoUserInfoFetchFailedException,
  KakaoApiResponseDataInvalidException,
  KakaoAccessTokenNotIssuedException,
} from './exceptions';

@Injectable()
export class AuthKakaoService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AuthKakaoService.name);
  }

  public async kakaoCallback(code: string, redirectUri?: string): Promise<ResponseKakaoCallback> {
    const actualRedirectUri: string =
      redirectUri || this.configService.getOrThrow<string>('KAKAO_CALLBACK_URL');
    const body: string = this.kakaoQsStringify(code, actualRedirectUri);
    const { access_token } = await this.getKakaoAccessToken(body);
    const { kakao_account, id } = await this.getKakaoId(access_token);

    const email: string = this.kakaoEmailTransfer(id);
    const name: string = this.kakaoNameTransfer(id);
    const profile: string = kakao_account.profile.thumbnail_image_url;

    const existKakaoUser: User = await this.userService.getUserByEmail(email);
    let user: User = existKakaoUser;

    if (!existKakaoUser) {
      user = await this.userService.createKakaoUser({
        email,
        name,
        provider: 'KAKAO',
        profile,
      });
    }

    const token: ResponseTokens = this.tokenService.generateToken(user.id);

    return {
      ...token,
      ...user,
    };
  }

  private async getKakaoId(token: string): Promise<KakaoUserInfoResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<KakaoUserInfoResponse>(KAKAO_API_ME_URL, {
            headers: {
              'Content-Type': 'application/x-www-urlencoded;',
              Authorization: `Bearer ${token}`,
            },
          })
          .pipe(
            catchError((error: AxiosError): never => {
              this.logger.error(
                `카카오 API (v2/user/me) 호출 실패: ${JSON.stringify(error.response?.data)}`,
              );
              throw new KakaoUserInfoFetchFailedException(
                '카카오 사용자 정보 API 호출에 실패했습니다.',
              );
            }),
          ),
      );

      if (!data.id || !data.kakao_account || !data.properties) {
        this.logger.error(`카카오 사용자 정보 누락: ${JSON.stringify(data)}`);
        throw new KakaoApiResponseDataInvalidException(
          '카카오 사용자 정보를 받아오는데 실패했습니다.',
        );
      }

      return data;
    } catch (error) {
      this.logger.error(`카카오 API (v2/user/me) 호출 중 오류 발생: ${error}`);
      if (
        error instanceof KakaoUserInfoFetchFailedException ||
        error instanceof KakaoApiResponseDataInvalidException
      ) {
        throw error;
      }
      throw new KakaoUserInfoFetchFailedException(
        '카카오 사용자 정보 API 호출 중 오류가 발생했습니다.',
      );
    }
  }

  private async getKakaoAccessToken(body: string): Promise<KakaoAccessTokenResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .post<KakaoAccessTokenResponse>(KAKAO_AUTH_TOKEN_URL, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .pipe(
            catchError((error: AxiosError): never => {
              this.logger.error(
                `카카오 API (oauth/token) 호출 실패: ${JSON.stringify(error.response?.data)}`,
              );
              throw new KakaoAccessTokenNotIssuedException();
            }),
          ),
      );

      if (!data?.access_token) {
        this.logger.error('카카오 Access Token이 응답에 없습니다.');
        throw new KakaoAccessTokenNotIssuedException();
      }

      return data;
    } catch (error) {
      this.logger.error(`카카오 API (oauth/token) 호출 중 오류 발생: ${error}`);
      if (error instanceof KakaoAccessTokenNotIssuedException) {
        throw error;
      }
      throw new KakaoAccessTokenNotIssuedException();
    }
  }

  private kakaoQsStringify(code: string, redirectUri: string): string {
    const body: string = qs.stringify({
      grant_type: 'authorization_code',
      client_id: this.configService.getOrThrow<string>('KAKAO_CLIENT_ID'),
      redirect_uri: redirectUri,
      code,
    });
    return body;
  }

  private kakaoEmailTransfer(id: number): string {
    const emailAddress = '@oauth.kakao.com';
    return `${id}${emailAddress}`;
  }

  private kakaoNameTransfer(id: number): string {
    return `kakao_${id}`;
  }
}
