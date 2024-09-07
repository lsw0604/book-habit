import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MyBookModule } from './my-book/my-book.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MyBookCommentModule } from './my-book-comment/my-book-comment.module';
import { CommentLikeModule } from './comment-like/comment-like.module';
import { CommentReplyModule } from './comment-reply/comment-reply.module';
import { MyBookHistoryModule } from './my-book-history/my-book-history.module';
import { MyBookHashtagModule } from './my-book-hashtag/my-book-hashtag.module';
import { MyBookTagModule } from './my-book-tag/my-book-tag.module';
import { MyBookTagModule } from './my-book-tag/my-book-tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    PrismaModule,
    BookModule,
    UserModule,
    AuthModule,
    MyBookModule,
    MyBookCommentModule,
    CommentLikeModule,
    CommentReplyModule,
    MyBookHistoryModule,
    MyBookHashtagModule,
    MyBookTagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
