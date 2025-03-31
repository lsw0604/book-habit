import type {
  IsExistEmailPayload,
  LoginPayload,
  RegisterPayload,
  ValidateUserPayload,
} from './interface';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  public async login(payload: LoginPayload) {
    const user = await this.validateUser(payload);
    const token = await this.tokenService.generateToken(user.id);

    return {
      ...user,
      ...token,
    };
  }

  public async register(payload: RegisterPayload) {
    const { password } = payload;

    const hashedPassword = await this.hashPassword(password);
    const user = await this.userService.createUser({
      ...payload,
      password: hashedPassword,
      provider: 'LOCAL',
    });

    const token = this.tokenService.generateToken(user.id);

    return {
      ...user,
      ...token,
    };
  }

  public async isEmailRegistered(payload: IsExistEmailPayload): Promise<boolean> {
    const { email } = payload;
    const user = await this.userService.getUser({ email });
    return !!user;
  }

  private async validateUser(payload: ValidateUserPayload) {
    const { email, password } = payload;
    const user = await this.userService.getUser({ email });
    if (!user) throw new UnauthorizedException('해당 이메일을 가진 사용자를 찾을 수 없습니다.');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('올바른 비밀번호를 입력해주세요.');
    return user;
  }

  private async hashPassword(password: string) {
    const BCRYPT_SALT_ROUNDS = 10;
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }
}
