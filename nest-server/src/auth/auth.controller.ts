import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signIn(@Req() dto: AuthSignInDto) {
    return this.authService.signIn(dto);
  }

  @Post()
  signUp(@Req() dto: AuthLocalSignUp) {
    return this.authService.signUp(dto);
  }
}
