import {
  Get,
  Res,
  Body,
  Post,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  Query,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RefreshGuard, LocalGuard, KakaoGuard, AccessGuard } from './guard';
import { AuthRegisterDto, AuthSignInDto } from './dto';
import { User } from '@prisma/client';
import { ResponseMessageDecorator, CurrentUser } from 'src/common/decorator';
import { AuthUser } from 'src/types/express';
import { LoggerService } from 'src/common/logger/logger.service';
import { AuthKakaoService } from './auth.kakao.service';
import { TokenService } from './token.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authKakaoService: AuthKakaoService,
    private readonly tokenService: TokenService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('로그인에 성공했습니다.')
  async signIn(
    @Body() _dto: AuthSignInDto,
    @CurrentUser() user: AuthUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.setAuthCookieAndResponse(res, user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('회원가입에 성공했습니다.')
  async signUp(@Body() dto: AuthRegisterDto, @Res({ passthrough: true }) res: Response) {
    const authUser = await this.authService.register(dto);
    return this.setAuthCookieAndResponse(res, authUser);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('REFRESH TOKEN 인증에 성공했습니다.')
  refreshToken(@CurrentUser() user: User) {
    this.logger.debug('user', user);
    const { accessToken } = this.tokenService.generateToken(user.id);

    return {
      accessToken,
    };
  }

  @UseGuards(KakaoGuard)
  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('KAKAO 로그인에 성공했습니다.')
  async kakaoCallback(
    @Query('code') code: string,
    @Query('redirect_uri') redirectUri: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const authUser = await this.authKakaoService.kakaoCallback(code, redirectUri);
    return this.setAuthCookieAndResponse(res, authUser);
  }

  @UseGuards(AccessGuard)
  @Get('access')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('ACCESS TOKEN 인증에 성공했습니다.')
  accessToken(@CurrentUser() user: AuthUser) {
    const { password: _, ...userInfo } = user;

    return {
      user: userInfo,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('로그아웃에 성공했습니다.')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().toDate(),
      sameSite: 'lax',
    });
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().toDate(),
      sameSite: 'lax',
    });
    return {
      user: null,
    };
  }

  private setAuthCookieAndResponse(res: Response, authPayload: AuthUser) {
    const { accessToken, refreshToken, password: _, ...user } = authPayload;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().add(1, 'hour').toDate(),
      sameSite: 'lax',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().add(7, 'day').toDate(),
      sameSite: 'lax',
    });

    return {
      user,
      accessToken,
    };
  }
}
