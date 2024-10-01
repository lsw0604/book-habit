import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MyBookModule } from './my-book/my-book.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MyBookCommentModule } from './my-book-comment/my-book-comment.module';
import { CommentLikeModule } from './comment-like/comment-like.module';
import { CommentReplyModule } from './comment-reply/comment-reply.module';
import { MyBookHistoryModule } from './my-book-history/my-book-history.module';
import { MyBookTagModule } from './my-book-tag/my-book-tag.module';
import { PublicCommentModule } from './public-comment/public-comment.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';

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
    MyBookCommentModule,
    CommentLikeModule,
    CommentReplyModule,
    MyBookHistoryModule,
    MyBookTagModule,
    PublicCommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: () => {
        return new AllExceptionFilter(new PrismaExceptionFilter());
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
