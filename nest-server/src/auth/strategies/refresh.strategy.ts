import { Request } from 'express';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from '../token.service';
import { ResponseRefresh } from '../interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly userService: UserService,
    private tokenService: TokenService,
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

  async validate(payload: TokenType): Promise<ResponseRefresh> {
    const user: User = await this.userService.getUserById(payload.id);
    const { accessToken } = this.tokenService.generateToken(user.id);

    return {
      accessToken,
      ...user,
    };
  }
}
