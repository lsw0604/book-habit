import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthTokenPayloadDto } from './dto/auth.token.payload.dto';
import { AuthLocalRegisterDto } from './dto/auth.local.register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthLoginDto) {
    const { email, password } = dto;
    const user = await this.userService.getUserByEmail({
      email,
    });

    if (!user) throw new UnauthorizedException('해당 이메일을 가진 사용자를 찾을 수 없습니다.');

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw new UnauthorizedException('올바른 비밀번호를 입력해주세요.');

    const { password: _, ...rest } = user;

    return rest;
  }

  async register(dto: AuthLocalRegisterDto) {
    const user = await this.userService.registerUser(dto);

    const { password: _, id, ...rest } = user;

    const { accessToken } = await this.generateAccessToken({ id });
    const { refreshToken } = await this.generateRefreshToken({ id });

    return {
      user: { ...rest },
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

  async generateRefreshToken(dto: AuthTokenPayloadDto) {
    const { id } = dto;
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '7d', secret: this.configService.getOrThrow<string>('SECRET_REFRESH_KEY') },
    );
    return {
      refreshToken,
    };
  }

  async generateAccessToken(dto: AuthTokenPayloadDto) {
    const { id } = dto;
    const accessToken = this.jwtService.sign({ id });
    return {
      accessToken,
    };
  }
}
