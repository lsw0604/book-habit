import { Gender } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface TokenPayload {
  id: number;
  name: string;
  birthday: Date;
  gender: Gender;
  email: string;
}

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('SECRET_ACCESS_KEY'),
    });
  }

  async validate(payload: TokenPayload) {
    return payload;
  }
}
