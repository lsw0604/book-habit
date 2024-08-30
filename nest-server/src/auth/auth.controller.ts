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
import { CookieInterceptor } from 'src/interceptors/cookie.interceptor';
import { AccessGuard } from './guard/access.guard';
import { RefreshGuard } from './guard/refresh.guard';
import { LocalGuard } from './guard/local.guard';
import { Request, Response } from 'express';
import { AuthLocalRegisterDto } from './dto/auth.local.register.dto';
import { ExcludeUserPasswordInterceptor } from 'src/interceptors/user-omit-property.interceptor';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @UseInterceptors(CookieInterceptor)
  @UseInterceptors(ExcludeUserPasswordInterceptor)
  @Post('signin')
  @HttpCode(200)
  async signIn(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  async signUp(@Body() dto: AuthLocalRegisterDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.register(dto);

    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });
    return res.status(200).json({
      accessToken,
      user,
    });
  }

  @UseGuards(AccessGuard)
  @Get('test')
  refresh(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RefreshGuard)
  @UseInterceptors(ExcludeUserPasswordInterceptor)
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    return req.user;
  }

  @Get('filter-test')
  async throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
