import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { CookieInterceptor } from 'src/interceptors/cookie-interceptor';
import { AccessGuard } from './guard/access.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @UseInterceptors(CookieInterceptor)
  @Post('signin')
  @HttpCode(200)
  async signIn(@Request() req: any) {
    const { accessToken } = await this.authService.generateAccessToken(req.user);
    const { refreshToken } = await this.authService.generateRefreshToken(req.user);

    return {
      refreshToken,
      accessToken,
      user: req.user,
    };
  }

  @Post('signup')
  signUp(@Body() dto: AuthLocalSignUp) {
    return this.authService.register(dto);
  }

  @UseGuards(AccessGuard)
  @Get('test')
  refresh(@Req() req) {
    console.log(req.user);
    return req.user;
  }
}
