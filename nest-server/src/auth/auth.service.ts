import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthSignInDto) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        birthday: true,
        email: true,
        gender: true,
        password: true,
        name: true,
      },
    });

    if (!user) throw new UnauthorizedException('해당 이메일을 가진 사용자를 찾을 수 없습니다.');

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw new UnauthorizedException('올바른 비밀번호를 입력해주세요.');

    const { password: _, ...rest } = user;

    return { ...rest };
  }

  async register(dto: AuthLocalSignUp) {
    await this.userService.registerUser(dto);

    const user = await this.login(dto);

    // const { accessToken, refreshToken } = example;

    return {
      ...user,
    };
  }

  async refreshToken() {
    return;
  }

  async logout() {
    return;
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '15s' });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });

    return {
      accessToken,
      refreshToken,
    };
  }
}
