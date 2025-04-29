import { User } from '@prisma/client';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { OmitPropertyInterceptor } from './common/interceptors/omit-property.interceptor';
import { SetBearerHeaderInterceptor } from './common/interceptors/set-bearer-header.interceptor';
import { CookieInterceptor } from './common/interceptors/cookie.interceptor';

async function setUpMiddleware(app: INestApplication) {
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
}

async function setUpInterceptor(app: INestApplication) {
  app.useGlobalInterceptors(
    new SetBearerHeaderInterceptor<User & AccessTokenType>('accessToken', 'Authorization'),
    new CookieInterceptor<RefreshTokenType, 'refreshToken'>('refreshToken'),
    new OmitPropertyInterceptor<User, 'password'>(['password']),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowOrigins = process.env.CORS_ORIGINS.split(',');

  await setUpMiddleware(app);
  await setUpInterceptor(app);

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
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
  });
  await app.listen(3000);
}
bootstrap();
