import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

interface TokenPayload {
  id: number;
}

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  private readonly logger = new Logger(AccessStrategy.name);

  constructor(
    configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_ACCESS_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: TokenPayload) {
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      console.log(token);
      const result = await this.jwtService.verifyAsync(token);
      this.logger.debug(`Result : ${JSON.stringify(result)}`);
      this.logger.debug(`Validating payload: ${JSON.stringify(payload)}`);
      return payload;
    } catch (err) {
      console.log('ssss');
      console.log(err);
      this.logger.error(`Token validation error: ${err.message}`);
      if (err.message === 'jwt expired') {
        throw new UnauthorizedException('Token has expired');
      } else if (err.message === 'jwt malformed') {
        throw new UnauthorizedException('Token is malformed');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
