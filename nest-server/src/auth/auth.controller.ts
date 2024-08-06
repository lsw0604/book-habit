import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  signIn(@Request() req, dto: AuthSignInDto) {
    console.log('user ', req.user);
    return this.authService.signIn(dto);
  }

  @Post()
  signUp(@Body() dto: AuthLocalSignUp) {
    return this.authService.signUp(dto);
  }
}
