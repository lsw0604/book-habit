import { Controller, Post, Req } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signIn(@Req() dto: AuthSignInDto) {
    return this.authService.signIn(dto);
  }
}
