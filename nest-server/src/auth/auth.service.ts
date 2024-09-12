import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthRegisterDto } from './dto/auth.register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthLoginDto) {
    const { email, password } = dto;
    const user = await this.userService.getUser({
      email,
    });

    if (!user) throw new UnauthorizedException('해당 이메일을 가진 사용자를 찾을 수 없습니다.');

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw new UnauthorizedException('올바른 비밀번호를 입력해주세요.');

    return user;
  }

  async register(dto: AuthRegisterDto) {
    const existEmail = await this.userService.getUser({ email: dto.email });

    if (!!existEmail) throw new UnauthorizedException('해당 이메일이 존재합니다.');

    const hashedPassword = await this.hashPassword(dto.password);
    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
      provider: 'LOCAL',
    });

    const { accessToken } = this.generateAccessToken(user.id);
    const { refreshToken } = this.generateRefreshToken(user.id);

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  generateRefreshToken(id: number) {
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '7d', secret: this.configService.getOrThrow<string>('SECRET_REFRESH_KEY') },
    );
    return {
      refreshToken,
    };
  }

  generateAccessToken(id: number) {
    const accessToken = this.jwtService.sign({ id });
    return {
      accessToken,
    };
  }

  private async hashPassword(password: string) {
    const BCRYPT_SALT_ROUNDS = 10;
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }
}
