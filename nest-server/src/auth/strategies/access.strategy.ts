import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenInterface } from '../interface/token.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly userService: UserService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_ACCESS_KEY'),
    });
  }

  /**
   * * validate 메서드는 decoded된 데이터를 받는다.
   */
  async validate(payload: TokenInterface) {
    const user = await this.userService.findUser({ id: payload.id });

    const { password: _, ...rest } = user;

    return {
      user: rest,
    };
  }
}
