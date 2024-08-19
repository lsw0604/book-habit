import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  private readonly logger = new Logger(AccessStrategy.name);
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_ACCESS_KEY'),
    });
  }

  async validate(payload: any) {
    this.logger.debug(`Validating payload: ${JSON.stringify(payload)}`);
    return payload;
  }
}
