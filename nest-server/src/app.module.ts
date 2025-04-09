import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MyBookModule } from './my-book/my-book.module';
// import { MyBookHistoryModule } from './my-book-history/my-book-history.module';
import { MyBookTagModule } from './my-book-tag/my-book-tag.module';
import { MyBookReviewModule } from './my-book-review/my-book-review.module';
import { PublicCommentModule } from './public-comment/public-comment.module';
import { ReviewCommentModule } from './review-comment/review-comment.module';
import { ReviewLikeModule } from './review-like/review-like.module';
import { SearchModule } from './search/search.module';

import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    MyBookModule,
    // MyBookHistoryModule,
    MyBookTagModule,
    PublicCommentModule,
    SearchModule,
    MyBookReviewModule,
    ReviewCommentModule,
    ReviewLikeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
