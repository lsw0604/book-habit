import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('SECRET_ACCESS_KEY'),
    });
  }

  async validate(payload: string) {
    console.log(payload);
    try {
      const isValid = this.jwtService.verify(payload, {
        secret: process.env.SECRET_ACCESS_KEY,
      });

      if (!isValid) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다.');
      }
      return payload;
    } catch (err) {
      let message = '유효하지 않은 토큰입니다.';

      if (err.name === 'TokenExpiredError') {
        message = '토큰이 만료되었습니다.';
      } else if (err.name === 'JsonWebTokenError') {
        message = '유효하지 않은 토큰 형식입니다.';
      }

      throw new UnauthorizedException(message);
    }
  }
}
