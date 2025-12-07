import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { ResponseDtoInterceptor } from './common/interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function setUpMiddleware(app: INestApplication) {
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
}

async function setUpInterceptor(app: INestApplication) {
  app.useGlobalInterceptors(new ResponseDtoInterceptor());
}

function setUpSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Document') // 문서 제목
    .setDescription('API 설명') // 문서 설명
    .setVersion('1.0') // 버전
    .addBearerAuth() // JWT 토큰 인증이 필요하다면 추가
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // http://localhost:3000/api 로 접속 가능하게 설정
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowOrigins = process.env.CORS_ORIGINS.split(',');

  await setUpMiddleware(app);
  await setUpInterceptor(app);
  setUpSwagger(app);

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
