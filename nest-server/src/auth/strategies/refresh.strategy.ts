import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { TokenInterface } from '../interface/token.interface';

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
          const token = request?.cookies['refresh_token'];

          return token;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('SECRET_REFRESH_KEY'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenInterface) {
    const user = await this.userService.getUserById(payload.id);

    const { id, ...rest } = user;
    const { accessToken } = await this.authService.generateAccessToken({ id });

    return {
      accessToken,
      user: { id, ...rest },
    };
  }
}
