import type { AuthTokens } from './types';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { InvalidCredentialsException } from './exceptions';
import { AuthRegisterDto } from './dto';
import { AuthUser } from 'src/types/express';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  public async login(email: string, password: string): Promise<AuthUser> {
    const user: User = await this.userService.findUserByEmail(email);
    if (!user) throw new InvalidCredentialsException();
    const bcryptPassword: boolean = await this.comparePassword(password, user.password);
    if (!bcryptPassword) throw new InvalidCredentialsException();

    const token: AuthTokens = this.tokenService.generateToken(user.id);

    return {
      ...user,
      ...token,
    };
  }

  public async register(payload: AuthRegisterDto): Promise<AuthUser> {
    const { password } = payload;

    const hashedPassword: string = await this.hashPassword(password);

    const user: User = await this.userService.createUser({
      ...payload,
      password: hashedPassword,
      provider: 'LOCAL',
    });

    const token: AuthTokens = this.tokenService.generateToken(user.id);

    return {
      ...user,
      ...token,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const BCRYPT_SALT_ROUNDS = 10;
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }

  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
