import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLocalRegisterDto } from './dto/user.local.register.dto';
import { ImageService } from '../image/image.service';
import { S3Service } from '../s3/s3.service';
import { CloudFrontService } from '../cloudfront/cloudfront.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly imageService: ImageService,
    private readonly s3Service: S3Service,
    private readonly cloudfrontService: CloudFrontService,
  ) {}

  async registerUser(dto: UserLocalRegisterDto) {}
}
