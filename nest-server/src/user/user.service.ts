import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageService } from '../image/image.service';
import { CloudFrontService } from '../cloudfront/cloudfront.service';
import { S3Service } from '../s3/s3.service';
import { UserRegisterLocalDto } from './dto/user.register.local.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly imageService: ImageService,
    private readonly s3Service: S3Service,
    private readonly cloudfrontService: CloudFrontService,
  ) {}

  async registerUser(dto: UserRegisterLocalDto) {
    const existEmail = await this.validateEmail(dto);

    if (existEmail) throw new NotFoundException('해당 이메일이 존재합니다.');

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
      },
    });

    return user;
  }

  private async validateEmail(dto: Pick<UserRegisterLocalDto, 'email'>) {
    const email = dto.email;

    return !!(await this.prismaService.user.findUnique({
      where: {
        email,
      },
    }));
  }
}
