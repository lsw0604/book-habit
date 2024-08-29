import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.login({
      email,
      password,
    });

    const { accessToken } = await this.authService.generateAccessToken({ id: user.id });
    const { refreshToken } = await this.authService.generateRefreshToken({ id: user.id });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
