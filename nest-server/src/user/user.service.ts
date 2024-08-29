import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterLocalDto } from './dto/user.register.local.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { FindUserDto } from './dto/find.user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async registerUser(dto: UserCreateDto) {
    const existEmail = await this.findUser({ email: dto.email });

    if (!!existEmail) throw new ConflictException('해당 이메일이 존재합니다.');

    const hashedPassword = await this.hashPassword(dto);

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const existEmail = await this.findUser({ email: dto.email });
    if (!!existEmail) throw new ConflictException('해당 이메일이 존재합니다.');

    const hashedPassword = await this.hashPassword(dto);

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findUser(dto: FindUserDto) {
    const { email, id } = dto;
    if (!email && !id) {
      throw new BadRequestException('최소한 한가지 이상의 검색 단어가 필요합니다.');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        email,
      },
    });

    return user;
  }

  async getUserByEmail(dto: Pick<UserCreateDto, 'email'>) {
    return await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
  }

  async getUserById(dto: { id: number }) {
    return await this.prismaService.user.findUnique({
      where: {
        id: dto.id,
      },
    });
  }

  private async validateEmail(dto: Pick<UserRegisterLocalDto, 'email'>) {
    const { email } = dto;

    return !!(await this.prismaService.user.findUnique({
      where: {
        email,
      },
    }));
  }

  private async hashPassword(dto: Pick<UserRegisterLocalDto, 'password'>) {
    const BCRYPT_SALT_ROUNDS = 10;
    const { password } = dto;
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }
}
