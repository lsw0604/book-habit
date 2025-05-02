import {
  Get,
  Req,
  Res,
  Body,
  Post,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guard/refresh.guard';
import { LocalGuard } from './guard/local.guard';
import { KakaoGuard } from './guard/kakao.guard';
import { AccessGuard } from './guard/access.guard';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { ResponseMessageDecorator } from 'src/common/decorator/response-message.decorator';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('로그인에 성공했습니다.')
  async signIn(@Req() req: Request): Promise<User> {
    const response: User = req.user;
    return response;
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('회원가입에 성공했습니다.')
  async signUp(@Body() dto: AuthRegisterDto, @Res() res: Response): Promise<User> {
    const { accessToken, refreshToken, ...user } = await this.authService.register(dto);

    const response: User = user;
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().add(7, 'days').toDate(),
    });

    return response;
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('REFRESH TOKEN 인증에 성공했습니다.')
  refreshToken(@Req() req: Request): User {
    const response: User = req.user;
    return response;
  }

  @UseGuards(AccessGuard)
  @Get('access')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('ACCESS TOKEN 인증에 성공했습니다.')
  accessToken(@Req() req: Request): User {
    const response: User = req.user;
    return response;
  }

  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('로그아웃에 성공했습니다.')
  logout(@Res() res: Response): void {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().toDate(),
    });
  }

  @UseGuards(KakaoGuard)
  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('KAKAO 로그인에 성공했습니다.')
  async kakaoCallback(@Req() req: Request): Promise<User> {
    const response: User = req.user;
    return response;
  }
}
