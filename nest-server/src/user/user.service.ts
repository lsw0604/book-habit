import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find.user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...dto,
        },
      });
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(`prisma Error : ${err.message}`);
      } else {
        throw new BadRequestException(`Exception Error : ${err.message}`);
      }
    }
  }

  async findUser(dto: FindUserDto) {
    const { email, id } = dto;
    if (!email && !id) {
      throw new BadRequestException('해당 email, id를 검색하기 위해선 email, id값이 필요합니다.');
    }

    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          OR: [{ id }, { email }],
        },
      });

      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(`prisma Error : ${err.message}`);
      } else {
        throw new BadRequestException(`Exception Error : ${err.message}`);
      }
    }
  }
}
