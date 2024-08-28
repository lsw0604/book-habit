import { Request } from 'express';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from './access.strategy';
import { AuthService } from '../auth.service';

interface RefreshTokenPayload extends TokenPayload {}

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

  async validate(payload: RefreshTokenPayload) {
    const user = await this.userService.getUserById(payload.id);
    if (!user) throw new ConflictException();

    const { id, ...rest } = user;
    const { accessToken } = await this.authService.generateAccessToken({ id });

    return {
      accessToken,
      user: { ...rest },
    };
  }
}
