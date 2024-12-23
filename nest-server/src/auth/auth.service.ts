import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthRegisterDto } from './dto/auth.register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async login(dto: AuthLoginDto) {
    const user = await this.validateUser(dto);
    const token = await this.tokenService.generateToken(user.id);

    return {
      ...user,
      ...token,
    };
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

    return await this.login(user);
  }

  private async validateUser(dto: AuthLoginDto) {
    const user = await this.userService.getUser({ email: dto.email });
    if (!user) throw new UnauthorizedException('해당 이메일을 가진 사용자를 찾을 수 없습니다.');
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('올바른 비밀번호를 입력해주세요.');
    return user;
  }

  private async hashPassword(password: string) {
    const BCRYPT_SALT_ROUNDS = 10;
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }
}
