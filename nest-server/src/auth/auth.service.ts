import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthGenerateTokenDto } from './dto/auth.generate.token.dto';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

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

    return rest;
  }

  async register(dto: AuthLocalSignUp) {
    const user = await this.userService.registerUser(dto);

    const { password: _, id, ...rest } = user;

    const { accessToken } = await this.generateAccessToken({ ...rest, id });
    const { refreshToken } = await this.generateRefreshToken({ id });

    return {
      ...rest,
      accessToken,
      refreshToken,
    };
  }

  async refresh() {
    return;
  }

  async logout() {
    return;
  }

  async generateRefreshToken(dto: Pick<AuthGenerateTokenDto, 'id'>) {
    const { id } = dto;
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '1h', privateKey: process.env.SECRET_REFRESH_KEY },
    );
    return {
      refreshToken,
    };
  }

  async generateAccessToken(dto: AuthGenerateTokenDto) {
    const { email, birthday, gender, id, name } = dto;
    const accessToken = this.jwtService.sign(
      { id, email, birthday, gender, name },
      { expiresIn: '5m', privateKey: process.env.SECRET_ACCESS_KEY },
    );
    return {
      accessToken,
    };
  }
}
