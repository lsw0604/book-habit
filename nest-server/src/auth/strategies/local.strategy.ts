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

    const { accessToken } = this.authService.generateAccessToken(user.id);
    const { refreshToken } = this.authService.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      ...user,
    };
  }
}
