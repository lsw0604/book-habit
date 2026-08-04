import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtPayload } from '../types';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly userService: UserService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          return request?.cookies?.['accessToken'];
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('SECRET_ACCESS_KEY'),
    });
  }

  /**
   * * validate 메서드는 decoded된 데이터를 받는다.
   */
  async validate(payload: JwtPayload): Promise<User> {
    return await this.userService.getUserById(payload.id);
  }
}
