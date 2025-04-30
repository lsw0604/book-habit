import type { CreateKakaoUserPayload, CreateUserPayload, UpdateUserPayload } from './interfaces';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { NoFieldsToUpdateException } from 'src/common/exceptions';
import {
  AlreadyExistEmailException,
  NotFoundUserException,
  UserForbiddenAccessException,
} from './exceptions';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(UserService.name);
  }

  public async findUserByEmail(email: string): Promise<User> {
    const where: Prisma.UserWhereUniqueInput = { email };
    const user: User = await this.prismaService.user.findUnique({
      where,
    });

    return user;
  }

  public async createUser(payload: CreateUserPayload): Promise<User> {
    try {
      const user: User = await this.prismaService.user.create({
        data: payload,
      });
      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new AlreadyExistEmailException();
      }
      throw err;
    }
  }

  public async createKakaoUser(payload: CreateKakaoUserPayload): Promise<User> {
    try {
      const user: User = await this.prismaService.user.create({
        data: payload,
      });
      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new AlreadyExistEmailException();
      }
      throw err;
    }
  }

  public async updateUser(payload: UpdateUserPayload): Promise<User> {
    const { name, gender, birthday, profile, userId } = payload;

    await this.validateUserOwnership(userId);
    const where: Prisma.UserWhereUniqueInput = { id: userId };
    const data: Prisma.UserUpdateInput = {
      ...(name !== undefined && { name }),
      ...(gender !== undefined && { gender }),
      ...(birthday !== undefined && { birthday }),
      ...(profile !== undefined && { profile }),
    };

    if (Object.keys(data).length === 0) {
      throw new NoFieldsToUpdateException();
    }

    const user: User = await this.prismaService.user.update({
      where,
      data,
    });

    return user;
  }

  public async getUserById(userId: number): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id: userId } });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  private async validateUserOwnership(userId: number): Promise<void> {
    const where: Prisma.UserWhereUniqueInput = { id: userId };
    const user: User = await this.prismaService.user.findUnique({
      where,
    });

    if (!user) throw new NotFoundUserException(userId);
    const ownerId: number = user.id;
    if (ownerId !== userId) throw new UserForbiddenAccessException({ userId, ownerId });
  }
}
