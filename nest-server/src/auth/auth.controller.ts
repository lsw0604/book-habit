import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth.signin.dto';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { JwtAuthGuard } from './guard/access.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: AuthSignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: AuthLocalSignUp) {
    return this.authService.signUp(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    console.log('req', req.user);
    return 'se';
  }
}
