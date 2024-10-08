import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { GetUserDto } from './dto/get.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...dto,
      },
    });
    return user;
  }

  async getUser(dto: GetUserDto) {
    const { email, id } = dto;
    if (!email && !id) {
      throw new BadRequestException('해당 email, id를 검색하기 위해선 email, id값이 필요합니다.');
    }

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ id }, { email }],
      },
    });

    return user;
  }

  async updateUser(dto: UpdateUserDto) {
    const { name, gender, birthday, profile, userId } = dto;

    if (!name && !gender && !birthday && !profile) {
      throw new BadRequestException('해당 name, profile, gender, birthday 값이 필요합니다.');
    }

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    return user;
  }
}
