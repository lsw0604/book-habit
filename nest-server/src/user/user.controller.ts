import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/decorator/user.decorator';
import { UpdateUserDto } from './dto/update.user.dto';

@UseGuards(AccessGuard)
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@UserDecorator() user: User) {
    return user;
  }

  @Put()
  async updateUser(
    @UserDecorator('id') userId: number,
    @Body() dto: Omit<UpdateUserDto, 'userId'>,
  ) {
    return await this.userService.updateUser({ userId, ...dto });
  }
}
