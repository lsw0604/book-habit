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
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Req() req: Request): Promise<ResponseDto<User>> {
    const response: User = req.user;
    return ResponseDto.created(response, '로그인에 성공했습니다.');
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() dto: AuthRegisterDto, @Res() res: Response): Promise<ResponseDto<User>> {
    const { accessToken, refreshToken, ...user } = await this.authService.register(dto);

    const response: User = user;
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().add(7, 'days').toDate(),
    });

    return ResponseDto.success(response, '회원가입에 성공했습니다.');
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request): ResponseDto<User> {
    const response: User = req.user;
    return ResponseDto.success(response, 'REFRESH TOKEN 인증에 성공했습니다.');
  }

  @UseGuards(AccessGuard)
  @Get('access')
  @HttpCode(HttpStatus.OK)
  accessToken(@Req() req: Request): ResponseDto<User> {
    const response: User = req.user;
    return ResponseDto.success<User>(response, 'ACCESS TOKEN 인증에 성공했습니다.');
  }

  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  logout(@Res() res: Response): ResponseDto<null> {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().toDate(),
    });

    return ResponseDto.noContent('로그아웃에 성공했습니다.');
  }

  @UseGuards(KakaoGuard)
  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  async kakaoCallback(@Req() req: Request): Promise<ResponseDto<User>> {
    const response: User = req.user;
    return ResponseDto.success(response, 'KAKAO 로그인에 성공했습니다.');
  }
}
