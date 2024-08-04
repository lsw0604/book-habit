import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshJWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super();
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
