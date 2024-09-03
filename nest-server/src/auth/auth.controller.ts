import { Get, Req, Res, Body, Post, UseGuards, Controller, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CookieInterceptor } from 'src/interceptors/cookie.interceptor';
import { OmitPropertyInterceptor } from 'src/interceptors/omit-property.interceptor';
import { SetBearerHeaderInterceptor } from 'src/interceptors/set-bearer-header.interceptor';
import { AccessGuard } from './guard/access.guard';
import { RefreshGuard } from './guard/refresh.guard';
import { LocalGuard } from './guard/local.guard';
import { AuthLocalRegisterDto } from './dto/auth.local.register.dto';
import { ConfigService } from '@nestjs/config';
import { KakaoGuard } from './guard/kakao.guard';

interface AccessTokenExtendsUser extends User {
  accessToken: string;
}

interface RefreshTokenExtendsUer extends User {
  refreshToken: string;
}

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    readonly configService: ConfigService,
  ) {}

  static readonly kakaoCallbackUri = '';

  @UseGuards(LocalGuard)
  @UseInterceptors(
    new CookieInterceptor<RefreshTokenExtendsUer, 'refreshToken'>('refreshToken'),
    new SetBearerHeaderInterceptor<AccessTokenExtendsUser>('accessToken', 'Authorization'),
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
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
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
    new SetBearerHeaderInterceptor<AccessTokenExtendsUser>('accessToken', 'Authorization'),
    new OmitPropertyInterceptor<User, 'password'>('password'),
  )
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now()),
    });

    return res.status(200).send({
      message: '로그아웃에 성공했습니다.',
    });
  }

  @UseGuards(KakaoGuard)
  @UseInterceptors(
    new CookieInterceptor<RefreshTokenExtendsUer, 'refreshToken'>('refreshToken'),
    new SetBearerHeaderInterceptor<AccessTokenExtendsUser>('accessToken', 'Authorization'),
    new OmitPropertyInterceptor<User, 'password'>('password'),
  )
  @Get('kakao')
  async kakaoCallback(@Req() req: Request) {
    return req.user;
  }
}
