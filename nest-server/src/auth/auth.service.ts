import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as qs from 'qs';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthLocalRegisterDto } from './dto/auth.local.register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthLoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findUser({
      email,
    });

    if (!user) throw new UnauthorizedException('해당 이메일을 가진 사용자를 찾을 수 없습니다.');

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw new UnauthorizedException('올바른 비밀번호를 입력해주세요.');

    const { password: _, ...rest } = user;

    return rest;
  }

  async register(dto: AuthLocalRegisterDto) {
    const existEmail = await this.userService.findUser({ email: dto.email });

    if (!!existEmail) throw new UnauthorizedException('해당 이메일이 존재합니다.');

    const hashedPassword = await this.hashPassword(dto.password);
    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
      provider: 'LOCAL',
    });
    const { password: _, ...rest } = user;

    const { accessToken } = this.generateAccessToken(user.id);
    const { refreshToken } = this.generateRefreshToken(user.id);

    return {
      ...rest,
      accessToken,
      refreshToken,
    };
  }

  generateRefreshToken(id: number) {
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '7d', secret: this.configService.getOrThrow<string>('SECRET_REFRESH_KEY') },
    );
    return {
      refreshToken,
    };
  }

  generateAccessToken(id: number) {
    const accessToken = this.jwtService.sign({ id });
    return {
      accessToken,
    };
  }

  async kakao(code: string) {
    const body = qs.stringify({
      grant_type: 'authorization_code',
      client_id: this.configService.getOrThrow<string>('KAKAO_CLIENT_ID'),
      redirect_uri: `${this.configService.getOrThrow<string>('KAKAO_CALLBACK_URL')}/api/auth/kakao`,
      code,
    });

    const { access_token } = await this.getKakaoAccessToken(body);

    if (!access_token) throw new UnauthorizedException('kakao_access_token이 존재하지 않습니다.');

    const { kakao_email, kakao_account } = await this.getKakaoId(access_token);

    if (!kakao_email) throw new UnauthorizedException('kakao_id가 존재하지 않습니다.');

    const email = await this.kakaoEmailTransfer(kakao_email);
    const profile: string = kakao_account.profile.thumbnail_image_url;

    const existKakaoId = await this.userService.findUser({
      email,
    });

    if (!!existKakaoId) {
      const { accessToken } = this.generateAccessToken(existKakaoId.id);
      const { refreshToken } = this.generateRefreshToken(existKakaoId.id);

      return {
        accessToken,
        refreshToken,
        ...existKakaoId,
      };
    }

    const user = await this.userService.createUser({
      email,
      provider: 'KAKAO',
      profile,
    });

    const { accessToken } = this.generateAccessToken(user.id);
    const { refreshToken } = this.generateRefreshToken(user.id);

    return {
      refreshToken,
      accessToken,
      ...user,
    };
  }

  private async getKakaoId(token: string) {
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
        throw new UnauthorizedException('v2/user/me 카카오 API 호룰에 실패했습니다.');
      }

      const { kakao_email, kakao_account } = await response.json();

      return {
        kakao_email,
        kakao_account,
      };
    } catch (err) {
      throw new UnauthorizedException('v2/user/me 카카오 API 호출 중에 오류가 발생했습니다.');
    }
  }

  private async getKakaoAccessToken(body: string) {
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

      const { access_token } = await response.json();
      return {
        access_token,
      };
    } catch (err) {
      throw new UnauthorizedException('oauth/token 카카오 API 호출 중에 오류가 발생했습니다.');
    }
  }

  private async hashPassword(password: string) {
    const BCRYPT_SALT_ROUNDS = 10;
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }

  private async kakaoEmailTransfer(kakao_email: number) {
    const emailAddress = '@oauth.kakao.com';
    return `${kakao_email}${emailAddress}`;
  }
}
