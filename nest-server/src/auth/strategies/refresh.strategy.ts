import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

interface TokenPayload {
  userId: number;
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies['refresh_token'],
      ]),
      secretOrKey: configService.getOrThrow('SECRET_REFRESH_KEY'),
    });
  }

  async validate(payload: TokenPayload) {
    const users = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        email: true,
        birthday: true,
        name: true,
        gender: true,
      },
    });

    return users;
  }
}
