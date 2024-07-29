import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CloudFrontService } from '../cloudfront/cloudfront.service';
import { S3Service } from '../s3/s3.service';
import { ImageService } from '../image/image.service';

@Module({
  providers: [UserService, CloudFrontService, S3Service, ImageService],
  controllers: [UserController],
})
export class UserModule {}
