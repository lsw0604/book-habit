import { User } from '@prisma/client';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';

import { OmitPropertyInterceptor } from './interceptors/omit-property.interceptor';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { SetBearerHeaderInterceptor } from './interceptors/set-bearer-header.interceptor';

import { AccessTokenType, RefreshTokenType } from './types/token';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter(), new AllExceptionFilter());
  app.useGlobalInterceptors(
    new OmitPropertyInterceptor<User, 'password'>('password'),
    new CookieInterceptor<User & RefreshTokenType, 'refreshToken'>('refreshToken'),
    new SetBearerHeaderInterceptor<User & AccessTokenType>('accessToken', 'Authorization'),
  );
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
