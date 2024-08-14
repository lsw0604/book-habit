import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => {
        let token: string;
        if (req && req.cookies) {
          token = req.cookies['refresh_token'];
          return token;
        }
      },
      secretOrKey: configService.getOrThrow('SECRET_REFRESH_KEY'),
    });
  }

  async validate(payload: { userId: number }) {
    const users = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    return users;
  }
}
