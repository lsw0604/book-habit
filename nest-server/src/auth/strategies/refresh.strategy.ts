import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies['refreshToken'];

          return token;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('SECRET_REFRESH_KEY'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenType) {
    const user = await this.userService.getUser({ id: payload.id });

    const { id } = user;
    const { accessToken } = this.authService.generateAccessToken(id);

    return {
      accessToken,
      ...user,
    };
  }
}
