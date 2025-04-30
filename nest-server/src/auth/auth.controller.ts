import { Get, Req, Res, Body, Post, UseGuards, Controller, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guard/refresh.guard';
import { LocalGuard } from './guard/local.guard';
import { KakaoGuard } from './guard/kakao.guard';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { LoggerService } from 'src/common/logger/logger.service';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  async signIn(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  async signUp(@Body() dto: AuthRegisterDto, @Res() res: Response) {
    const { accessToken, refreshToken, ...user } = await this.authService.register(dto);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().add(7, 'days').toDate(),
    });

    return res.status(200).json({
      ...user,
    });
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: dayjs().toDate(),
    });

    return res.status(200).json({
      message: '로그아웃 성공',
    });
  }

  @UseGuards(KakaoGuard)
  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  async kakaoCallback(@Req() req: Request): Promise<ResponseDto<User>> {
    const response: User = req.user;
    return ResponseDto.success(response, 'KAKAO 로그인에 성공했습니다.');
  }
}
