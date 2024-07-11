import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { S3Service } from './s3/s3.service';
import { ImageService } from './image/image.service';
import { CloudfrontService } from './cloudfront/cloudfront.service';
import { MyBookModule } from './my-book/my-book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    BookModule,
    UserModule,
    AuthModule,
    MyBookModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service, ImageService, CloudfrontService],
})
export class AppModule {}
