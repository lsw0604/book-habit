import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MyBookModule } from './my-book/my-book.module';
import { CommentLikeModule } from './comment-like/comment-like.module';
import { MyBookHistoryModule } from './my-book-history/my-book-history.module';
import { MyBookTagModule } from './my-book-tag/my-book-tag.module';
import { PublicCommentModule } from './public-comment/public-comment.module';
import { ReviewCommentModule } from './review-comment/review-comment.module';
import { SearchModule } from './search/search.module';

import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MyBookReviewModule } from './my-book-review/my-book-review.module';

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
    CommentLikeModule,
    MyBookHistoryModule,
    MyBookTagModule,
    PublicCommentModule,
    SearchModule,
    MyBookReviewModule,
    ReviewCommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
