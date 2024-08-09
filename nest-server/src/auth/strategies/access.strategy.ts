import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface AccessTokenPayload {
  userId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('SECRET_ACCESS_KEY'),
    });
  }

  validate(payload: AccessTokenPayload) {
    console.log('access_strategy : ', payload);
    return payload;
  }
}
