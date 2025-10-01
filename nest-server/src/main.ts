import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { ResponseDtoInterceptor } from './common/interceptors';

async function setUpMiddleware(app: INestApplication) {
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
}

async function setUpInterceptor(app: INestApplication) {
  app.useGlobalInterceptors(new ResponseDtoInterceptor());
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
