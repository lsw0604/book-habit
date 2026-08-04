import type { AuthTokens } from './types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public generateToken(userId: number): AuthTokens {
    const { accessToken } = this.generateAccessToken(userId);
    const { refreshToken } = this.generateRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(id: number): { accessToken: string } {
    const accessToken: string = this.jwtService.sign({ id });
    return {
      accessToken,
    };
  }

  private generateRefreshToken(id: number): { refreshToken: string } {
    const refreshToken: string = this.jwtService.sign(
      { id },
      { expiresIn: '7d', secret: this.configService.getOrThrow<string>('SECRET_REFRESH_KEY') },
    );
    return {
      refreshToken,
    };
  }
}
