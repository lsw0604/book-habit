import { Injectable } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UserValidateEmailDto } from 'src/user/dto/user.validate.email.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private userService: UserService) { }

  async signIn(dto: AuthSignInDto) {


    return `${dto.email} ${dto.password}`;
  }

  async signUp(dto: AuthLocalSignUp) {
    const auth = this.userService.registerUser(dto);

    return auth;
  }
}
