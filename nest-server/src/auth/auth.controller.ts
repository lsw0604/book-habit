import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { CookieInterceptor } from 'src/interceptors/cookie-interceptor';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @UseInterceptors(CookieInterceptor)
  @Post('signin')
  @HttpCode(200)
  async signIn(@Request() req: any) {
    const { accessToken, refreshToken } = await this.authService.generateUserTokens(req.user);

    return {
      refreshToken,
      accessToken,
      ...req.user,
    };
  }

  @Post('signup')
  signUp(@Body() dto: AuthLocalSignUp) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('access'))
  @Get('me')
  refresh(@Request() req: any) {
    return req;
  }
}
