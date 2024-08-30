import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find.user.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    this.logger.debug(`createUser DTD : ${JSON.stringify(dto)}`);
    const user = await this.prismaService.user.create({
      data: {
        ...dto,
      },
    });
    this.logger.debug(`createUser Info : ${user}`);
    return user;
  }

  async findUser(dto: FindUserDto) {
    const { email, id } = dto;
    if (!email && !id) {
      throw new BadRequestException('최소한 한가지 이상의 검색 단어가 필요합니다.');
    }

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ id }, { email }],
      },
    });

    return user;
  }
}
