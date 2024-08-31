import {
  Get,
  Req,
  Res,
  Body,
  Post,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CookieInterceptor } from 'src/interceptors/cookie.interceptor';
import { OmitPropertyInterceptor } from 'src/interceptors/omit-property.interceptor';
import { SetBearerHeaderInterceptor } from 'src/interceptors/set-bearer-header.interceptor';
import { AccessGuard } from './guard/access.guard';
import { RefreshGuard } from './guard/refresh.guard';
import { LocalGuard } from './guard/local.guard';
import { AuthLocalRegisterDto } from './dto/auth.local.register.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @UseInterceptors(
    new CookieInterceptor<User & { refreshToken: string }, 'refreshToken'>('refreshToken'),
    new SetBearerHeaderInterceptor<User & { accessToken: string }>('accessToken', 'Authorization'),
    new OmitPropertyInterceptor<User, 'password'>('password'),
  )
  @Post('signin')
  async signIn(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  async signUp(@Body() dto: AuthLocalRegisterDto, @Res() res: Response) {
    const { accessToken, refreshToken, ...user } = await this.authService.register(dto);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    return res.status(200).json({
      ...user,
    });
  }

  @UseGuards(AccessGuard)
  @UseInterceptors(new OmitPropertyInterceptor<User, 'password'>('password'))
  @Get('test')
  refresh(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RefreshGuard)
  @UseInterceptors(
    new SetBearerHeaderInterceptor<User & { accessToken: string }>('accessToken', 'Authorization'),
    new OmitPropertyInterceptor<User, 'password'>('password'),
  )
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    return req.user;
  }

  @Get('filter-test')
  async throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
