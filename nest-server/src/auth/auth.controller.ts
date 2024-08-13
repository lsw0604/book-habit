import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Request() req: any, @Response() res: any) {
    const { accessToken, refreshToken } = await this.authService.generateUserTokens(req.user);

    res.cookie('token', refreshToken);

    return {
      accessToken,
      ...req.user,
    };
  }

  @Post('signup')
  signUp(@Body() dto: AuthLocalSignUp) {
    return this.authService.register(dto);
  }

  @Get('refresh')
  refresh() {}
}
