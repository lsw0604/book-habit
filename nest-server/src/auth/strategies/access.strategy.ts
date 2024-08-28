import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Gender } from '@prisma/client';

export interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

interface AccessTokenPayload extends TokenPayload {
  name: string;
  email: string;
  gender: Gender;
  birthday: string;
}

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_ACCESS_KEY'),
    });
  }

  /**
   * * validate 메서드는 decoded된 데이터를 받는다.
   */
  async validate(payload: AccessTokenPayload) {
    return payload;
  }
}
