import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signIn(@Request() req: any) {
    return req.user;
  }

  @Post('signup')
  signUp(@Body() dto: AuthLocalSignUp) {
    return this.authService.register(dto);
  }
}
