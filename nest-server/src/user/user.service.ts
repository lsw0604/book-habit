import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterLocalDto } from './dto/user.register.local.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async registerUser(dto: UserRegisterLocalDto) {
    const existEmail = await this.validateEmail(dto);

    if (existEmail) throw new ConflictException('해당 이메일이 존재합니다.');

    const hashedPassword = await this.hashPassword(dto);

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: hashedPassword,
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

  private async hashPassword(dto: Pick<UserRegisterLocalDto, 'password'>) {
    const BCRYPT_SALT_ROUNDS = 10;
    return await bcrypt.hash(dto.password, BCRYPT_SALT_ROUNDS);
  }
}
