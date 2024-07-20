import { Injectable } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signIn(dto: AuthSignInDto) {
    return `${dto.email} ${dto.password}`;
  }

  async signUp(dto: AuthLocalSignUp) {
    return `${dto.email} ${dto.password} ${dto.birthday} ${dto.gender} ${dto.name}`;
  }
}
