import { User } from '@prisma/client';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';

import { OmitPropertyInterceptor } from './interceptors/omit-property.interceptor';
import { SetBearerHeaderInterceptor } from './interceptors/set-bearer-header.interceptor';
import { CookieInterceptor } from './interceptors/cookie.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowOrigins = process.env.CORS_ORIGINS.split(',');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter(), new AllExceptionFilter());
  app.useGlobalInterceptors(
    new OmitPropertyInterceptor<User, 'password'>(['password']),
    new CookieInterceptor<RefreshTokenType, 'refreshToken'>('refreshToken'),
    new SetBearerHeaderInterceptor<User & AccessTokenType>('accessToken', 'Authorization'),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: (origin, callback) => {
      if (
        allowOrigins.includes(origin) ||
        (process.env.NODE_ENV !== 'production' && origin === undefined)
      ) {
        callback(null, true);
      } else {
        callback(new BadRequestException(`CORS Error : ${origin} is not allowed`));
      }
    },
    methods: '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  await app.listen(3000);
}
bootstrap();
