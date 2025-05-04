import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ResponseMessageDecorator, UserDecorator } from 'src/common/decorator';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';
import { USER_CONTROLLER_MESSAGE } from './constant';

@UseGuards(AccessGuard)
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @ResponseMessageDecorator(USER_CONTROLLER_MESSAGE.UPDATE_USER)
  async updateUser(@UserDecorator('id') userId: number, @Body() dto: UpdateUserDto): Promise<User> {
    const response: User = await this.userService.updateUser({ userId, ...dto });
    return response;
  }
}
