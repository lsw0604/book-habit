import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(userId),
      this.generateRefreshToken(userId),
    ]);

    return {
      ...accessToken,
      ...refreshToken,
    };
  }

  private generateAccessToken(id: number) {
    const accessToken = this.jwtService.sign({ id });
    return {
      accessToken,
    };
  }

  private generateRefreshToken(id: number) {
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '7d', secret: this.configService.getOrThrow<string>('SECRET_REFRESH_KEY') },
    );
    return {
      refreshToken,
    };
  }
}
