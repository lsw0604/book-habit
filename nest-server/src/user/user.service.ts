import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageService } from '../image/image.service';
import { CloudFrontService } from '../cloudfront/cloudfront.service';
import { S3Service } from '../s3/s3.service';
import { UserValidateEmailDto } from './dto/user.validate.email.dto';
import { UserRegisterLocalDto } from './dto/user.register.local.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly imageService: ImageService,
    private readonly s3Service: S3Service,
    private readonly cloudfrontService: CloudFrontService,
  ) {}

  async registerUser(dto: UserRegisterLocalDto) {}

  async validateEmail(dto: UserValidateEmailDto) {
    const email = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!email) return false;

    return true;
  }
}
