import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLocalSignUp } from './dto/auth.local.signup.dto';
import { CookieInterceptor } from 'src/interceptors/cookie-interceptor';
import { AccessGuard } from './guard/access.guard';
import { RefreshGuard } from './guard/refresh.guard';
import { LocalGuard } from './guard/local.guard';
import { Request, Response } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @UseInterceptors(CookieInterceptor)
  @Post('signin')
  @HttpCode(200)
  async signIn(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  @HttpCode(200)
  async signUp(@Body() dto: AuthLocalSignUp, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.register(dto);

    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });
    return {
      accessToken,
      user,
    };
  }

  @UseGuards(AccessGuard)
  @Get('test')
  refresh(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    return req.user;
  }

  @Get('filter-test')
  async throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
